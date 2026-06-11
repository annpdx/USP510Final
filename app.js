// Variable Metadata mapping raw keys to clean expanded names, units, and polarities
const variableMetadata = {
    // Access Score Components
    'access': { name: '-- Healthcare Access Score (Composite) --', unit: '', section: 'access', reverse: false, isSummary: true },
    'hospital_beds_per_10k': { name: 'Hospital Beds per 10,000 residents', unit: ' beds', section: 'access', reverse: false },
    'dentists_per_1k': { name: 'Dentists per 1,000 residents', unit: ' dentists', section: 'access', reverse: false },
    'mental_health_providers_per_1k': { name: 'Mental Health Providers per 1,000 residents', unit: ' providers', section: 'access', reverse: false },
    'primary_care_capacity': { name: 'Primary Care Capacity Ratio', unit: '', section: 'access', reverse: false },
    'travel_time_pcpch': { name: 'Travel Time to Patient-Centered Primary Care Home', unit: ' minutes', section: 'access', reverse: true },
    'hospitals_per_sq_mile': { name: 'Hospitals per Square Mile', unit: ' /sq mi', section: 'access', reverse: false },
    'highest_trauma_level': { name: 'Highest Trauma Designation Level Available', unit: ' Level', section: 'access', reverse: false },

    // Socioeconomic Vulnerability
    'need_socioeconomic': { name: '-- Socioeconomic Vulnerability Summary Score --', unit: '%', section: 'socioeconomic', reverse: false, isSummary: true },
    'poverty_pct': { name: 'Poverty Rate', unit: '%', section: 'socioeconomic', reverse: false },
    'no_vehicle_pct': { name: 'Households without Vehicle', unit: '%', section: 'socioeconomic', reverse: false },
    'broadband_pct': { name: 'Broadband Access Rate', unit: '%', section: 'socioeconomic', reverse: true }, // positive, low access = high need
    'uninsured_pct': { name: 'Uninsured Rate (Small Area Health Insurance Estimates)', unit: '%', section: 'socioeconomic', reverse: false },

    // Demographic Risk
    'need_demographics': { name: '-- Demographic Risk Summary Score --', unit: '%', section: 'demographics', reverse: false, isSummary: true },
    'pct_over_65': { name: 'Population aged 65 and over', unit: '%', section: 'demographics', reverse: false },
    'pct_poc': { name: 'People of Color (POC) %', unit: '%', section: 'demographics', reverse: false },

    // Health Outcomes & Disease Burden
    'need_health_outcomes': { name: '-- Health Outcomes Summary Score --', unit: '%', section: 'health_outcomes', reverse: false, isSummary: true },
    'diabetes_pct': { name: 'Diagnosed Diabetes among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'copd_pct': { name: 'Chronic Obstructive Pulmonary Disease', unit: '%', section: 'health_outcomes', reverse: false },
    'heart_disease_pct': { name: 'Coronary Heart Disease among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'stroke_pct': { name: 'Stroke Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'hypertension_pct': { name: 'High Blood Pressure (Hypertension) among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'cancer_pct': { name: 'Cancer (non-skin) or Melanoma among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'asthma_pct': { name: 'Current Asthma Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'obesity_pct': { name: 'Obesity Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'any_disability_pct': { name: 'Any Disability Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'hearing_disability_pct': { name: 'Hearing Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'vision_disability_pct': { name: 'Vision Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'mobility_disability_pct': { name: 'Mobility Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'self_care_disability_pct': { name: 'Self-Care Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'cognitive_disability_pct': { name: 'Cognitive Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'independent_living_disability_pct': { name: 'Independent Living Disability among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'poor_fair_health_pct': { name: 'Fair or Poor Self-Rated Health Status among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'frequent_mental_distress_pct': { name: 'Frequent Mental Distress Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'depression_pct': { name: 'Depression Diagnosis among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'frequent_physical_distress_pct': { name: 'Frequent Physical Distress Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'arthritis_pct': { name: 'Arthritis Prevalence among Adults', unit: '%', section: 'health_outcomes', reverse: false },
    'all_teeth_lost_pct': { name: 'All Teeth Lost among Adults aged >=65 Years', unit: '%', section: 'health_outcomes', reverse: false },

    // Preventable Care Gaps
    'need_preventable_gaps': { name: '-- Preventable Care Gaps Summary Score --', unit: '%', section: 'preventable_gaps', reverse: false, isSummary: true },
    'colorectal_screening_pct': { name: 'Colorectal Cancer Screening (ages 45-75)', unit: '%', section: 'preventable_gaps', reverse: true }, // positive, low = high need
    'mammography_pct': { name: 'Mammography Use (women ages 50-74)', unit: '%', section: 'preventable_gaps', reverse: true }, // positive
    'cholesterol_screening_pct': { name: 'Cholesterol Screening among Adults', unit: '%', section: 'preventable_gaps', reverse: true }, // positive
    'routine_checkups_pct': { name: 'Routine Checkup Doctor Visits within the past year', unit: '%', section: 'preventable_gaps', reverse: true }, // positive
    'dental_visits_pct': { name: 'Visited Dentist or Dental Clinic in the past year', unit: '%', section: 'preventable_gaps', reverse: true }, // positive
    'preventable_hospitalizations_rate': { name: 'Ambulatory Care Sensitive (Preventable) Hospitalizations', unit: ' per 1,000', section: 'preventable_gaps', reverse: false },
    'ed_dental_visits_rate': { name: 'Emergency Department Dental Visits', unit: ' per 1,000', section: 'preventable_gaps', reverse: false },
    'ed_mental_health_visits_rate': { name: 'Emergency Department Mental Health & Substance Visits', unit: ' per 1,000', section: 'preventable_gaps', reverse: false },
    'inadequate_prenatal_care_rate': { name: 'Inadequate Prenatal Care Rate', unit: '%', section: 'preventable_gaps', reverse: false },

    // Lifestyle Risks
    'need_lifestyle': { name: '-- Lifestyle Risk Summary Score --', unit: '%', section: 'lifestyle', reverse: false, isSummary: true },
    'smoking_pct': { name: 'Current Cigarette Smoking among Adults', unit: '%', section: 'lifestyle', reverse: false },
    'physical_inactivity_pct': { name: 'No Leisure-Time Physical Activity among Adults', unit: '%', section: 'lifestyle', reverse: false },
    'short_sleep_pct': { name: 'Short Sleep Duration (<7 hours) among Adults', unit: '%', section: 'lifestyle', reverse: false },
    'binge_drinking_pct': { name: 'Binge Drinking Prevalence among Adults', unit: '%', section: 'lifestyle', reverse: false }
};

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const viewSections = document.querySelectorAll('.view-section');
const countySelect = document.getElementById('county-select');
const pageTitle = document.getElementById('page-title');
const exportBtn = document.getElementById('export-btn');

// State Variables
let accessMap, needMap, explorerMap;
let accessGeojsonLayer, needGeojsonLayer, explorerGeojsonLayer;
let syncLock = false;
let scatterChartInstance = null;
let currentSelectedCounty = "statewide"; // default statewide overview

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    populateCountySelect();
    calculateStatewideStats();
    initMainMaps();
    initChart();
    initExplorer();
    renderStatewideProfile(); // Initial render as statewide overview

    // Print/Export Logic
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Listen to Print Events to automatically expand accordions for full coverage
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.accordion-item').forEach(el => el.classList.add('active'));
    });

    window.addEventListener('afterprint', () => {
        document.querySelectorAll('.accordion-item').forEach((el, idx) => {
            // Keep only Health Outcomes (idx=0) expanded, collapse others
            if (idx > 0) el.classList.remove('active');
        });
    });
});

// Navigation Handling
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            const viewId = item.getAttribute('data-view');
            viewSections.forEach(v => v.classList.remove('active'));

            const targetSection = document.getElementById(`view-${viewId}`);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Set Page Title
            const viewTitles = {
                'dashboard': 'Dashboard & Maps Overview',
                'profile': 'Detailed County Profile',
                'explorer': 'Custom Indicator Map Explorer',
                'analysis': 'Access vs. Need Correlation Analysis',
                'methodology': 'Methodology, Data Sources & AI Verification'
            };
            pageTitle.textContent = viewTitles[viewId] || 'Oregon Health Access';

            // Invalidate Leaflet map size on view transitions (avoids blank/gray tiles)
            setTimeout(() => {
                if (viewId === 'dashboard') {
                    if (accessMap) accessMap.invalidateSize();
                    if (needMap) needMap.invalidateSize();
                } else if (viewId === 'explorer') {
                    if (explorerMap) explorerMap.invalidateSize();
                }
            }, 150);
        });
    });
}

// County Selector Dropdown
function populateCountySelect() {
    const sorted = [...countyData].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach(county => {
        const option = document.createElement('option');
        option.value = county.name;
        option.textContent = county.name;
        countySelect.appendChild(option);
    });

    countySelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (selected === 'statewide') {
            selectStatewide();
        } else {
            selectCounty(selected, false); // Disabled automatic profile tab jump
        }
    });
}

