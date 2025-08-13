<template>
  <v-app>
    <AppHeader 
      @report-fire="openReportModal"
      @toggle-admin="toggleAdminConsole"
    />
    
    <v-main>
      <v-container fluid class="pa-0" style="height: calc(100vh - 64px);">
        <v-row no-gutters style="height: 100%;">
          <!-- Map Panel -->
          <v-col cols="12" lg="8" class="map-container">
            <MapPanel 
              :incidents="incidents"
              @incident-click="openIncidentDrawer"
              @add-incident="addIncidentFromMap"
            />
          </v-col>
          
          <!-- Right Sidebar -->
          <v-col cols="12" lg="4" class="sidebar-container">
            <RightSidebar
              :incidents="incidents"
              :risk-data="riskData"
              :alerts="alerts"
              @incident-select="openIncidentDrawer"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Modals and Drawers -->
    <ReportFireModal
      v-model="showReportModal"
      @submit="submitReport"
    />
    
    <IncidentDrawer
      v-model="showIncidentDrawer"
      :incident="selectedIncident"
      @update-incident="updateIncident"
    />
    
    <AdminConsoleModal
      v-model="showAdminConsole"
      :incidents="incidents"
      @update-incident="updateIncident"
      @broadcast-alert="broadcastAlert"
    />

    <!-- Toast Notifications -->
    <v-snackbar
      v-model="showToast"
      :color="toastColor"
      :timeout="4000"
      location="top"
    >
      {{ toastMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showToast = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import MapPanel from './components/MapPanel.vue'
import RightSidebar from './components/RightSidebar.vue'
import ReportFireModal from './components/ReportFireModal.vue'
import IncidentDrawer from './components/IncidentDrawer.vue'
import AdminConsoleModal from './components/AdminConsoleModal.vue'
import AppFooter from './components/AppFooter.vue'
import { mockIncidents, mockAlerts, mockRiskData } from './data/mockData.js'
import { apiService } from './services/apiService.js'

export default {
  name: 'App',
  components: {
    AppHeader,
    MapPanel,
    RightSidebar,
    ReportFireModal,
    IncidentDrawer,
    AdminConsoleModal,
    AppFooter
  },
  data() {
    return {
      incidents: mockIncidents,
      alerts: mockAlerts,
      riskData: mockRiskData,
      showReportModal: false,
      showIncidentDrawer: false,
      showAdminConsole: false,
      selectedIncident: null,
      showToast: false,
      toastMessage: '',
      toastColor: 'success'
    }
  },
  methods: {
    openReportModal() {
      this.showReportModal = true
    },
    
    toggleAdminConsole() {
      this.showAdminConsole = !this.showAdminConsole
    },
    
    openIncidentDrawer(incident) {
      this.selectedIncident = incident
      this.showIncidentDrawer = true
    },
    
    async submitReport(reportData) {
      try {
        const response = await apiService.createIncident(reportData)
        this.incidents.unshift(response)
        this.showToast = true
        this.toastMessage = `Thank you. Incident #${response.id.slice(-6)} received.`
        this.toastColor = 'success'
        this.showReportModal = false
      } catch (error) {
        this.showToast = true
        this.toastMessage = 'Failed to submit report. Please try again.'
        this.toastColor = 'error'
      }
    },
    
    async updateIncident(incidentId, updates) {
      try {
        const updatedIncident = await apiService.updateIncident(incidentId, updates)
        const index = this.incidents.findIndex(i => i.id === incidentId)
        if (index !== -1) {
          this.incidents[index] = updatedIncident
        }
        this.showToast = true
        this.toastMessage = 'Incident updated successfully'
        this.toastColor = 'success'
      } catch (error) {
        this.showToast = true
        this.toastMessage = 'Failed to update incident'
        this.toastColor = 'error'
      }
    },
    
    async broadcastAlert(alertData) {
      try {
        await apiService.createAlert(alertData)
        this.alerts.unshift(alertData)
        this.showToast = true
        this.toastMessage = 'Alert broadcasted successfully'
        this.toastColor = 'info'
      } catch (error) {
        this.showToast = true
        this.toastMessage = 'Failed to broadcast alert'
        this.toastColor = 'error'
      }
    },
    
    addIncidentFromMap(incident) {
      this.incidents.unshift(incident)
    }
  }
}
</script>

<style>
.map-container {
  position: relative;
}

.sidebar-container {
  background-color: #f8fafc;
  border-left: 1px solid #e2e8f0;
}

@media (max-width: 1279px) {
  .sidebar-container {
    border-left: none;
    border-top: 1px solid #e2e8f0;
  }
}
</style>