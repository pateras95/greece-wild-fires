<template>
  <div>
    <h3 class="text-h6 mb-4">Latest reports in your area</h3>

    <v-text-field
      v-model="search"
      label="Search incidents..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      class="mb-4"
      clearable
    ></v-text-field>

    <div v-if="filteredIncidents.length === 0" class="text-center text-medium-emphasis py-8">
      <v-icon size="48" class="mb-2">mdi-fire-off</v-icon>
      <div>No incidents found</div>
    </div>

    <v-list>
      <v-list-item
        v-for="incident in filteredIncidents"
        :key="incident.id"
        @click="$emit('incident-select', incident)"
        class="incident-item"
      >
        <template v-slot:prepend>
          <v-avatar :color="getStatusColor(incident.status)" size="40">
            <v-icon color="white">{{ getStatusIcon(incident.status) }}</v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="text-subtitle-2">
          Incident #{{}}
        </v-list-item-title>

        <v-list-item-subtitle>
          <div class="mb-1">
            <v-chip
              size="x-small"
              :color="getStatusColor(incident.status)"
              class="mr-2"
            >
              {{ incident.status.replace('_', ' ') }}
            </v-chip>
            <v-chip
              size="x-small"
              color="orange"
              variant="tonal"
            >
              {{ incident.report.what }}
            </v-chip>
          </div>
          <div class="text-caption">
            {{ incident.region }} • {{ getTimeAgo(incident.createdAt) }}
          </div>
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-chip
            :color="getPriorityColor(incident.priority)"
            size="small"
            variant="tonal"
          >
            {{ incident.priority }}
          </v-chip>
        </template>
      </v-list-item>

      <v-divider v-if="filteredIncidents.length > 0 && filteredIncidents.indexOf(incident) < filteredIncidents.length - 1"></v-divider>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'IncidentList',
  props: {
    incidents: {
      type: Array,
      default: () => []
    }
  },
  emits: ['incident-select'],
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredIncidents() {
      if (!this.search) return this.incidents

      const searchLower = this.search.toLowerCase()
      return this.incidents.filter(incident =>
        incident.id.toLowerCase().includes(searchLower) ||
        incident.region.toLowerCase().includes(searchLower) ||
        incident.status.toLowerCase().includes(searchLower) ||
        incident.priority.toLowerCase().includes(searchLower) ||
        incident.report.what.toLowerCase().includes(searchLower) ||
        (incident.report.notes && incident.report.notes.toLowerCase().includes(searchLower))
      )
    }
  },
  methods: {
    getStatusColor(status) {
      const colors = {
        'OPEN': 'orange',
        'CONFIRMED': 'red',
        'CONTAINED': 'green',
        'FALSE_ALARM': 'grey'
      }
      return colors[status] || 'orange'
    },

    getStatusIcon(status) {
      const icons = {
        'OPEN': 'mdi-alert-circle',
        'CONFIRMED': 'mdi-fire',
        'CONTAINED': 'mdi-check-circle',
        'FALSE_ALARM': 'mdi-close-circle'
      }
      return icons[status] || 'mdi-alert-circle'
    },

    getPriorityColor(priority) {
      const colors = {
        'LOW': 'green',
        'MEDIUM': 'orange',
        'HIGH': 'red',
        'CRITICAL': 'red'
      }
      return colors[priority] || 'orange'
    },

    getTimeAgo(dateString) {
      const now = new Date()
      const date = new Date(dateString)
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))

      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }
}
</script>

<style scoped>
.incident-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.incident-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