// Statistics Cards on Dashboard
function calculateStatewideStats() {
    const avgNeed = Math.round(countyData.reduce((sum, c) => sum + c.scores.need, 0) / countyData.length);

    // Average hospital beds per 10k residents
    const avgBeds = (countyData.reduce((sum, c) => sum + c.variables.hospital_beds_per_10k, 0) / countyData.length).toFixed(1);

    // Count of high need counties (index > 70)
    const highNeedCount = countyData.filter(c => c.scores.need > 70).length;

    document.getElementById('stat-need').textContent = avgNeed;
    document.getElementById('stat-beds').textContent = avgBeds;
    document.getElementById('stat-high-need').textContent = highNeedCount;
}

// Map Palette Helpers
function getNeedColor(d) {
    return d > 80 ? '#800026' :
        d > 65 ? '#BD0026' :
            d > 50 ? '#E31A1C' :
                d > 35 ? '#FC4E2A' :
                    d > 20 ? '#FD8D3C' :
                        '#FEB24C';
}

function getAccessColor(d) {
    return d > 80 ? '#005a32' :
        d > 65 ? '#238b45' :
            d > 50 ? '#41ab5d' :
                d > 35 ? '#74c476' :
                    d > 20 ? '#a1d99b' :
                        '#c7e9c0';
}

