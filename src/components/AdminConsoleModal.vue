<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Admin Console</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-close" @click="$emit('update:modelValue', false)"></v-btn>
      </v-toolbar>

      <v-container fluid class="pa-6">
        <!-- Filters -->
        <v-row class="mb-4">
          <v-col cols="12" md="3">
            <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Filter by Status"
              variant="outlined"
              density="compact"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="priorityFilter"
              :items="priorityOptions"
              label="Filter by Priority"
              variant="outlined"
              density="compact"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="regionFilter"
              :items="regionOptions"
              label="Filter by Region"
              variant="outlined"
              density="compact"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              color="primary"
              variant="elevated"
              block
              @click="showBroadcastDialog = true"
            >
              <v-icon class="mr-2">mdi-bullhorn</v-icon>
              Broadcast Alert
            </v-btn>
          </v-col>
        </v-row>

        <!-- Incidents Table -->
        <v-data-table
          :headers="headers"
          :items="filteredIncidents"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item.id="{ item }">
            #{{ item.id.slice(-6) }}
          </template>
          
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
            >
              {{ item.status.replace('_', ' ') }}
            </v-chip>
          </template>
          
          <template v-slot:item.priority="{ item }">
            <v-chip
              :color="getPriorityColor(item.priority)"
              size="small"
              variant="tonal"
            >
              {{ item.priority }}
            </v-chip>
          </template>
          
          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>
          
          <template v-slot:item.report.what="{ item }">
            <v-chip size="small" variant="tonal" color="orange">
              {{ item.report.what }}
            </v-chip>
          </template>
          
          <template v-slot:item.actions="{ item }">
            <v-btn-group density="compact" variant="outlined">
              <v-btn
                size="small"
                color="success"
                @click="updateIncident(item.id, { status: 'CONFIRMED' })"
                :disabled="item.status === 'CONFIRMED'"
              >
                Confirm
              </v-btn>
              <v-btn
                size="small"
                color="success"
                @click="updateIncident(item.id, { status: 'CONTAINED' })"
                :disabled="item.status === 'CONTAINED'"
              >
                Contained
              </v-btn>
              <v-btn
                size="small"
                color="error"
                @click="updateIncident(item.id, { status: 'FALSE_ALARM' })"
                :disabled="item.status === 'FALSE_ALARM'"
              >
                False Alarm
              </v-btn>
            </v-btn-group>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

    <!-- Broadcast Alert Dialog -->
    <v-dialog v-model="showBroadcastDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <v-icon class="mr-2">mdi-bullhorn</v-icon>
          Broadcast Alert
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form v-model="broadcastFormValid">
            <v-select
              v-model="broadcastAlert.region"
              :items="regionOptions"
              label="Region"
              variant="outlined"
              :rules="[v => !!v || 'Region is required']"
              class="mb-4"
            ></v-select>
            
            <v-select
              v-model="broadcastAlert.severity"
              :items="severityOptions"
              label="Severity"
              variant="outlined"
              :rules="[v => !!v || 'Severity is required']"
              class="mb-4"
            ></v-select>
            
            <v-textarea
              v-model="broadcastAlert.message"
              label="Alert Message"
              variant="outlined"
              rows="3"
              :rules="[v => !!v || 'Message is required']"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showBroadcastDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            :disabled="!broadcastFormValid"
            @click="broadcastAlertAction"
          >
            Broadcast
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  name: 'AdminConsoleModal',
  props: {
    modelValue: Boolean,
    incidents: Array
  },
  emits: ['update:modelValue', 'update-incident', 'broadcast-alert'],
  data() {
    return {
      statusFilter: null,
      priorityFilter: null,
      regionFilter: null,
      showBroadcastDialog: false,
      broadcastFormValid: false,
      broadcastAlert: {
        region: null,
        severity: null,
        message: ''
      },
      headers: [
        { title: 'ID', key: 'id', width: '100px' },
        { title: 'Status', key: 'status', width: '120px' },
        { title: 'Priority', key: 'priority', width: '100px' },
        { title: 'Region', key: 'region', width: '150px' },
        { title: 'Type', key: 'report.what', width: '100px' },
        { title: 'Created', key: 'createdAt', width: '150px' },
        { title: 'Actions', key: 'actions', sortable: false, width: '300px' }
      ],
      statusOptions: [
        { title: 'Open', value: 'OPEN' },
        { title: 'Confirmed', value: 'CONFIRMED' },
        { title: 'Contained', value: 'CONTAINED' },
        { title: 'False Alarm', value: 'FALSE_ALARM' }
      ],
      priorityOptions: [
        { title: 'Low', value: 'LOW' },
        { title: 'Medium', value: 'MEDIUM' },
        { title: 'High', value: 'HIGH' },
        { title: 'Critical', value: 'CRITICAL' }
      ],
      regionOptions: [
        { title: 'Attica', value: 'Attica' },
        { title: 'Central Macedonia', value: 'Central Macedonia' },
        { title: 'Thessaly', value: 'Thessaly' },
        { title: 'Crete', value: 'Crete' },
        { title: 'Western Greece', value: 'Western Greece' }
      ],
      severityOptions: [
        { title: 'Info', value: 'INFO' },
        { title: 'Watch', value: 'WATCH' },
        { title: 'Warning', value: 'WARNING' },
        { title: 'Evacuate', value: 'EVACUATE' }
      ]
    }
  },
  computed: {
    filteredIncidents() {
      let filtered = [...this.incidents]
      
      if (this.statusFilter) {
        filtered = filtered.filter(incident => incident.status === this.statusFilter)
      }
      
      if (this.priorityFilter) {
        filtered = filtered.filter(incident => incident.priority === this.priorityFilter)
      }
      
      if (this.regionFilter) {
        filtered = filtered.filter(incident => incident.region === this.regionFilter)
      }
      
      return filtered
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
    
    getPriorityColor(priority) {
      const colors = {
        'LOW': 'green',
        'MEDIUM': 'orange',
        'HIGH': 'red',
        'CRITICAL': 'red'
      }
      return colors[priority] || 'orange'
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    updateIncident(incidentId, updates) {
      this.$emit('update-incident', incidentId, updates)
    },
    
    broadcastAlertAction() {
      const alertData = {
        ...this.broadcastAlert,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
      
      this.$emit('broadcast-alert', alertData)
      this.showBroadcastDialog = false
      this.resetBroadcastForm()
    },
    
    resetBroadcastForm() {
      this.broadcastAlert = {
        region: null,
        severity: null,
        message: ''
      }
      this.broadcastFormValid = false
    }
  }
}
</script>