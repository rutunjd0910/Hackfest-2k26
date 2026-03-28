# Envify — Personalized Carbon Accountability and Localized Climate Action Marketplace

A full-stack prototype built for Hackathons demonstrating personal and business carbon footprint tracking, predictive growth simulations, and a localized trust-verified offset marketplace. 

## Structure
- `/frontend`: React (Vite) + Tailwind CSS + Recharts + Leaflet
- `/backend`: FastAPI + Python + Pydantic
- `supabase_schema.sql`: Database schema utilizing Supabase PostgreSQL

## Getting Started (Demo Mode)

The prototype is designed to work in "Demo Mode" out-of-the-box for hackathon showcases, meaning it utilizes beautiful mocked data on the frontend to visualize features like the AI Recommendation Engine and Earth Engine Verification Layer without requiring complex API configurations.

### 1. Frontend Setup
Make sure you have Node.js installed.
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`. 
*Note:* The Authentication page is equipped with a Demo Toggle to dynamically switch between viewing the Individual or Business Dashboard.

### 2. Backend Setup (Optional for Demo)
If you wish to hook up the backend endpoints:
Make sure you have Python 3.9+ installed.
```bash
cd backend
pip install -r requirements.txt
fastapi dev main.py
```
API Documentation will be available at `http://localhost:8000/docs`.

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your API keys if you plan to extend the mock implementations with live `Climatiq`, `Groq API`, or live `Supabase` calls. Run the `supabase_schema.sql` file in your Supabase SQL Editor.

## Features
- **Individual Dashboard**: Highly granular daily carbon footprint tracking, live AI-based recommendations, and dynamic Recharts visuals.
- **Enterprise / Business Dashboard**: Scope 1, 2, and 3 level monitoring with automated ESG compliance flags.
- **Growth Simulation Engine**: Simulates ecological impacts based on planned business expansions.
- **Local Climate Map**: A Leaflet based geospatial marketplace indexing verifiable nearby environmental offset projects (Trees, Solar, Waste, Water).
- **Dual Verification Trust Layer**: Outlines the logical flow of using satellite NDVI validation + human auditing via an Admin Console.
- **Impact Report Auto-Gen**: Produces an executive summary view of carbon actions.
