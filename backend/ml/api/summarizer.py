from flask import Blueprint, request, jsonify
from transformers import BartForConditionalGeneration, BartTokenizer
from PyPDF2 import PdfReader
from docx import Document
import re

# Create a Blueprint for the Summarizer API
summarizer_blueprint = Blueprint('summarizer', __name__)

# Load the BART model and tokenizer
def load_model():
    model_name = "facebook/bart-large-cnn"
    model = BartForConditionalGeneration.from_pretrained(model_name)
    tokenizer = BartTokenizer.from_pretrained(model_name)
    return model, tokenizer

model, tokenizer = load_model()

# Function to extract text from PDFs
def extract_text_from_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to extract text from Word documents
def extract_text_from_docx(file):
    doc = Document(file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

# Function to clean and preprocess text
def preprocess_text(text):
    text = re.sub(r"[^\w\s.,]", "", text)  # Keep words, spaces, dots, and commas
    text = re.sub(r"\s+", " ", text)  # Replace multiple spaces with a single space
    text = text.strip()  # Remove leading and trailing spaces
    return text

# Function to summarize text
def summarize_text(text, min_length, max_length):
    inputs = tokenizer(text, max_length=1024, truncation=True, return_tensors="pt")
    summary_ids = model.generate(
        inputs.input_ids,
        min_length=min_length,
        max_length=max_length,
        length_penalty=2.0,
        num_beams=4,
        early_stopping=True
    )
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

@summarizer_blueprint.route("/summarize", methods=["POST"])
def summarize():
    try:
        # Retrieve files from the request
        files = request.files.getlist("files")
        min_length = int(request.form.get("min_length", 100))
        max_length = int(request.form.get("max_length", 300))

        if not files:
            return jsonify({"error": "No files uploaded"}), 400

        combined_text = ""
        for file in files:
            if file.filename.endswith(".pdf"):
                combined_text += extract_text_from_pdf(file)
            elif file.filename.endswith(".docx"):
                combined_text += extract_text_from_docx(file)
            else:
                return jsonify({"error": f"Unsupported file type: {file.filename}"}), 400

        if combined_text.strip():
            # Preprocess the text
            cleaned_text = preprocess_text(combined_text)

            # Ensure there's enough content for summarization
            if len(cleaned_text.split()) > 50:
                # Generate summary
                summary = summarize_text(cleaned_text, min_length, max_length)
                return jsonify({
                    "status": "success",
                    "summary": summary,
                    "cleaned_text": cleaned_text
                }), 200
            else:
                return jsonify({"error": "The text is too short for summarization"}), 400
        else:
            return jsonify({"error": "No text could be extracted from the uploaded files"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