// ── Sync side-by-side maps on Dashboard ────────────────────────────────
function initMainMaps() {
    // 1. Access Map
    accessMap = L.map('map-access', { zoomControl: true }).setView([44.0, -120.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }).addTo(accessMap);

    // 2. Need Map
    needMap = L.map('map-need', { zoomControl: false }).setView([44.0, -120.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }).addTo(needMap);

    // real-time sync movement & zoom
    accessMap.on('move', () => {
        if (!syncLock) {
            syncLock = true;
            needMap.setView(accessMap.getCenter(), accessMap.getZoom(), { animate: false });
            syncLock = false;
        }
    });

    needMap.on('move', () => {
        if (!syncLock) {
            syncLock = true;
            accessMap.setView(needMap.getCenter(), needMap.getZoom(), { animate: false });
            syncLock = false;
        }
    });

    renderMainMapsData();
}

function renderMainMapsData() {
    if (typeof countyGeoJSON === 'undefined') return;

    // Access Layer styling & handlers
    accessGeojsonLayer = L.geoJSON(countyGeoJSON, {
        style: function (feature) {
            const name = feature.properties.NAME;
            const county = countyData.find(c => c.name === name);
            const isSelected = name === currentSelectedCounty;

            return {
                fillColor: county ? getAccessColor(county.scores.access) : '#cccccc',
                color: isSelected ? '#1e293b' : '#ffffff',
                weight: isSelected ? 3.5 : 1.5,
                opacity: 1,
                fillOpacity: 0.8
            };
        },
        onEachFeature: function (feature, layer) {
            const name = feature.properties.NAME;
            const county = countyData.find(c => c.name === name);
            if (!county) return;

            // Removed Travel time to PCPCH from the access map popups as requested
            layer.bindTooltip(`<b>${county.name} County</b><br>Healthcare Access Score: ${county.scores.access}/100<br>Hospital Beds/10k: ${county.variables.hospital_beds_per_10k}<br>Trauma level: ${county.variables.highest_trauma_level}<br><br><em>Click to select</em>`);
            layer.on('click', () => {
                selectCounty(county.name, false); // Disabled automatic profile view jump
            });
        }
    }).addTo(accessMap);

    // Need Layer styling & handlers
    needGeojsonLayer = L.geoJSON(countyGeoJSON, {
        style: function (feature) {
            const name = feature.properties.NAME;
            const county = countyData.find(c => c.name === name);
            const isSelected = name === currentSelectedCounty;

            return {
                fillColor: county ? getNeedColor(county.scores.need) : '#cccccc',
                color: isSelected ? '#1e293b' : '#ffffff',
                weight: isSelected ? 3.5 : 1.5,
                opacity: 1,
                fillOpacity: 0.8
            };
        },
        onEachFeature: function (feature, layer) {
            const name = feature.properties.NAME;
            const county = countyData.find(c => c.name === name);
            if (!county) return;

            layer.bindTooltip(`<b>${county.name} County</b><br>Healthcare Need Index: ${county.scores.need}/100<br>Population: ${county.pop.toLocaleString()}<br>Poverty Rate: ${county.variables.poverty_pct}%<br>Uninsured Rate: ${county.variables.uninsured_pct}%<br><br><em>Click to select</em>`);
            layer.on('click', () => {
                selectCounty(county.name, false); // Disabled automatic profile view jump
            });
        }
    }).addTo(needMap);

    // Render Legends
    renderLegend(document.getElementById('legend-access'), 'Access Score', [20, 35, 50, 65, 80], getAccessColor);
    renderLegend(document.getElementById('legend-need'), 'Need Index', [20, 35, 50, 65, 80], getNeedColor);
}

function renderLegend(container, title, grades, colorFunc) {
    let html = `<h4>${title}</h4>`;
    for (let i = 0; i < grades.length; i++) {
        const lower = grades[i];
        const upper = grades[i + 1];
        html += `
            <div class="legend-item">
                <div class="legend-color" style="background:${colorFunc(lower + 1)}"></div>
                <span>${lower}${upper ? '&ndash;' + upper : '+'}</span>
            </div>
        `;
    }
    container.innerHTML = html;
}

// ── Highlight and auto-zoom when selecting a county ───────────────────
function selectCounty(countyName, jumpToProfileView = false) {
    currentSelectedCounty = countyName;
    countySelect.value = countyName;

    // Highlight boundaries in both maps and sort order using bringToFront()
    highlightCountyInLayer(accessGeojsonLayer, countyName);
    highlightCountyInLayer(needGeojsonLayer, countyName);
    highlightCountyInLayer(explorerGeojsonLayer, countyName);

    // Render the Detailed Profile
    const county = countyData.find(c => c.name === countyName);
    if (county) {
        renderCountyProfile(county);
    }

    // Fit maps bounds to selected county
    if (typeof countyGeoJSON !== 'undefined') {
        const feature = countyGeoJSON.features.find(f => f.properties.NAME === countyName);
        if (feature) {
            const tempLayer = L.geoJSON(feature);
            const bounds = tempLayer.getBounds();

            if (accessMap) accessMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
            if (explorerMap) explorerMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
        }
    }

    // Optional jump
    if (jumpToProfileView) {
        const navItemProfile = document.querySelector('[data-view="profile"]');
        if (navItemProfile) navItemProfile.click();
    }
}

// Solves drawing order so highlighted dark line borders sit on top of unselected county borders
function highlightCountyInLayer(geojsonLayer, countyName) {
    if (!geojsonLayer) return;
    geojsonLayer.eachLayer(layer => {
        const name = layer.feature.properties.NAME;
        if (name === countyName) {
            layer.setStyle({
                color: '#1e293b',
                weight: 3.5,
                opacity: 1
            });
            layer.bringToFront(); // Standard Leaflet rendering sort elevation fix
        } else {
            geojsonLayer.resetStyle(layer);
        }
    });
}

