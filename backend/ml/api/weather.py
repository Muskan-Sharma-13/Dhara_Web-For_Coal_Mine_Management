from flask import Blueprint, request, jsonify
from datetime import datetime
import requests

# Create a Blueprint for the Weather API
weather_blueprint = Blueprint('weather', __name__)

# OpenWeather API Key
API_KEY = "ade4f6dd653b564ecb0149acb66f0ac1"

# Base URL for the API
BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

def get_weather_forecast(city):
    """Fetch weather forecast data for the given city."""
    params = {
        "q": city.strip(),
        "appid": API_KEY,
        "units": "metric"  # For temperature in Celsius
    }
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": f"Network error: {e}"}

def analyze_weather_forecast(forecasts):
    """Comprehensive weather analysis with detailed insights."""
    weather_insights = []
    future_precautions = []
    severity_level = "Low"

    # Track temperature trends
    temperatures = [forecast["main"]["temp"] for forecast in forecasts]
    temp_min, temp_max = min(temperatures), max(temperatures)
    temp_trend = "stable" if temp_max - temp_min < 2 else "fluctuating"

    for forecast in forecasts:
        temp = forecast["main"]["temp"]
        condition = forecast["weather"][0]["description"].lower()
        wind_speed = forecast["wind"]["speed"]
        forecast_time = datetime.fromtimestamp(forecast["dt"])
        
        if temp < 15:
            weather_insights.append(f"Cool temperatures ({temp}°C) detected at {forecast_time.strftime('%I:%M %p')}.")
            future_precautions.append("Provide warm clothing for workers.")
            severity_level = "Medium"
        if temp > 30:
            weather_insights.append(f"High temperatures ({temp}°C) noted at {forecast_time.strftime('%I:%M %p')}!")
            future_precautions.append("Ensure regular hydration breaks.")
            severity_level = "High"
        if wind_speed > 3:
            weather_insights.append(f"Moderate winds ({wind_speed} m/s) at {forecast_time.strftime('%I:%M %p')}.")
            future_precautions.append("Secure loose equipment.")
        if "rain" in condition or "storm" in condition:
            weather_insights.append(f"Potential precipitation: {condition} at {forecast_time.strftime('%I:%M %p')}.")
            future_precautions.append("Prepare waterproof covers.")
            severity_level = "High"

    trend_description = f"Temperature trend is {temp_trend}, ranging from {temp_min:.1f}°C to {temp_max:.1f}°C."
    return {
        "insights": weather_insights,
        "precautions": list(set(future_precautions)),
        "trend": trend_description,
        "severity": severity_level
    }

@weather_blueprint.route('/advisory', methods=['POST'])
def weather_advisory():
    data = request.json
    city = data.get("city", "").strip()
    if not city:
        return jsonify({"error": "City name is required"}), 400

    weather_data = get_weather_forecast(city)
    if "error" in weather_data:
        return jsonify(weather_data), 500

    forecasts = weather_data["list"][:8]  # Next 24 hours (3-hour intervals)
    analysis = analyze_weather_forecast(forecasts)

    return jsonify({
        "city": city,
        "trend": analysis["trend"],
        "severity": analysis["severity"],
        "insights": analysis["insights"],
        "precautions": analysis["precautions"]
    })
