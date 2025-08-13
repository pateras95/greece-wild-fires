<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    temporary
    location="right"
    width="400"
  >
    <div v-if="incident" class="incident-drawer">
      <!-- Header -->
      <v-card-title class="bg-primary text-white d-flex align-center">
        <v-icon class="mr-2">mdi-fire-alert</v-icon>
        Incident #{{ incident.id.slice(-6) }}
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="$emit('update:modelValue', false)"
        ></v-btn>
      </v-card-title>

      <v-card-text class="pa-4">
        <!-- Status Badge -->
        <v-chip
          :color="getStatusColor(incident.status)"
          class="mb-4"
          size="large"
        >
          <v-icon class="mr-1">{{ getStatusIcon(incident.status) }}</v-icon>
          {{ incident.status.replace('_', ' ') }}
        </v-chip>

        <!-- Basic Info -->
        <div class="mb-6">
          <h3 class="text-h6 mb-3">Incident Details</h3>
          
          <v-row dense>
            <v-col cols="6">
              <div class="text-caption text-medium-emphasis">Priority</div>
              <v-chip
                :color="getPriorityColor(incident.priority)"
                size="small"
                variant="tonal"
              >
                {{ incident.priority }}
              </v-chip>
            </v-col>
            <v-col cols="6">
              <div class="text-caption text-medium-emphasis">Confidence</div>
              <v-chip
                :color="getConfidenceColor(incident.confidence)"
                size="small"
                variant="tonal"
              >
                {{ incident.confidence }}
              </v-chip>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Reported</div>
            <div class="text-body-2">{{ formatDate(incident.createdAt) }}</div>
          </div>

          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Region</div>
            <div class="text-body-2">{{ incident.region }}</div>
          </div>

          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Location</div>
            <div class="text-body-2">
              {{ incident.location.lat.toFixed(6) }}, {{ incident.location.lng.toFixed(6) }}
            </div>
          </div>
        </div>

        <!-- Report Details -->
        <div class="mb-6">
          <h3 class="text-h6 mb-3">Report Details</h3>
          
          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Type</div>
            <v-chip size="small" variant="tonal" color="orange">
              {{ incident.report.what }}
            </v-chip>
          </div>

          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Size</div>
            <v-chip size="small" variant="tonal" color="blue">
              {{ incident.report.size }}
            </v-chip>
          </div>

          <div class="mb-3">
            <div class="text-caption text-medium-emphasis">Wind Present</div>
            <v-chip 
              size="small" 
              variant="tonal" 
              :color="incident.report.wind ? 'red' : 'green'"
            >
              {{ incident.report.wind ? 'Yes' : 'No' }}
            </v-chip>
          </div>

          <div v-if="incident.report.notes" class="mb-3">
            <div class="text-caption text-medium-emphasis">Notes</div>
            <div class="text-body-2">{{ incident.report.notes }}</div>
          </div>
        </div>

        <!-- Updates -->
        <div v-if="incident.updates && incident.updates.length" class="mb-6">
          <h3 class="text-h6 mb-3">Updates</h3>
          <v-timeline density="compact">
            <v-timeline-item
              v-for="update in incident.updates"
              :key="update.at"
              dot-color="primary"
              size="small"
            >
              <div class="text-body-2">{{ update.text }}</div>
              <div class="text-caption text-medium-emphasis">
                {{ formatDate(update.at) }} by {{ update.by }}
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>

        <!-- Admin Actions -->
        <div class="admin-actions">
          <h3 class="text-h6 mb-3">Actions</h3>
          <v-row>
            <v-col cols="6">
              <v-btn
                color="success"
                variant="outlined"
                block
                size="small"
                @click="updateStatus('CONFIRMED')"
              >
                Confirm
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="success"
                variant="outlined"
                block
                size="small"
                @click="updateStatus('CONTAINED')"
              >
                Contained
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="error"
                variant="outlined"
                block
                size="small"
                @click="updateStatus('FALSE_ALARM')"
              >
                False Alarm
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="outlined"
                block
                size="small"
                @click="showAddUpdateDialog = true"
              >
                Add Update
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </div>

    <!-- Add Update Dialog -->
    <v-dialog v-model="showAddUpdateDialog" max-width="400">
      <v-card>
        <v-card-title>Add Update</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="updateText"
            label="Update details"
            variant="outlined"
            rows="3"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showAddUpdateDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addUpdate">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'IncidentDrawer',
  props: {
    modelValue: Boolean,
    incident: Object
  },
  emits: ['update:modelValue', 'update-incident'],
  data() {
    return {
      showAddUpdateDialog: false,
      updateText: ''
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
    
    getConfidenceColor(confidence) {
      const colors = {
        'LOW': 'red',
        'MEDIUM': 'orange',
        'HIGH': 'green'
      }
      return colors[confidence] || 'orange'
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
    
    updateStatus(newStatus) {
      this.$emit('update-incident', this.incident.id, { status: newStatus })
    },
    
    addUpdate() {
      if (!this.updateText.trim()) return
      
      const update = {
        addUpdate: {
          text: this.updateText,
          by: 'admin',
          at: new Date().toISOString()
        }
      }
      
      this.$emit('update-incident', this.incident.id, update)
      this.updateText = ''
      this.showAddUpdateDialog = false
    }
  }
}
</script>

<style scoped>
.incident-drawer {
  height: 100%;
}

.admin-actions {
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
}
</style>