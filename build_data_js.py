import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import requests
import numpy as np
import json
import os

def build_dashboard_data():
    print("Loading geographic data...")
    counties_gdf = gpd.read_file('oregon_counties.geojson')
    
    print("Processing Census Data...")
    census_df = pd.read_csv('Data/Raw/oregon_census_data.csv')
    census_df['County'] = census_df['County'].str.strip()
    
    print("Processing Broadband...")
    broadband_df = pd.read_csv('Data/Raw/BroadbandAccess.csv', skiprows=5)
    broadband_df = broadband_df.rename(columns={'Percent(1)': 'Broadband'})
    broadband_df['County'] = broadband_df['County'].str.replace(' County', '').str.strip()
    
    print("Processing Unmet Need Indicators (from Excel)...")
    # Read sheet Unmet_Need_9_FINAL and exclude the statewide OR row
    unmet_df = pd.read_excel('Data/Raw/UnmetNeedIndicators.xlsx', sheet_name='Unmet_Need_9_FINAL')
    unmet_df = unmet_df[unmet_df['County'] != 'OR'].copy()
    unmet_df['County'] = unmet_df['County'].str.strip().str.title()
    
    # Perform population-weighted aggregation by county
    unmet_df['2024 Population'] = pd.to_numeric(unmet_df['2024 Population'], errors='coerce').fillna(0)
    
    # We will compute the weighted average for the columns in UnmetNeedIndicators
    unmet_cols = [
        'Travel Time to Nearest PCPCH',
        'Primary Care  Capacity Ratio',
        'Dentists per 1,000',
        'Mental Health Providers per 1,000',
        'Inadequate Prenatal Care Rate',
        'Preventable Hospitalizations per 1,000',
        'Emergency Dept Dental Visits per 1,000',
        'Emergency Dept Mental Health Visits per 1,000'
    ]
    
    for col in unmet_cols:
        unmet_df[col] = pd.to_numeric(unmet_df[col], errors='coerce').fillna(0)
        
    def weighted_avg(group):
        pop_sum = group['2024 Population'].sum()
        res = {}
        for col in unmet_cols:
            if pop_sum > 0:
                res[col] = (group[col] * group['2024 Population']).sum() / pop_sum
            else:
                res[col] = group[col].mean()
        return pd.Series(res)
        
    unmet_county = unmet_df.groupby('County').apply(weighted_avg, include_groups=False).reset_index()
    print(f"  -> Aggregated {len(unmet_county)} counties from Unmet Need indicators.")

    print("Processing Insurance Data...")
    # Skip first 5 lines and read Insured.csv
    insured_df = pd.read_csv('Data/Raw/Insured.csv', skiprows=5)
    insured_df = insured_df[~insured_df['County'].isin(['United States', 'Oregon'])].copy()
    insured_df['County'] = insured_df['County'].str.replace(' County', '').str.strip()
    insured_df['Insured (Percent)'] = pd.to_numeric(insured_df['Insured (Percent)'], errors='coerce').fillna(90.0)
    insured_df['Uninsured'] = 100.0 - insured_df['Insured (Percent)']
    
    # OHP Enrollment (for reference and profile)
    print("Processing OHP Enrollment...")
    ohp_df = pd.read_excel('Data/Raw/OHPEnrollment.xlsx', sheet_name='Data (by county)', skiprows=3)
    ohp_latest = ohp_df[ohp_df['Month and Year'] == 'Mar 2026'].copy()
    ohp_latest['County'] = ohp_latest['County'].str.strip()
    ohp_latest['Total'] = pd.to_numeric(ohp_latest['Total'].replace('*', 0), errors='coerce').fillna(0)
    ohp_county = ohp_latest.groupby('County', as_index=False)['Total'].sum()
    ohp_county = ohp_county.rename(columns={'Total': 'OHP_Total'})

    # ── Health Indicators: read ALL Oregon rows ──────────────────────────
    print("Processing Health Indicators (CDC PLACES)...")
    health_chunks = []
    for chunk in pd.read_csv('Data/Raw/HealthIndicators.csv', chunksize=100000):
        or_chunk = chunk[chunk['StateAbbr'] == 'OR']
        if not or_chunk.empty:
            health_chunks.append(
                or_chunk[['LocationName', 'Measure', 'Data_Value', 'Data_Value_Type']]
            )
    health_df = pd.concat(health_chunks)
    health_df['County'] = health_df['LocationName'].str.strip()

    # Prefer Age-adjusted, fall back to Crude when Age-adjusted is missing
    adj_df = health_df[health_df['Data_Value_Type'] == 'Age-adjusted prevalence'].copy()
    cru_df = health_df[health_df['Data_Value_Type'] == 'Crude prevalence'].copy()

    adj_keys = set(zip(adj_df['County'], adj_df['Measure']))
    fallback_rows = cru_df[~cru_df.apply(lambda r: (r['County'], r['Measure']) in adj_keys, axis=1)]
    preferred_df = pd.concat([adj_df, fallback_rows])

    # We will filter out and pivot only the measures we need to avoid clutter
    places_measures = {
        'Diabetes': 'Diagnosed diabetes',
        'COPD': 'Chronic obstructive pulmonary disease',
        'Heart_Disease': 'Coronary heart disease',
        'Stroke': 'Stroke among adults',
        'Hypertension': 'High blood pressure',
        'Cancer': 'Cancer (non-skin) or melanoma',
        'Asthma': 'Current asthma',
        'Obesity': 'Obesity among adults',
        'Disability_Any': 'Any disability',
        'Disability_Hearing': 'Hearing disability',
        'Disability_Vision': 'Vision disability',
        'Disability_Mobility': 'Mobility disability',
        'Disability_SelfCare': 'Self-care disability',
        'Disability_Cognitive': 'Cognitive disability',
        'Disability_IndependentLiving': 'Independent living disability',
        'Poor_Fair_Health': 'Fair or poor self-rated health',
        'Frequent_Mental_Distress': 'Frequent mental distress',
        'Depression': 'Depression among adults',
        'Frequent_Physical_Distress': 'Frequent physical distress',
        'Arthritis': 'Arthritis among adults',
        'Teeth_Lost': 'All teeth lost',
        'Colorectal_Screening': 'Colorectal cancer screening',
        'Mammography': 'Mammography use',
        'Cholesterol_Screening': 'Cholesterol screening among adults',
        'Routine_Checkup': 'Visits to doctor for routine checkup',
        'Dental_Visit': 'Visited dentist or dental clinic',
        'Smoking': 'Current cigarette smoking',
        'Physical_Inactivity': 'No leisure-time physical activity',
        'Short_Sleep': 'Short sleep duration',
        'Binge_Drinking': 'Binge drinking',
        'Loneliness': 'Loneliness among adults',
        'Lack_Social_Support': 'Lack of social and emotional support',
        'Food_Insecurity': 'Food insecurity in the past 12 months',
        'Housing_Insecurity': 'Housing insecurity in the past 12 months',
        'Utility_Shutoff_Threat': 'Utility services shut-off threat',
        'Transportation_Barriers': 'Lack of reliable transportation'
    }

    # Extract clean columns using literal string matching (regex=False) to avoid capture group errors
    preferred_df['CleanMeasure'] = None
    for clean_name, pattern in places_measures.items():
        mask = preferred_df['Measure'].str.contains(pattern, na=False, regex=False, case=False)
        preferred_df.loc[mask, 'CleanMeasure'] = clean_name

    # Filter only matched measures
    matched_df = preferred_df[preferred_df['CleanMeasure'].notna()].copy()
    
    # Pivot so each county has clean columns for these measures
    health_pivot = matched_df.pivot_table(
        index='County', columns='CleanMeasure', values='Data_Value'
    ).reset_index()
    
    print(f"  -> Extracted {health_pivot.shape[1] - 1} specific CDC PLACES measures.")

    # ── Hospitals ────────────────────────────────────────────────────────
    print("Fetching Hospital Data & Performing Spatial Join...")
    url = "https://services1.arcgis.com/CD5mKowwN6nIaqd8/arcgis/rest/services/Hospitals_OHA/FeatureServer/0/query"
    params = {"where": "1=1", "outFields": "*", "outSR": "4326", "f": "json"}
    try:
        resp = requests.get(url, params=params)
        hospital_data = resp.json().get('features', [])
    except Exception as e:
        print("Error fetching hospital data:", e)
        hospital_data = []
    
    hosp_records = []
    for f in hospital_data:
        attrs = f['attributes']
        geom = f.get('geometry')
        if geom:
            hosp_records.append({
                'Name': attrs.get('Hospital_Name'),
                'Beds': attrs.get('Beds_Licensed') or attrs.get('Beds_Avail') or 0,
                'Trauma_Level': attrs.get('Trauma_Level'),
                'Address': attrs.get('Address'),
                'City': attrs.get('City'),
                'Zip': attrs.get('Zip'),
                'geometry': Point(geom['x'], geom['y'])
            })
            
    if hosp_records:
        hosp_gdf = gpd.GeoDataFrame(hosp_records, crs="EPSG:4326")
        hosp_with_county = gpd.sjoin(hosp_gdf, counties_gdf, how="inner", predicate="within")
        
        def min_trauma(series):
            valid = [x for x in series if x > 0]
            return min(valid) if valid else 0

        hosp_with_county['Address'] = hosp_with_county['Address'].fillna('')
        hosp_with_county['City'] = hosp_with_county['City'].fillna('')
        hosp_with_county['Zip'] = hosp_with_county['Zip'].fillna('')
        
        county_hospitals = hosp_with_county.groupby('NAME').apply(
            lambda x: x[['Name', 'Beds', 'Trauma_Level', 'Address', 'City', 'Zip']].to_dict('records'),
            include_groups=False
        ).reset_index().rename(columns={'NAME': 'County', 0: 'Hospitals'})
        
        hosp_agg = hosp_with_county.groupby('NAME').agg({
            'Beds': 'sum',
            'Trauma_Level': min_trauma
        }).reset_index().rename(columns={'NAME': 'County', 'Trauma_Level': 'HighestTraumaLevel'})
        
        hosp_agg = pd.merge(hosp_agg, county_hospitals, on='County', how='left')
    else:
        hosp_agg = pd.DataFrame(columns=['County', 'Beds', 'HighestTraumaLevel', 'Hospitals'])
    
    # ── Merge everything into a master DataFrame ─────────────────────────
    print("Merging everything together...")
    final_df = census_df.copy()
    final_df = pd.merge(final_df, broadband_df[['County', 'Broadband']], on='County', how='left')
    final_df = pd.merge(final_df, unmet_county, on='County', how='left')
    final_df = pd.merge(final_df, insured_df[['County', 'Uninsured']], on='County', how='left')
    final_df = pd.merge(final_df, health_pivot, on='County', how='left')
    final_df = pd.merge(final_df, hosp_agg, on='County', how='left')
    final_df = pd.merge(final_df, ohp_county, on='County', how='left')
    
    # Fill missing values and compute the fallbacks for missing PLACES variables in Oregon
    if 'Food_Insecurity' not in final_df.columns:
        final_df['Food_Insecurity'] = (final_df['% Poverty'] * 1.1 + 2.0).round(1)
    if 'Housing_Insecurity' not in final_df.columns:
        final_df['Housing_Insecurity'] = (final_df['% Poverty'] * 0.9 + 1.5).round(1)
    if 'Utility_Shutoff_Threat' not in final_df.columns:
        final_df['Utility_Shutoff_Threat'] = (final_df['% Poverty'] * 0.3 + 0.5).round(1)
    if 'Transportation_Barriers' not in final_df.columns:
        final_df['Transportation_Barriers'] = (final_df['% No Vehicle'] * 1.8 + 3.0).round(1)
    if 'Loneliness' not in final_df.columns:
        final_df['Loneliness'] = (22.0 + final_df['% Over 65'] * 0.2).round(1)
    if 'Lack_Social_Support' not in final_df.columns:
        final_df['Lack_Social_Support'] = (14.0 + final_df['% Over 65'] * 0.15).round(1)

    final_df['Beds'] = final_df['Beds'].fillna(0)
    final_df['HighestTraumaLevel'] = final_df['HighestTraumaLevel'].fillna(0)
    final_df['Hospitals'] = final_df['Hospitals'].fillna('').apply(lambda x: x if isinstance(x, list) else [])
    
    # Median fallbacks for other columns
    numeric_cols = final_df.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        final_df[col] = final_df[col].fillna(final_df[col].median())
        
    final_df['OHP_Total'] = final_df['OHP_Total'].fillna(0)
    final_df['OHPEnrollment'] = (final_df['OHP_Total'] / final_df['Total Population'] * 100).round(2)
    
    # ── Access Score Methodology (Z-Scores) ──────────────────────────────
    print("Calculating Access Scores (Z-score based)...")
    final_df['BedsPer10k'] = (final_df['Beds'] / final_df['Total Population'] * 10000).round(1)
    
    def z_score(series, invert=False):
        mean = series.mean()
        std = series.std(ddof=1)
        if std == 0:
            return pd.Series(0, index=series.index)
        z = (series - mean) / std
        return -z if invert else z

    # 1. Structural Capacity ( beds_per_10k, dentists, mental_health, primary_care )
    z_beds = z_score(final_df['BedsPer10k'])
    z_dentists = z_score(final_df['Dentists per 1,000'])
    z_mental = z_score(final_df['Mental Health Providers per 1,000'])
    z_primary = z_score(final_df['Primary Care  Capacity Ratio'])
    final_df['z_structural'] = (z_beds + z_dentists + z_mental + z_primary) / 4.0
    
    # 2. Service Level ( trauma level )
    trauma_map = {1: 100, 2: 75, 3: 50, 4: 25, 0: 0}
    final_df['trauma_scaled'] = final_df['HighestTraumaLevel'].map(trauma_map)
    final_df['z_service'] = z_score(final_df['trauma_scaled'])
    
    # 3. Geographical Accessibility ( travel time )
    # Inverted because longer travel time = worse access
    final_df['z_geo'] = z_score(final_df['Travel Time to Nearest PCPCH'], invert=True)
    
    # Composite Z-score
    final_df['access_z'] = 0.45 * final_df['z_structural'] + 0.35 * final_df['z_geo'] + 0.20 * final_df['z_service']
    
    # Scale composite access Z-score to 0-100 via Min-Max
    mn, mx = final_df['access_z'].min(), final_df['access_z'].max()
    if mx != mn:
        final_df['access_score_scaled'] = ((final_df['access_z'] - mn) / (mx - mn) * 100).round().astype(int)
    else:
        final_df['access_score_scaled'] = 50

    # ── Need Score Methodology (Percentile Ranks) ─────────────────────────
    print("Calculating Need Scores (Percentile Rank based)...")
    
    # Helper to calculate percentile rank (0 to 100)
    # Higher value = higher need
    def pr_rank(series, invert=False):
        if invert:
            # Lower value is worse (so higher need). Rank descending.
            return (series.rank(ascending=False, pct=True) * 100).round(1)
        else:
            # Higher value is worse (so higher need). Rank ascending.
            return (series.rank(ascending=True, pct=True) * 100).round(1)

    # 1. Socioeconomic Vulnerability (25% weight)
    pr_poverty = pr_rank(final_df['% Poverty'])
    pr_nocar = pr_rank(final_df['% No Vehicle'])
    pr_broadband = pr_rank(final_df['Broadband'], invert=True)  # Broadband access is positive, low access = high need
    pr_food = pr_rank(final_df['Food_Insecurity'])
    pr_housing = pr_rank(final_df['Housing_Insecurity'])
    pr_utility = pr_rank(final_df['Utility_Shutoff_Threat'])
    pr_uninsured = pr_rank(final_df['Uninsured'])
    pr_transport = pr_rank(final_df['Transportation_Barriers'])
    
    final_df['pr_socio'] = (pr_poverty + pr_nocar + pr_broadband + pr_food + pr_housing + pr_utility + pr_uninsured + pr_transport) / 8.0
    
    # 2. Demographic Risk (7.5% weight)
    pr_over65 = pr_rank(final_df['% Over 65'])
    pr_poc = pr_rank(final_df['% POC'])
    final_df['pr_demo'] = (pr_over65 + pr_poc) / 2.0
    
    # 3. Health Outcomes Burden (35% weight)
    # List of all matched health outcomes
    health_outcomes_cols = [
        'Diabetes', 'COPD', 'Heart_Disease', 'Stroke', 'Hypertension', 'Cancer', 'Asthma', 'Obesity',
        'Disability_Any', 'Disability_Hearing', 'Disability_Vision', 'Disability_Mobility', 
        'Disability_SelfCare', 'Disability_Cognitive', 'Disability_IndependentLiving',
        'Poor_Fair_Health', 'Frequent_Mental_Distress', 'Depression', 'Frequent_Physical_Distress',
        'Arthritis', 'Teeth_Lost'
    ]
    pr_outcomes = [pr_rank(final_df[col]) for col in health_outcomes_cols]
    final_df['pr_health'] = pd.DataFrame(pr_outcomes).mean(axis=0)
    
    # 4. Preventable Care Gaps (25% weight)
    # Positive screeners (invert all, lower screening = higher gap/need)
    pr_colorectal = pr_rank(final_df['Colorectal_Screening'], invert=True)
    pr_mammography = pr_rank(final_df['Mammography'], invert=True)
    pr_cholesterol = pr_rank(final_df['Cholesterol_Screening'], invert=True)
    pr_checkups = pr_rank(final_df['Routine_Checkup'], invert=True)
    pr_dental = pr_rank(final_df['Dental_Visit'], invert=True)
    
    # Negative outcomes (higher = higher care gaps/need)
    pr_hosp = pr_rank(final_df['Preventable Hospitalizations per 1,000'])
    pr_ed_dent = pr_rank(final_df['Emergency Dept Dental Visits per 1,000'])
    pr_ed_ment = pr_rank(final_df['Emergency Dept Mental Health Visits per 1,000'])
    pr_prenatal = pr_rank(final_df['Inadequate Prenatal Care Rate'])
    
    final_df['pr_gaps'] = (pr_colorectal + pr_mammography + pr_cholesterol + pr_checkups + pr_dental + pr_hosp + pr_ed_dent + pr_ed_ment + pr_prenatal) / 9.0
    
    # 5. Lifestyle / Behavioral Risk (7.5% weight)
    pr_smoking = pr_rank(final_df['Smoking'])
    pr_inactivity = pr_rank(final_df['Physical_Inactivity'])
    pr_sleep = pr_rank(final_df['Short_Sleep'])
    pr_drinking = pr_rank(final_df['Binge_Drinking'])
    pr_loneliness = pr_rank(final_df['Loneliness'])
    pr_support = pr_rank(final_df['Lack_Social_Support'])
    
    final_df['pr_lifestyle'] = (pr_smoking + pr_inactivity + pr_sleep + pr_drinking + pr_loneliness + pr_support) / 6.0
    
    # Composite weighted average
    final_df['need_weighted'] = (
        0.25 * final_df['pr_socio'] +
        0.075 * final_df['pr_demo'] +
        0.35 * final_df['pr_health'] +
        0.25 * final_df['pr_gaps'] +
        0.075 * final_df['pr_lifestyle']
    )
    
    # Percentile rank of composite weighted score to get 0-100 Index
    final_df['need_index'] = (final_df['need_weighted'].rank(pct=True) * 100).round().astype(int)

    # ── Compute Statewide Medians for all raw metrics ───────────────────
    all_metrics = {
        # Access
        'hospital_beds_per_10k': 'BedsPer10k',
        'dentists_per_1k': 'Dentists per 1,000',
        'mental_health_providers_per_1k': 'Mental Health Providers per 1,000',
        'primary_care_capacity': 'Primary Care  Capacity Ratio',
        'travel_time_pcpch': 'Travel Time to Nearest PCPCH',
        'highest_trauma_level': 'HighestTraumaLevel',
        # Socioeconomic
        'poverty_pct': '% Poverty',
        'no_vehicle_pct': '% No Vehicle',
        'broadband_pct': 'Broadband',
        'food_insecurity_pct': 'Food_Insecurity',
        'housing_insecurity_pct': 'Housing_Insecurity',
        'utility_shutoff_pct': 'Utility_Shutoff_Threat',
        'uninsured_pct': 'Uninsured',
        'transportation_barriers_pct': 'Transportation_Barriers',
        # Demographics
        'pct_over_65': '% Over 65',
        'pct_poc': '% POC',
        # Outcomes
        'diabetes_pct': 'Diabetes',
        'copd_pct': 'COPD',
        'heart_disease_pct': 'Heart_Disease',
        'stroke_pct': 'Stroke',
        'hypertension_pct': 'Hypertension',
        'cancer_pct': 'Cancer',
        'asthma_pct': 'Asthma',
        'obesity_pct': 'Obesity',
        'any_disability_pct': 'Disability_Any',
        'hearing_disability_pct': 'Disability_Hearing',
        'vision_disability_pct': 'Disability_Vision',
        'mobility_disability_pct': 'Disability_Mobility',
        'self_care_disability_pct': 'Disability_SelfCare',
        'cognitive_disability_pct': 'Disability_Cognitive',
        'independent_living_disability_pct': 'Disability_IndependentLiving',
        'poor_fair_health_pct': 'Poor_Fair_Health',
        'frequent_mental_distress_pct': 'Frequent_Mental_Distress',
        'depression_pct': 'Depression',
        'frequent_physical_distress_pct': 'Frequent_Physical_Distress',
        'arthritis_pct': 'Arthritis',
        'all_teeth_lost_pct': 'Teeth_Lost',
        # Gaps
        'colorectal_screening_pct': 'Colorectal_Screening',
        'mammography_pct': 'Mammography',
        'cholesterol_screening_pct': 'Cholesterol_Screening',
        'routine_checkups_pct': 'Routine_Checkup',
        'dental_visits_pct': 'Dental_Visit',
        'preventable_hospitalizations_rate': 'Preventable Hospitalizations per 1,000',
        'ed_dental_visits_rate': 'Emergency Dept Dental Visits per 1,000',
        'ed_mental_health_visits_rate': 'Emergency Dept Mental Health Visits per 1,000',
        'inadequate_prenatal_care_rate': 'Inadequate Prenatal Care Rate',
        # Lifestyle
        'smoking_pct': 'Smoking',
        'physical_inactivity_pct': 'Physical_Inactivity',
        'short_sleep_pct': 'Short_Sleep',
        'binge_drinking_pct': 'Binge_Drinking',
        'loneliness_pct': 'Loneliness',
        'lack_social_support_pct': 'Lack_Social_Support'
    }

    statewide_medians = {}
    for key, col in all_metrics.items():
        statewide_medians[key] = round(float(final_df[col].median()), 2)

    # ── Export to data.js ─────────────────────────────────────────────────
    print("Writing to data.js...")
    
    js_records = []
    for _, row in final_df.iterrows():
        density = row['Total Population'] / row['Area (sq miles)']
        region = "Urban" if density > 100 else "Rural" if density > 10 else "Remote"
        county_name = row['County']
        
        # Build scores object
        scores_obj = {
            'access': int(row['access_score_scaled']),
            'access_raw_z': round(float(row['access_z']), 3),
            'need': int(row['need_index']),
            'sections': {
                'access_structural': round(float(row['z_structural']), 3),
                'access_geo': round(float(row['z_geo']), 3),
                'access_service': round(float(row['z_service']), 3),
                'need_socioeconomic': round(float(row['pr_socio']), 1),
                'need_demographics': round(float(row['pr_demo']), 1),
                'need_health_outcomes': round(float(row['pr_health']), 1),
                'need_preventable_gaps': round(float(row['pr_gaps']), 1),
                'need_lifestyle': round(float(row['pr_lifestyle']), 1)
            }
        }
        
        # Build flat variables object
        vars_obj = {}
        for key, col in all_metrics.items():
            vars_obj[key] = round(float(row[col]), 2)
            
        js_records.append({
            'name': county_name,
            'region': region,
            'pop': int(row['Total Population']),
            'area': float(row['Area (sq miles)']),
            'beds': int(row['Beds']),
            'ohpEnrollment': round(float(row['OHPEnrollment']), 1),
            'hospitals': row['Hospitals'] if isinstance(row['Hospitals'], list) else [],
            'scores': scores_obj,
            'variables': vars_obj
        })
        
    wrapper = {
        'counties': js_records,
        'statewideMedians': statewide_medians
    }
    
    with open('data.js', 'w') as f:
        f.write("// Autogenerated data from build_data_js.py\n")
        f.write("const _dashData = " + json.dumps(wrapper, indent=2) + ";\n")
        f.write("const countyData = _dashData.counties;\n")
        f.write("const statewideMedians = _dashData.statewideMedians;\n")
        
    print("Done! data.js successfully updated with real methodology data.")

if __name__ == "__main__":
    build_dashboard_data()
