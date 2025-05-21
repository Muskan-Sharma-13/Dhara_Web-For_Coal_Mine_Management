from flask import Blueprint, request, jsonify
import PyPDF2
import re
import spacy
from textblob import TextBlob
from sklearn.feature_extraction.text import TfidfVectorizer

# Create a Blueprint for the SMP Analyzer API
smp_analyzer_blueprint = Blueprint('smp_analyzer', __name__)

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# SMP Components dictionary
SMP_COMPONENTS = {
    "mine_general_info": {
        "weight": 15,
        "keywords": [
            "abbreviation", "safety policy", "organization", "mine history",
            "working plan", "accident statistics", "vocational training",
            "emergency", "standing order", "conference recommendation"
        ],
        "required_patterns": [
            r"safety\s+policy",
            r"organizational\s+structure",
            r"mine\s+history",
            r"working\s+plan",
            r"accident\s+statistics"
        ],
        "entities": ["ORG", "DATE", "GPE"]
    },
    "workplace_risk_assessment": {
        "weight": 20,
        "keywords": [
            "risk assessment", "hazard", "risk", "categorization",
            "standard operating procedure", "sop", "identification",
            "control", "major activities", "operations"
        ],
        "required_patterns": [
            r"risk\s+assessment",
            r"hazard\s+identif\w+",
            r"risk\s+categorization",
            r"standard\s+operating\s+procedure"
        ],
        "entities": ["RISK", "QUANTITY"]
    },
    "principal_hazard_management": {
        "weight": 20,
        "keywords": [
            "principal hazard", "management plan", "emergency response",
            "evacuation", "trigger action response plan", "tarp",
            "mock rehearsal", "effectiveness", "emergency plan"
        ],
        "required_patterns": [
            r"principal\s+hazard",
            r"emergency\s+response\s+plan",
            r"trigger\s+action\s+response\s+plan",
            r"evacuation\s+system"
        ],
        "entities": ["PRODUCT", "LOCATION"]
    },
    "monitoring_implementation": {
        "weight": 15,
        "keywords": [
            "monthly review", "safety committee", "annual review",
            "corporate level", "implementation", "monitoring",
            "progress", "periodic", "evaluation"
        ],
        "required_patterns": [
            r"monthly\s+review",
            r"safety\s+committee",
            r"annual\s+review",
            r"corporate\s+level"
        ],
        "entities": ["DATE", "ORG"]
    },
    "training_awareness": {
        "weight": 15,
        "keywords": [
            "training", "awareness", "safety education", "professional",
            "mine safety", "skill development", "learning",
            "safety communication"
        ],
        "required_patterns": [
            r"training\s+program",
            r"safety\s+awareness",
            r"professional\s+training"
        ],
        "entities": ["DATE", "TIME"]
    },
    "conclusion_section": {
        "weight": 15,
        "keywords": [
            "conclusion", "summary", "key findings", "safety",
            "recommendations", "final thoughts"
        ],
        "required_patterns": [
            r"conclusion",
            r"final\s+summary"
        ],
        "entities": ["ORG"]
    }
}

class SMPAnalyzer:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def extract_text_from_pdf(self, pdf_file):
        """Extract text from PDF file."""
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

    def preprocess_text(self, text):
        """Preprocess text for analysis."""
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip()

    def analyze_component_coverage(self, text, component_details):
        """Analyze how well a component is covered in the text."""
        preprocessed_text = self.preprocess_text(text)
        doc = nlp(preprocessed_text)

        scores = {
            'keyword_score': 0,
            'pattern_score': 0,
            'entity_score': 0,
            'sentiment_score': 0
        }

        # Keyword analysis
        keyword_matches = sum(1 for keyword in component_details['keywords']
                              if keyword in preprocessed_text)
        scores['keyword_score'] = keyword_matches / len(component_details['keywords'])

        # Pattern matching
        pattern_matches = sum(1 for pattern in component_details['required_patterns']
                              if re.search(pattern, preprocessed_text))
        scores['pattern_score'] = pattern_matches / len(component_details['required_patterns'])

        # Entity recognition
        found_entities = [ent.label_ for ent in doc.ents]
        required_entities = component_details['entities']
        entity_matches = sum(1 for entity in required_entities
                             if entity in found_entities)
        scores['entity_score'] = entity_matches / len(required_entities) if required_entities else 1

        # Sentiment analysis
        blob = TextBlob(text)
        sentiment = blob.sentiment.polarity
        scores['sentiment_score'] = (sentiment + 1) / 2  # Normalize to 0-1

        # Calculate weighted average score
        weights = {'keyword_score': 0.4, 'pattern_score': 0.3,
                   'entity_score': 0.2, 'sentiment_score': 0.1}
        final_score = sum(score * weights[metric]
                          for metric, score in scores.items())

        return final_score, scores

    def generate_detailed_recommendations(self, component_scores, text):
        """Generate specific recommendations based on analysis."""
        recommendations = []

        for component, details in SMP_COMPONENTS.items():
            score = component_scores[component]['final_score']
            if score < 0.7:  # Threshold for recommendations
                component_name = component.replace('_', ' ').title()
                recommendations.append(f"{component_name} Improvements:")

                # Check missing keywords
                text_lower = text.lower()
                missing_keywords = [keyword for keyword in details['keywords']
                                    if keyword not in text_lower]
                if missing_keywords:
                    recommendations.append("- Add sections covering: " +
                                           ", ".join(missing_keywords))

                # Check missing patterns
                missing_patterns = [pattern for pattern in details['required_patterns']
                                    if not re.search(pattern, text_lower)]
                if missing_patterns:
                    recommendations.append("- Include detailed documentation for: " +
                                           ", ".join([p.replace(r'\s+', ' ')
                                                     for p in missing_patterns]))

        return recommendations

    def calculate_metrics(self, text):
        """Calculate document quality metrics."""
        doc = nlp(text)
        metrics = {
            "document_length": len(text),
            "number_of_sentences": len(list(doc.sents)),
            "average_sentence_length": len(text) / len(list(doc.sents)),
            "unique_keywords_found": len(set(word.text.lower()
                                             for word in doc
                                             if not word.is_stop and not word.is_punct))
        }
        return metrics

@smp_analyzer_blueprint.route('/analyze', methods=['POST'])
def analyze():
    """Analyze the uploaded PDF and return results."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    analyzer = SMPAnalyzer()
    text = analyzer.extract_text_from_pdf(file)

    # Analyze each component
    component_scores = {}
    total_score = 0

    for component, details in SMP_COMPONENTS.items():
        score, subscores = analyzer.analyze_component_coverage(text, details)
        weighted_score = score * details['weight']
        total_score += weighted_score
        component_scores[component] = {
            'final_score': score,
            'weighted_score': weighted_score,
            'subscores': subscores
        }

    # Generate recommendations
    recommendations = analyzer.generate_detailed_recommendations(component_scores, text)

    # Calculate quality metrics
    metrics = analyzer.calculate_metrics(text)

    return jsonify({
        "total_score": total_score,
        "component_scores": component_scores,
        "recommendations": recommendations,
        "metrics": metrics
    })