// Select Statewide view
function selectStatewide() {
    currentSelectedCounty = "statewide";
    countySelect.value = "statewide";

    // Zoom maps back to initial statewide coordinates
    if (accessMap) accessMap.setView([44.0, -120.5], 6);
    if (needMap) needMap.setView([44.0, -120.5], 6);
    if (explorerMap) explorerMap.setView([44.0, -120.5], 6);

    // Reset styles
    if (accessGeojsonLayer) accessGeojsonLayer.setStyle(accessGeojsonLayer.options.style);
    if (needGeojsonLayer) needGeojsonLayer.setStyle(needGeojsonLayer.options.style);
    if (explorerGeojsonLayer) explorerGeojsonLayer.setStyle(explorerGeojsonLayer.options.style);

    renderStatewideProfile();
}

// Render Statewide profile overview dynamically
function renderStatewideProfile() {
    document.getElementById('full-profile-name').textContent = "State of Oregon Overview";

    const totalPop = countyData.reduce((sum, c) => sum + c.pop, 0);
    const totalArea = countyData.reduce((sum, c) => sum + c.area, 0);
    const density = (totalPop / totalArea).toFixed(1);

    // context layout in 3 clean lines as requested
    document.getElementById('profile-meta-context').innerHTML = `
        <div><strong>Total Population:</strong> ${totalPop.toLocaleString()} residents</div>
        <div><strong>County Area:</strong> ${totalArea.toLocaleString()} square miles</div>
        <div><strong>Population Density:</strong> ${density} people/square mile</div>
    `;

    document.getElementById('profile-region').textContent = "Oregon Statewide";

    const avgNeed = Math.round(countyData.reduce((sum, c) => sum + c.scores.need, 0) / countyData.length);
    const avgAccess = Math.round(countyData.reduce((sum, c) => sum + c.scores.access, 0) / countyData.length);

    document.getElementById('profile-need-badge').textContent = `Healthcare Need Index: ${avgNeed}`;
    document.getElementById('profile-access-badge').textContent = `Healthcare Access Score: ${avgAccess}`;

    // Total licensed hospitals in Oregon (the sum across all counties)
    const totalHospitals = countyData.reduce((sum, c) => sum + (c.hospitals ? c.hospitals.length : 0), 0);
    const totalBeds = countyData.reduce((sum, c) => sum + c.beds, 0);

    // hospital count badge removed & aligned in text
    document.getElementById('profile-hospitals').innerHTML = `
        <div style="margin-bottom: 12px;">
            <strong>Licensed Hospitals in County:</strong> ${totalHospitals} licensed facilities across Oregon
        </div>
        <div class="hospital-item">
            <h4>Oregon Healthcare System Infrastructure Summary</h4>
            <div class="hospital-details">
                <div><strong>Total Licensed Beds:</strong> ${totalBeds.toLocaleString()} beds state-wide</div>
                <div><strong>Average Beds/10k:</strong> ${(totalBeds / totalPop * 10000).toFixed(1)} beds</div>
                <div><strong>Trauma Capability:</strong> Level 1 comprehensive centers situated in regional centers</div>
            </div>
        </div>
    `;

    // 2. Access Section (state average baseline)
    document.getElementById('profile-access-section').innerHTML = `
        <div class="profile-stat">
            <div class="stat-label">Hospital Beds per 10,000 residents</div>
            <div class="stat-num-container">
                <div class="stat-num">${(totalBeds / totalPop * 10000).toFixed(1)} beds</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
        <div class="profile-stat">
            <div class="stat-label">Dentists per 1,000 residents</div>
            <div class="stat-num-container">
                <div class="stat-num">0.82 dentists</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
        <div class="profile-stat">
            <div class="stat-label">Mental Health Providers per 1,000</div>
            <div class="stat-num-container">
                <div class="stat-num">3.51 providers</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
        <div class="profile-stat">
            <div class="stat-label">Primary Care Capacity Ratio</div>
            <div class="stat-num-container">
                <div class="stat-num">0.84</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
        <div class="profile-stat">
            <div class="stat-label">Travel Time to Nearest PCPCH</div>
            <div class="stat-num-container">
                <div class="stat-num">12.8 min</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
        <div class="profile-stat">
            <div class="stat-label">Trauma Designation Scale (Highest)</div>
            <div class="stat-num-container">
                <div class="stat-num">Level 1</div>
                <span class="status-badge status-good">Average</span>
            </div>
            <div class="stat-meta">Standardized Z-Score: <strong>0.00</strong></div>
        </div>
    `;

    // 3. Need Section (statewide medians)
    renderStatewideNeedAccordion();
}

