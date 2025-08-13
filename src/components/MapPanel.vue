<template>
  <div class="map-container">
    <div id="map" ref="mapContainer" style="height: 100%; width: 100%;"></div>
    
    <!-- Map Controls -->
    <div class="map-controls">
      <v-btn
        icon="mdi-crosshairs-gps"
        color="primary"
        class="mb-2"
        @click="centerOnUser"
      ></v-btn>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

// Fix for default markers in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export default {
  name: 'MapPanel',
  props: {
    incidents: {
      type: Array,
      default: () => []
    }
  },
  emits: ['incident-click', 'add-incident'],
  data() {
    return {
      map: null,
      markersLayer: null
    }
  },
  mounted() {
    this.initMap()
  },
  watch: {
    incidents: {
      handler() {
        this.updateMarkers()
      },
      deep: true
    }
  },
  methods: {
    initMap() {
      // Initialize map centered on Athens
      this.map = L.map(this.$refs.mapContainer).setView([37.9838, 23.7275], 6)
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map)
      
      // Initialize markers layer
      this.markersLayer = L.layerGroup().addTo(this.map)
      
      // Add initial markers
      this.updateMarkers()
    },
    
    updateMarkers() {
      if (!this.markersLayer) return
      
      // Clear existing markers
      this.markersLayer.clearLayers()
      
      // Add incident markers
      this.incidents.forEach(incident => {
        const color = this.getStatusColor(incident.status)
        const marker = L.circleMarker([incident.location.lat, incident.location.lng], {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: 0.8,
          weight: 2,
          radius: 8
        })
        
        marker.bindPopup(this.createPopupContent(incident))
        marker.on('click', () => {
          this.$emit('incident-click', incident)
        })
        
        this.markersLayer.addLayer(marker)
      })
    },
    
    getStatusColor(status) {
      const colors = {
        'OPEN': '#f59e0b',      // amber
        'CONFIRMED': '#ef4444',  // red
        'CONTAINED': '#10b981',  // green
        'FALSE_ALARM': '#6b7280' // gray
      }
      return colors[status] || colors['OPEN']
    },
    
    createPopupContent(incident) {
      const timeAgo = this.getTimeAgo(incident.createdAt)
      return `
        <div>
          <h3 style="margin: 0 0 8px 0; color: #1f2937;">Incident #${incident.id.slice(-6)}</h3>
          <p style="margin: 4px 0;"><strong>Status:</strong> ${incident.status}</p>
          <p style="margin: 4px 0;"><strong>Priority:</strong> ${incident.priority}</p>
          <p style="margin: 4px 0;"><strong>Reported:</strong> ${timeAgo}</p>
          <p style="margin: 4px 0;"><strong>Type:</strong> ${incident.report.what}</p>
          ${incident.report.notes ? `<p style="margin: 4px 0;"><strong>Notes:</strong> ${incident.report.notes}</p>` : ''}
        </div>
      `
    },
    
    getTimeAgo(dateString) {
      const now = new Date()
      const date = new Date(dateString)
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    },
    
    centerOnUser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            this.map.setView([latitude, longitude], 12)
          },
          (error) => {
            console.error('Geolocation error:', error)
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.map-container {
  position: relative;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

#map {
  border-radius: 0;
}
</style>