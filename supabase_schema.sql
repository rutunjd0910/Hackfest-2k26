-- Supabase Schema for Envify

-- Users Table (Extended profile data)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('individual', 'business')) NOT NULL,
    location TEXT,
    industry TEXT, -- Only for businesses
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Emission Logs (For Individuals)
CREATE TABLE public.emission_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    energy_co2 NUMERIC NOT NULL DEFAULT 0,
    transport_co2 NUMERIC NOT NULL DEFAULT 0,
    water_co2 NUMERIC NOT NULL DEFAULT 0,
    waste_co2 NUMERIC NOT NULL DEFAULT 0,
    diet_co2 NUMERIC NOT NULL DEFAULT 0,
    total_co2 NUMERIC NOT NULL DEFAULT 0,
    score NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Business Emissions
CREATE TABLE public.business_emissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    operations NUMERIC NOT NULL DEFAULT 0,
    transport NUMERIC NOT NULL DEFAULT 0,
    supply_chain NUMERIC NOT NULL DEFAULT 0,
    water NUMERIC NOT NULL DEFAULT 0,
    waste NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Climate Projects
CREATE TABLE public.climate_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    location_lat NUMERIC NOT NULL,
    location_lon NUMERIC NOT NULL,
    impact_co2_yr NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('pending', 'under review', 'verified')) DEFAULT 'pending' NOT NULL,
    host_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    funding_status NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Verifications
CREATE TABLE public.verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.climate_projects(id) ON DELETE CASCADE NOT NULL,
    satellite_check BOOLEAN DEFAULT FALSE,
    human_check BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Carbon Credits
CREATE TABLE public.carbon_credits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES public.climate_projects(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Auth Trigger functionality (Optional, but good for linking auth.users to public.users)
-- We will handle this in app logic for simplicity, or add a trigger if needed.
