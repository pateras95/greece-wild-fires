// Mock API service for the Wildfire Watch application
import { mockIncidents, mockAlerts, mockRiskData } from '../data/mockData.js'

// Generate unique IDs
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Simulate network delay
function delay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const apiService = {
  // Incidents API
  async getIncidents(params = {}) {
    await delay()
    
    let filtered = [...mockIncidents]
    
    // Apply bbox filter if provided
    if (params.bbox) {
      const [minLon, minLat, maxLon, maxLat] = params.bbox.split(',').map(Number)
      filtered = filtered.filter(incident => 
        incident.location.lng >= minLon &&
        incident.location.lng <= maxLon &&
        incident.location.lat >= minLat &&
        incident.location.lat <= maxLat
      )
    }
    
    // Apply status filter if provided
    if (params.status) {
      const statuses = params.status.split('|')
      filtered = filtered.filter(incident => statuses.includes(incident.status))
    }
    
    return filtered
  },

  async createIncident(reportData) {
    await delay()
    
    const newIncident = {
      id: generateId().toUpperCase(),
      createdAt: new Date().toISOString(),
      status: "OPEN",
      priority: "MEDIUM",
      location: reportData.location,
      source: reportData.source || "CITIZEN",
      report: reportData.report,
      updates: [],
      confidence: "MEDIUM",
      region: "Attica" // In a real app, this would be determined by location
    }
    
    // Add to mock data
    mockIncidents.unshift(newIncident)
    
    return newIncident
  },

  async updateIncident(incidentId, updates) {
    await delay()
    
    const incidentIndex = mockIncidents.findIndex(i => i.id === incidentId)
    if (incidentIndex === -1) {
      throw new Error('Incident not found')
    }
    
    const incident = mockIncidents[incidentIndex]
    
    // Apply updates
    if (updates.status) {
      incident.status = updates.status
    }
    
    if (updates.priority) {
      incident.priority = updates.priority
    }
    
    if (updates.confidence) {
      incident.confidence = updates.confidence
    }
    
    if (updates.addUpdate) {
      incident.updates.push({
        at: new Date().toISOString(),
        by: updates.addUpdate.by || 'admin',
        text: updates.addUpdate.text
      })
    }
    
    mockIncidents[incidentIndex] = incident
    return incident
  },

  // Risk Index API
  async getRiskIndex(region = 'Attica') {
    await delay()
    
    if (region === mockRiskData.region) {
      return mockRiskData
    }
    
    // Return mock data for other regions
    return {
      region,
      date: new Date().toISOString().split('T')[0],
      level: 'MODERATE',
      tempC: 28,
      humidity: 45,
      windKph: 15,
      source: 'mock'
    }
  },

  // Alerts API
  async getAlerts() {
    await delay()
    return [...mockAlerts]
  },

  async createAlert(alertData) {
    await delay()
    
    const newAlert = {
      id: generateId(),
      ...alertData,
      createdAt: new Date().toISOString()
    }
    
    mockAlerts.unshift(newAlert)
    return newAlert
  },

  // Subscriptions API
  async subscribe(subscriptionData) {
    await delay()
    
    // In a real app, this would save to database
    console.log('Subscription created:', subscriptionData)
    
    return { success: true, id: generateId() }
  }
}