<template>
  <div class="sidebar-content">
    <v-tabs
      v-model="activeTab"
      color="primary"
      align-tabs="center"
      class="tabs-container"
    >
      <v-tab value="incidents">
        <v-icon class="mr-1">mdi-fire-alert</v-icon>
        Incidents
      </v-tab>
      <v-tab value="risk">
        <v-icon class="mr-1">mdi-thermometer</v-icon>
        Risk Index
      </v-tab>
      <v-tab value="alerts">
        <v-icon class="mr-1">mdi-bell-alert</v-icon>
        Alerts
      </v-tab>
      <v-tab value="safety">
        <v-icon class="mr-1">mdi-shield-check</v-icon>
        Safety
      </v-tab>
    </v-tabs>

    <v-card-text class="tab-content">
      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="incidents">
          <IncidentList
            :incidents="incidents"
            @incident-select="$emit('incident-select', $event)"
          />
        </v-tabs-window-item>
        
        <v-tabs-window-item value="risk">
          <RiskIndexCard :risk-data="riskData" />
        </v-tabs-window-item>
        
        <v-tabs-window-item value="alerts">
          <AlertsCard :alerts="alerts" />
        </v-tabs-window-item>
        
        <v-tabs-window-item value="safety">
          <SafetyTips />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </div>
</template>

<script>
import IncidentList from './tabs/IncidentList.vue'
import RiskIndexCard from './tabs/RiskIndexCard.vue'
import AlertsCard from './tabs/AlertsCard.vue'
import SafetyTips from './tabs/SafetyTips.vue'

export default {
  name: 'RightSidebar',
  components: {
    IncidentList,
    RiskIndexCard,
    AlertsCard,
    SafetyTips
  },
  props: {
    incidents: Array,
    riskData: Object,
    alerts: Array
  },
  emits: ['incident-select'],
  data() {
    return {
      activeTab: 'incidents'
    }
  }
}
</script>

<style scoped>
.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs-container {
  flex-shrink: 0;
  border-bottom: 1px solid #e2e8f0;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

@media (max-width: 1279px) {
  .sidebar-content {
    max-height: 400px;
  }
}
</style>