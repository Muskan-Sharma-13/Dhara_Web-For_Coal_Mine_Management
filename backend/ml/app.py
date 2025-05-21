from flask import Flask
# from api.smp_analyzer import smp_analyzer_blueprint
# from api.summarizer import summarizer_blueprint
from api.weather import weather_blueprint

app = Flask(__name__)

# Register Blueprints
# app.register_blueprint(smp_analyzer_blueprint, url_prefix='/smp-analyzer')
# app.register_blueprint(summarizer_blueprint, url_prefix='/summarizer')
app.register_blueprint(weather_blueprint, url_prefix='/weather')

@app.route('/')
def index():
    return "Welcome to the Unified Flask API! Use /smp-analyzer, /summarizer, or /weather."

if __name__ == '__main__':
    app.run(debug=True)
