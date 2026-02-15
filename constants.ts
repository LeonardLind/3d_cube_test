import { MenuItem } from './types';

// The Neon Green color used throughout the app
export const NEON_GREEN = '#39FF14';

// Vertex positions for a 1x1x1 cube (centered at 0, radius approx 1)
// We map these to the 6 menu items.
// A cube has 8 vertices, we select 6 interesting ones for the menu.
export const MENU_ITEMS: MenuItem[] = [
  { 
    id: 1, 
    label: '1. Extent', 
    description: 'GEOSPATIAL ANALYSIS: Total sector coverage confirmed at 98.4%. Boundary fluctuation detected in quadrant 4. Grid integrity remains nominal.',
    vertexPosition: [1, 1, 1] 
  }, // Center Front
  { 
    id: 2, 
    label: '2. Condition', 
    description: 'SYSTEM DIAGNOSTICS: Environmental stability at optimal levels. Atmospheric scrubbers operating at 94% efficiency. Surface mineral density: High.',
    vertexPosition: [-1, -1, -1] 
  }, // Top Left
  { 
    id: 3, 
    label: '3. State of Species', 
    description: 'BIO-INDEX MONITORING: Tracking 4,200+ active genetic markers. Population dynamics show sustainable growth trajectories. Biodiversity stable.',
    vertexPosition: [1, -1, 1] 
  }, // Bottom Right
  { 
    id: 4, 
    label: '4. State of Communities', 
    description: 'SOCIETAL METRICS: Inter-district connectivity efficiency at 99%. Resource distribution algorithms optimized. Social cohesion index: Positive.',
    vertexPosition: [-1, -1, 1] 
  }, // Bottom Left
  { 
    id: 5, 
    label: '5. Pollution', 
    description: 'CONTAMINANT ALERT: Particulate matter levels slightly elevated in Sector 7. Purging protocols initiated. Air quality index: Moderate.',
    vertexPosition: [1, 1, -1] 
  }, // Top Right
  { 
    id: 6, 
    label: '6. Water Resources', 
    description: 'HYDROLOGICAL STATUS: Aquifer reserves at 78% capacity. Filtration systems active. H2O purity levels within potable standards (Grade A).',
    vertexPosition: [-1, 1, -1] 
  }, // Top Back
];