function renderStatewideNeedAccordion() {
    // Ordered Need Sections by Weight (Outcomes 35%, Socioeconomic 25%, Preventable Care Gaps 25%, Demographics 7.5%, Lifestyle 7.5%)
    // Weight mentions removed from headings as requested
    const sections = {
        'health_outcomes': {
            title: 'Health Outcomes & Disease Burden',
            icon: '&#x1F3E5;',
            keys: [
                'diabetes_pct', 'copd_pct', 'heart_disease_pct', 'stroke_pct', 'hypertension_pct', 'cancer_pct', 'asthma_pct', 'obesity_pct',
                'any_disability_pct', 'hearing_disability_pct', 'vision_disability_pct', 'mobility_disability_pct',
                'self_care_disability_pct', 'cognitive_disability_pct', 'independent_living_disability_pct',
                'poor_fair_health_pct', 'frequent_mental_distress_pct', 'depression_pct', 'frequent_physical_distress_pct',
                'arthritis_pct', 'all_teeth_lost_pct'
            ]
        },
        'socioeconomic': {
            title: 'Socioeconomic Vulnerability',
            icon: '&#x1F4B5;',
            keys: ['poverty_pct', 'no_vehicle_pct', 'broadband_pct', 'uninsured_pct']
        },
        'preventable_gaps': {
            title: 'Preventable Care Gaps & Outcomes',
            icon: '&#x1F6E1;',
            keys: ['colorectal_screening_pct', 'mammography_pct', 'cholesterol_screening_pct', 'routine_checkups_pct', 'dental_visits_pct', 'preventable_hospitalizations_rate', 'ed_dental_visits_rate', 'ed_mental_health_visits_rate', 'inadequate_prenatal_care_rate']
        },
        'demographics': {
            title: 'Demographic Risk Factors',
            icon: '&#x1F46A;',
            keys: ['pct_over_65', 'pct_poc']
        },
        'lifestyle': {
            title: 'Lifestyle & Behavioral Risk Factors',
            icon: '&#x1F6AC;',
            keys: ['smoking_pct', 'physical_inactivity_pct', 'short_sleep_pct', 'binge_drinking_pct']
        }
    };

    let html = '';
    for (const [secKey, sec] of Object.entries(sections)) {
        let tableRows = '';
        sec.keys.forEach(key => {
            const meta = variableMetadata[key];
            if (!meta) return;
            const medianVal = statewideMedians[key];

            // For statewide view, the comparison matches baseline median
            tableRows += `
                <tr>
                    <td><span class="indicator-dot" style="background:var(--accent-primary)"></span> ${meta.name}</td>
                    <td><strong>${medianVal}${meta.unit}</strong></td>
                    <td>${medianVal}${meta.unit}</td>
                    <td style="text-align:right"><span class="status-badge status-good" style="background:rgba(90,167,167,0.06); color:var(--accent-primary); border:1px solid var(--glass-border);">Median</span></td>
                </tr>
            `;
        });

        html += `
            <div class="accordion-item" id="accordion-${secKey}">
                <div class="accordion-header" onclick="toggleAccordion('${secKey}')">
                    <span>${sec.icon} &nbsp; ${sec.title}</span>
                    <span style="display:flex; align-items:center; gap:12px;">
                        <span class="badge" style="font-size:0.75rem;">State Median Base</span>
                        <span class="accordion-icon">&#9660;</span>
                    </span>
                </div>
                <div class="accordion-content">
                    <table class="metric-table">
                        <thead>
                            <tr>
                                <th>Methodology Variable</th>
                                <th>State Median Value</th>
                                <th>Statewide Median</th>
                                <th style="text-align:right">Comparison</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    document.getElementById('profile-need-accordion').innerHTML = html;
    toggleAccordion('health_outcomes'); // Open Health Outcomes first since it is sorted by weight
}

// ── Detailed County Profile rendering ────────────────────────────────
function renderCountyProfile(county) {
    document.getElementById('full-profile-name').textContent = `${county.name} County Profile`;

    const density = (county.pop / county.area).toFixed(1);

    // Demographic details context displayed in 3 clean lines
    document.getElementById('profile-meta-context').innerHTML = `
        <div><strong>Total Population:</strong> ${county.pop.toLocaleString()} residents</div>
        <div><strong>County Area:</strong> ${county.area.toLocaleString()} square miles</div>
        <div><strong>Population Density:</strong> ${density} people/square mile</div>
    `;

    document.getElementById('profile-region').textContent = `${county.region} Classification`;
    document.getElementById('profile-need-badge').textContent = `Healthcare Need Index: ${county.scores.need}`;
    document.getElementById('profile-access-badge').textContent = `Healthcare Access Score: ${county.scores.access}`;

    // 1. Hospital Infrastructure
    let hospHtml = '';
    if (county.hospitals && county.hospitals.length > 0) {
        // square badge around count removed and made normal size
        hospHtml += `
            <div style="margin-bottom: 12px;">
                <strong>Licensed Hospitals in County:</strong> ${county.hospitals.length}
            </div>
            <div class="hospitals-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
        `;
        county.hospitals.forEach(h => {
            const traumaText = h.Trauma_Level > 0
                ? `Level ${h.Trauma_Level} Certified`
                : 'No Trauma Certification Available';

            hospHtml += `
                <div class="hospital-item">
                    <h4>${h.Name}</h4>
                    <div class="hospital-details">
                        <div><strong>Hospital Address:</strong> ${h.Address}, ${h.City} ${h.Zip}</div>
                        <div><strong>Beds:</strong> ${h.Beds} licensed beds</div>
                        <div><strong>Trauma Level:</strong> <span class="highlight">${traumaText}</span></div>
                    </div>
                </div>
            `;
        });
        hospHtml += `</div>`;
    } else {
        hospHtml = `
            <div style="margin-bottom: 12px;">
                <strong>Licensed Hospitals in County:</strong> 0
            </div>
            <p class="placeholder-text">No licensed hospitals found inside ${county.name} County boundaries.</p>
        `;
    }
    document.getElementById('profile-hospitals').innerHTML = hospHtml;

    // Helper function to build stat card with Z-Score meta context & compact +/- signs
    const renderAccessStat = (label, val, unit, zScore, invert = false) => {
        const isGood = invert ? (zScore < 0) : (zScore > 0);
        const zClass = isGood ? 'status-good' : 'status-bad';
        const zSign = zScore > 0 ? '+' : '';
        const statusSignText = isGood ? '+' : '-'; // Compact +/- marker instead of wordy text

        return `
            <div class="profile-stat">
                <div class="stat-label">${label}</div>
                <div class="stat-num-container">
                    <div class="stat-num">${val}${unit}</div>
                    <span class="status-badge ${zClass}">${statusSignText}</span>
                </div>
                <div class="stat-meta">Standardized Z-Score: <strong>${zSign}${zScore.toFixed(2)}</strong></div>
            </div>
        `;
    };

    // 2. Healthcare Access Section (Z-score components)
    document.getElementById('profile-access-section').innerHTML = `
        ${renderAccessStat('Hospital Beds per 10,000 residents', county.variables.hospital_beds_per_10k, ' beds', county.scores.sections.access_structural)}
        ${renderAccessStat('Dentists per 1,000 residents', county.variables.dentists_per_1k, ' dentists', county.scores.sections.access_structural)}
        ${renderAccessStat('Mental Health Providers per 1,000', county.variables.mental_health_providers_per_1k, ' providers', county.scores.sections.access_structural)}
        ${renderAccessStat('Primary Care Capacity Ratio', county.variables.primary_care_capacity, '', county.scores.sections.access_structural)}
        ${renderAccessStat('Travel Time to Nearest PCPCH', county.variables.travel_time_pcpch, ' min', county.scores.sections.access_geo, true)}
        ${renderAccessStat('Trauma Designation Scale (Highest)', county.variables.highest_trauma_level, ' Level', county.scores.sections.access_service)}
    `;

    // 3. Healthcare Need Sections (Accordions)
    renderNeedAccordion(county);
}

function renderNeedAccordion(county) {
    // Ordered Need Sections by Weight (Outcomes 35%, Socioeconomic 25%, Preventable Care Gaps 25%, Demographics 7.5%, Lifestyle 7.5%)
    // Weight mentions removed from headings as requested
    const sections = {
        'health_outcomes': {
            title: 'Health Outcomes & Disease Burden',
            icon: '&#x1F3E5;',
            keys: [
                'diabetes_pct', 'copd_pct', 'heart_disease_pct', 'stroke_pct', 'hypertension_pct', 'cancer_pct', 'asthma_pct', 'obesity_pct',
                'any_disability_pct', 'hearing_disability_pct', 'vision_disability_pct', 'mobility_disability_pct',
                'self_care_disability_pct', 'cognitive_disability_pct', 'independent_living_disability_pct',
                'poor_fair_health_pct', 'frequent_mental_distress_pct', 'depression_pct', 'frequent_physical_distress_pct',
                'arthritis_pct', 'all_teeth_lost_pct'
            ]
        },
        'socioeconomic': {
            title: 'Socioeconomic Vulnerability',
            icon: '&#x1F4B5;',
            keys: ['poverty_pct', 'no_vehicle_pct', 'broadband_pct', 'uninsured_pct']
        },
        'preventable_gaps': {
            title: 'Preventable Care Gaps & Outcomes',
            icon: '&#x1F6E1;',
            keys: ['colorectal_screening_pct', 'mammography_pct', 'cholesterol_screening_pct', 'routine_checkups_pct', 'dental_visits_pct', 'preventable_hospitalizations_rate', 'ed_dental_visits_rate', 'ed_mental_health_visits_rate', 'inadequate_prenatal_care_rate']
        },
        'demographics': {
            title: 'Demographic Risk Factors',
            icon: '&#x1F46A;',
            keys: ['pct_over_65', 'pct_poc']
        },
        'lifestyle': {
            title: 'Lifestyle & Behavioral Risk Factors',
            icon: '&#x1F6AC;',
            keys: ['smoking_pct', 'physical_inactivity_pct', 'short_sleep_pct', 'binge_drinking_pct']
        }
    };

    let html = '';
    for (const [secKey, sec] of Object.entries(sections)) {
        // Section average score
        const sectionScoreKey = `need_${secKey}`;
        const sectionScoreVal = county.scores.sections[sectionScoreKey];

        let tableRows = '';
        sec.keys.forEach(key => {
            const meta = variableMetadata[key];
            if (!meta) return;

            const countyVal = county.variables[key];
            const medianVal = statewideMedians[key];

            // Compare value to statewide median
            // For risk indicators (reverse=false): lower than median is good (better).
            // For positive indicators (reverse=true): higher than median is good (better).
            let isGood = false;
            if (meta.reverse) {
                isGood = countyVal > medianVal;
            } else {
                isGood = countyVal < medianVal;
            }

            const dotColor = isGood ? 'var(--color-good)' : 'var(--color-bad)';
            // Compact +/- badge in themed colors instead of text
            const comparisonBadge = isGood
                ? `<span class="status-badge status-good">+</span>`
                : `<span class="status-badge status-bad">-</span>`;

            tableRows += `
                <tr>
                    <td><span class="indicator-dot" style="background:${dotColor}"></span> ${meta.name}</td>
                    <td><strong>${countyVal}${meta.unit}</strong></td>
                    <td>${medianVal}${meta.unit}</td>
                    <td style="text-align:right">${comparisonBadge}</td>
                </tr>
            `;
        });

        html += `
            <div class="accordion-item" id="accordion-${secKey}">
                <div class="accordion-header" onclick="toggleAccordion('${secKey}')">
                    <span>${sec.icon} &nbsp; ${sec.title}</span>
                    <span style="display:flex; align-items:center; gap:12px;">
                        <span class="badge" style="font-size:0.75rem;">Average Section Percentile: ${sectionScoreVal}</span>
                        <span class="accordion-icon">&#9660;</span>
                    </span>
                </div>
                <div class="accordion-content">
                    <table class="metric-table">
                        <thead>
                            <tr>
                                <th>Methodology Variable</th>
                                <th>County Value</th>
                                <th>Statewide Median</th>
                                <th style="text-align:right">Comparison</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    document.getElementById('profile-need-accordion').innerHTML = html;

    // Automatically open Health Outcomes first since it is weight-ordered
    toggleAccordion('health_outcomes');
}

function toggleAccordion(key) {
    const item = document.getElementById(`accordion-${key}`);
    if (!item) return;

    const isOpen = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

    if (!isOpen) {
        item.classList.add('active');
    }
}

function initChart() {
    const ctx = document.getElementById('scatterChart').getContext('2d');

    // Filter and group datasets by county region
    const splitDataByRegion = (regionName) => {
        return countyData
            .filter(c => c.region === regionName)
            .map(c => ({
                x: c.scores.need,
                y: c.scores.access,
                r: Math.max(5, Math.sqrt(c.pop) / 10), // Bubble size proportional to population
                county: c.name,
                region: c.region,
                pop: c.pop
            }));
    };

    // Bubble layering order: Urban (bottom), Rural (middle), Remote (top)
    // Determined exactly by array dataset index order
    const urbanData = splitDataByRegion('Urban');
    const ruralData = splitDataByRegion('Rural');
    const remoteData = splitDataByRegion('Remote');

    if (scatterChartInstance) {
        scatterChartInstance.destroy();
    }

    scatterChartInstance = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Urban Counties (Density > 100/sq mi)',
                    data: urbanData,
                    order: 3,
                    backgroundColor: 'rgba(108, 140, 191, 0.7)',
                    borderColor: 'rgba(108, 140, 191, 1)',
                    borderWidth: 1.5,
                    hoverRadius: 8,
                    clip: false
                },
                {
                    label: 'Rural Counties (Density 10 - 100/sq mi)',
                    data: ruralData,
                    order: 2,
                    backgroundColor: 'rgba(90, 167, 167, 0.7)',
                    borderColor: 'rgba(90, 167, 167, 1)',
                    borderWidth: 1.5,
                    hoverRadius: 8,
                    clip: false
                },
                {
                    label: 'Remote Counties (Density < 10/sq mi)',
                    data: remoteData,
                    order: 1,
                    backgroundColor: 'rgba(231, 111, 81, 0.7)',
                    borderColor: 'rgba(231, 111, 81, 1)',
                    borderWidth: 1.5,
                    hoverRadius: 8,
                    clip: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        color: '#475569'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const raw = context.raw;
                            return ` ${raw.county} County (Need: ${raw.x}, Access: ${raw.y}, Pop: ${raw.pop.toLocaleString()})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Healthcare Need Score (Percentile Rank)',
                        color: '#475569',
                        font: {
                            family: 'Outfit',
                            weight: '600'
                        }
                    },
                    min: 0,
                    max: 100,
                    reverse: true,
                    grid: {
                        color: 'rgba(90, 167, 167, 0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Healthcare Access Score',
                        color: '#475569',
                        font: {
                            family: 'Outfit',
                            weight: '600'
                        }
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        color: 'rgba(90, 167, 167, 0.1)'
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const firstElement = elements[0];
                    const datasetIndex = firstElement.datasetIndex;
                    const index = firstElement.index;
                    const dataPoint = scatterChartInstance.data.datasets[datasetIndex].data[index];
                    selectCounty(dataPoint.county, true);
                }
            }
        }
    });
}

// ── Indicator Explorer view logic ────────────────────────────────────
function initExplorer() {
    const sectionSelect = document.getElementById('explorer-section-select');
    const variableSelect = document.getElementById('explorer-variable-select');

    explorerMap = L.map('explorer-map').setView([44.0, -120.5], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }).addTo(explorerMap);

    sectionSelect.addEventListener('change', (e) => {
        populateExplorerVariables(e.target.value);
    });

    variableSelect.addEventListener('change', () => {
        renderExplorerMapLayer();
    });

    populateExplorerVariables('access');
}

function populateExplorerVariables(sectionKey) {
    const select = document.getElementById('explorer-variable-select');
    select.innerHTML = '';

    // Filter variables belonging to selected section
    const matchingVars = Object.entries(variableMetadata).filter(([key, meta]) => meta.section === sectionKey);

    matchingVars.forEach(([key, meta]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = meta.name;
        select.appendChild(option);
    });

    renderExplorerMapLayer();
}

function renderExplorerMapLayer() {
    const varKey = document.getElementById('explorer-variable-select').value;
    const meta = variableMetadata[varKey];
    if (!meta) return;

    // Compute summary stats dynamically
    let values = [];
    let minVal = Infinity, maxVal = -Infinity;
    let minCounty = '', maxCounty = '';

    countyData.forEach(c => {
        let val;
        if (varKey === 'access') {
            val = c.scores.access;
        } else if (varKey.startsWith('need_')) {
            // Allows mapping and analyzing the summary score of any section (e.g. Socioeconomic summary)
            val = c.scores.sections[varKey];
        } else {
            val = c.variables[varKey];
        }

        values.push(val);

        if (val < minVal) {
            minVal = val;
            minCounty = c.name;
        }
        if (val > maxVal) {
            maxVal = val;
            maxCounty = c.name;
        }
    });

    const sum = values.reduce((s, v) => s + v, 0);
    const avg = (sum / values.length).toFixed(2);

    const sortedVals = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sortedVals.length / 2);
    const median = sortedVals.length % 2 !== 0 ? sortedVals[mid] : ((sortedVals[mid - 1] + sortedVals[mid]) / 2).toFixed(2);

    document.getElementById('exp-stat-avg').textContent = `${avg}${meta.unit}`;
    document.getElementById('exp-stat-median').textContent = `${median}${meta.unit}`;
    document.getElementById('exp-stat-min').innerHTML = `${minVal}${meta.unit} <span style="font-size:0.75rem; font-weight:normal; display:block;">(${minCounty} County)</span>`;
    document.getElementById('exp-stat-max').innerHTML = `${maxVal}${meta.unit} <span style="font-size:0.75rem; font-weight:normal; display:block;">(${maxCounty} County)</span>`;

    document.getElementById('explorer-map-title').textContent = `Oregon Spatial Distribution: ${meta.name}`;

    // Color Scale based on variable polarity
    const isAccessVar = meta.section === 'access' || meta.reverse;
    const getColorScale = (val) => {
        let pct = (val - minVal) / (maxVal - minVal);
        if (isNaN(pct)) pct = 0.5;

        if (isAccessVar) {
            // Green scale for positive outcomes (higher = better)
            return pct > 0.8 ? '#005a32' :
                pct > 0.6 ? '#238b45' :
                    pct > 0.4 ? '#41ab5d' :
                        pct > 0.2 ? '#74c476' :
                            '#c7e9c0';
        } else {
            // Orange/Red scale for risk/disease/vulnerability outcomes (higher = worse/higher need)
            return pct > 0.8 ? '#800026' :
                pct > 0.6 ? '#BD0026' :
                    pct > 0.4 ? '#E31A1C' :
                        pct > 0.2 ? '#FC4E2A' :
                            '#FEB24C';
        }
    };

    if (explorerGeojsonLayer) {
        explorerMap.removeLayer(explorerGeojsonLayer);
    }

    if (typeof countyGeoJSON !== 'undefined') {
        explorerGeojsonLayer = L.geoJSON(countyGeoJSON, {
            style: function (feature) {
                const name = feature.properties.NAME;
                const county = countyData.find(c => c.name === name);
                const isSelected = name === currentSelectedCounty;

                let val;
                if (county) {
                    if (varKey === 'access') {
                        val = county.scores.access;
                    } else if (varKey.startsWith('need_')) {
                        val = county.scores.sections[varKey];
                    } else {
                        val = county.variables[varKey];
                    }
                }

                return {
                    fillColor: county ? getColorScale(val) : '#cccccc',
                    color: isSelected ? '#1e293b' : '#ffffff',
                    weight: isSelected ? 3.5 : 1.5,
                    opacity: 1,
                    fillOpacity: 0.8
                };
            },
            onEachFeature: function (feature, layer) {
                const name = feature.properties.NAME;
                const county = countyData.find(c => c.name === name);
                if (!county) return;

                let val;
                if (varKey === 'access') {
                    val = county.scores.access;
                } else if (varKey.startsWith('need_')) {
                    val = county.scores.sections[varKey];
                } else {
                    val = county.variables[varKey];
                }

                const medVal = varKey.startsWith('need_') || varKey === 'access' ? '50.0' : statewideMedians[varKey];

                layer.bindTooltip(`<b>${county.name} County</b><br>${meta.name}: <strong>${val}${meta.unit}</strong><br>Statewide Median: ${medVal}${meta.unit}<br><br><em>Click to select</em>`);
                layer.on('click', () => {
                    selectCounty(county.name, false);
                });
            }
        }).addTo(explorerMap);

        // Highlight active county in explorer map
        if (currentSelectedCounty && currentSelectedCounty !== 'statewide') {
            highlightCountyInLayer(explorerGeojsonLayer, currentSelectedCounty);
        }
    }

    // Draw explorer legend dynamically
    const legendContainer = document.getElementById('explorer-legend');
    legendContainer.innerHTML = '';

    let legendHtml = `<h4>${meta.name} (${meta.unit || 'Score'})</h4>`;

    const step = (maxVal - minVal) / 5;
    for (let i = 0; i < 5; i++) {
        const lower = minVal + i * step;
        const colorVal = lower + step / 2;
        const colorStr = getColorScale(colorVal);

        legendHtml += `
            <div class="legend-item">
                <div class="legend-color" style="background:${colorStr}"></div>
                <span>${lower.toFixed(1)}${meta.unit}</span>
            </div>
        `;
    }
    legendContainer.innerHTML = legendHtml;
}
