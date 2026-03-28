from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import os
import json

load_dotenv()

app = FastAPI(title="Envify API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

class FootprintInput(BaseModel):
    energy_kwh: float
    transport_km_car: float
    transport_km_transit: float
    transport_km_flight: float
    water_liters: float
    waste_kg: float
    diet: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Envify API"}

@app.post("/calculate-footprint")
def calculate_footprint(data: FootprintInput):
    # Mock calculation since Climatiq requires specific API setup
    total_co2 = (data.energy_kwh * 0.85) + (data.transport_km_car * 0.19) + (data.waste_kg * 1.5)
    score = max(0, 100 - (total_co2 / 10))
    return {
        "total_co2_kg": round(total_co2, 2),
        "breakdown_by_category": {
            "energy": round(data.energy_kwh * 0.85, 2),
            "transport": round(data.transport_km_car * 0.19, 2),
            "waste": round(data.waste_kg * 1.5, 2),
            "diet": 2.5,
            "water": 0.5
        },
        "sustainability_score": round(score, 1)
    }

class GrowthInput(BaseModel):
    expansion_type: str
    size: float
    energy_source: str
    location: str

@app.post("/simulate-growth")
def simulate_growth(data: GrowthInput):
    additional_co2 = data.size * (0.5 if data.energy_source == 'renewable' else 2.5)
    return {
        "additional_co2_per_year": additional_co2,
        "5_year_projection": additional_co2 * 5,
        "risk_level": "Low" if additional_co2 < 1000 else "High"
    }

class AIRequest(BaseModel):
    emissions_profile: dict
    user_type: str
    location: str
    budget: str

@app.post("/ai-recommendations")
async def ai_recommendations(data: AIRequest):
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key":
        # Mock response
        return [
            {"action": "Install LED lighting", "co2_saved_kg_yr": 1300, "cost_inr": 8000, "payback_months": 8, "difficulty": "Easy"},
            {"action": "Switch to solar energy", "co2_saved_kg_yr": 5000, "cost_inr": 150000, "payback_months": 36, "difficulty": "Hard"}
        ]
        
    prompt = f"User type: {data.user_type}. Location: {data.location}. Emissions: {json.dumps(data.emissions_profile)}. Budget: {data.budget}. Return exactly 5 actionable recommendations in JSON format: [{{'action', 'co2_saved_kg_yr', 'cost_inr', 'payback_months', 'difficulty'}}]"
    
    # Real Groq API call logic here...
    return []

@app.get("/local-projects")
def local_projects(lat: float, lon: float):
    # Mock nearby projects in Nagpur
    return [
        {"id": "1", "title": "Nagpur Green Belt Tree Drive", "type": "tree_plantation", "impact_co2_yr": 12, "distance_km": 3.0, "funding_status": 60, "status": "pending"},
        {"id": "2", "title": "Vidarbha Solar Farm", "type": "solar", "impact_co2_yr": 800, "distance_km": 18.0, "funding_status": 100, "status": "verified"},
        {"id": "3", "title": "Orange Peel Waste-to-Compost", "type": "waste", "impact_co2_yr": 400, "distance_km": 5.0, "funding_status": 0, "status": "pending"}
    ]

class ProjectSubmission(BaseModel):
    title: str
    type: str
    location_lat: float
    location_lon: float
    expected_impact: float

@app.post("/submit-project")
def submit_project(data: ProjectSubmission):
    return {"message": "Project submitted, pending verification", "project_id": "new-id-123"}

@app.post("/verify-project/{id}")
def verify_project(id: str):
    return {"message": f"Project {id} verified using satellite logic"}

@app.get("/impact-report/{user_id}")
def impact_report(user_id: str):
    return {
        "user_id": user_id,
        "baseline_emissions": 5000,
        "current_emissions": 4200,
        "reduction_achieved_percent": 16.0,
        "projects_funded": 2,
        "credits_earned": 50,
        "sustainability_score_history": [65, 70, 78, 85],
        "esg_badge": "B+"
    }

class ReportingJourneyProgress(BaseModel):
    step: int
    
# In-memory storage for prototyping
business_progress_db = {}

@app.post("/business/{business_id}/reporting-progress")
def update_reporting_progress(business_id: str, data: ReportingJourneyProgress):
    business_progress_db[business_id] = data.step
    return {"message": "Progress updated successfully", "business_id": business_id, "step": data.step}

@app.get("/business/{business_id}/reporting-progress")
def get_reporting_progress(business_id: str):
    # Default to step 1 if not found
    step = business_progress_db.get(business_id, 1)
    return {"business_id": business_id, "step": step}

@app.get("/simulate-live-data")
def simulate_live_data():
    """Simulates fetching data from smart meters and IoT devices for an individual."""
    import random
    return {
        "energy_kwh": round(random.uniform(5.0, 15.0), 1),
        "transport_km_car": round(random.uniform(10.0, 50.0), 1),
        "water_liters": round(random.uniform(80.0, 200.0), 1),
        "waste_kg": round(random.uniform(0.5, 2.5), 1),
        "diet": random.choice(["vegan", "vegetarian", "mixed", "meat-heavy"]),
        "source": "Nagpur Smart Meter Cluster #4A"
    }

@app.get("/simulate-business-sync")
def simulate_business_sync():
    """Simulates fetching multi-site ERP and logistics data for a business."""
    import random
    return {
        "operations": str(random.randint(200, 500)),
        "transport": str(random.randint(300, 600)),
        "supplyChain": str(random.randint(200, 400)),
        "source": "Acme Industries Global ERP - Region: APAC"
    }
