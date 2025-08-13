// Mock data for the Wildfire Watch application
export const mockIncidents = [
  {
    id: "01J8YWCQJ8H2J8S2J9T7Q6N2G6",
    createdAt: "2025-01-16T10:00:00Z",
    status: "OPEN",
    priority: "HIGH",
    location: { lat: 38.052, lng: 23.858, accuracy: 25 },
    source: "CITIZEN",
    report: { 
      what: "SMOKE", 
      size: "MEDIUM", 
      wind: true, 
      notes: "Dense smoke near pine trees, seems to be spreading", 
      photos: [] 
    },
    updates: [],
    confidence: "MEDIUM",
    region: "Attica"
  },
  {
    id: "01J8YWCTG5V7F5X4Z3C2B1A9K0",
    createdAt: "2025-01-16T09:30:00Z",
    status: "CONFIRMED",
    priority: "CRITICAL",
    location: { lat: 40.641, lng: 22.944, accuracy: 15 },
    source: "MODERATOR",
    report: { 
      what: "BOTH", 
      size: "LARGE", 
      wind: true, 
      notes: "Visible flames east of ring road, multiple houses at risk", 
      photos: [] 
    },
    updates: [
      { at: "2025-01-16T09:45:00Z", by: "Fire Chief", text: "Fire brigade en route, ETA 15 minutes" },
      { at: "2025-01-16T10:00:00Z", by: "Admin", text: "Evacuation order issued for surrounding area" }
    ],
    confidence: "HIGH",
    region: "Central Macedonia"
  },
  {
    id: "01J8YWCVH3K9M2P8R7T4Q1N5L8",
    createdAt: "2025-01-16T08:15:00Z",
    status: "CONTAINED",
    priority: "MEDIUM",
    location: { lat: 37.975, lng: 23.734, accuracy: 30 },
    source: "CITIZEN",
    report: { 
      what: "FLAMES", 
      size: "SMALL", 
      wind: false, 
      notes: "Small grass fire near parking lot", 
      photos: [] 
    },
    updates: [
      { at: "2025-01-16T08:30:00Z", by: "Local Brigade", text: "Fire contained, monitoring for flare-ups" },
      { at: "2025-01-16T09:00:00Z", by: "Admin", text: "All clear, incident resolved" }
    ],
    confidence: "HIGH",
    region: "Attica"
  },
  {
    id: "01J8YWCXB2F6D8N3M7K4J9H1G5",
    createdAt: "2025-01-16T07:45:00Z",
    status: "FALSE_ALARM",
    priority: "LOW",
    location: { lat: 39.365, lng: 22.947, accuracy: 20 },
    source: "CITIZEN",
    report: { 
      what: "SMOKE", 
      size: "SMALL", 
      wind: false, 
      notes: "Thought it was smoke but turned out to be dust cloud", 
      photos: [] 
    },
    updates: [
      { at: "2025-01-16T08:00:00Z", by: "Volunteer", text: "Investigated - confirmed as dust from construction work" }
    ],
    confidence: "LOW",
    region: "Thessaly"
  },
  {
    id: "01J8YWCZD4A9C7E6B2F8X5Y3Z1",
    createdAt: "2025-01-16T11:20:00Z",
    status: "OPEN",
    priority: "HIGH",
    location: { lat: 35.341, lng: 25.137, accuracy: 18 },
    source: "CITIZEN",
    report: { 
      what: "BOTH", 
      size: "MEDIUM", 
      wind: true, 
      notes: "Fire spreading rapidly due to strong winds, threatens olive groves", 
      photos: [] 
    },
    updates: [],
    confidence: "HIGH",
    region: "Crete"
  },
  {
    id: "01J8YWD1F7G8H4I2J6K3L9M5N8",
    createdAt: "2025-01-16T06:30:00Z",
    status: "CONTAINED",
    priority: "MEDIUM",
    location: { lat: 38.246, lng: 21.735, accuracy: 35 },
    source: "CITIZEN",
    report: { 
      what: "SMOKE", 
      size: "LARGE", 
      wind: false, 
      notes: "Large smoke column visible from highway", 
      photos: [] 
    },
    updates: [
      { at: "2025-01-16T07:00:00Z", by: "Fire Service", text: "Fire crews deployed from 3 stations" },
      { at: "2025-01-16T08:30:00Z", by: "Incident Commander", text: "Fire 90% contained, mop-up operations underway" }
    ],
    confidence: "HIGH",
    region: "Western Greece"
  }
]

export const mockAlerts = [
  {
    id: "A001",
    region: "Attica",
    message: "Strong winds expected after 14:00. Avoid all outdoor burning and dispose of cigarettes safely.",
    severity: "WATCH",
    createdAt: "2025-01-16T07:00:00Z"
  },
  {
    id: "A002", 
    region: "Central Macedonia",
    message: "Red alert: Evacuation recommended for residents in Panorama and surrounding areas due to rapidly spreading wildfire.",
    severity: "EVACUATE",
    createdAt: "2025-01-16T09:45:00Z"
  },
  {
    id: "A003",
    region: "Crete",
    message: "Fire weather warning: Extremely high temperatures and low humidity create dangerous fire conditions.",
    severity: "WARNING", 
    createdAt: "2025-01-16T06:15:00Z"
  }
]

export const mockRiskData = {
  region: "Attica",
  date: "2025-01-16",
  level: "HIGH",
  tempC: 37,
  humidity: 22,
  windKph: 35,
  source: "National Weather Service"
}