<template>
  <v-app-bar color="primary" dark height="64">
    <v-container fluid>
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="auto">
          <v-toolbar-title class="text-h5 font-weight-bold">
            <v-icon class="mr-2">mdi-fire-alert</v-icon>
            Wildfire Watch – Greece
          </v-toolbar-title>
        </v-col>
        
        <v-col cols="auto">
          <v-row align="center" no-gutters class="ga-2">
            <!-- Language Switch -->
            <v-col cols="auto">
              <v-btn-toggle
                v-model="selectedLanguage"
                color="white"
                variant="outlined"
                density="compact"
              >
                <v-btn value="en" size="small">EN</v-btn>
                <v-btn value="el" size="small">EL</v-btn>
              </v-btn-toggle>
            </v-col>
            
            <!-- Report Fire Button -->
            <v-col cols="auto">
              <v-btn
                id="btn-report-fire"
                color="white"
                variant="elevated"
                size="large"
                class="font-weight-bold"
                @click="$emit('report-fire')"
              >
                <v-icon class="mr-1">mdi-fire</v-icon>
                Report a Fire
              </v-btn>
            </v-col>
            
            <!-- Admin Menu -->
            <v-col cols="auto">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    icon="mdi-account-circle"
                    variant="text"
                    v-bind="props"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item @click="$emit('toggle-admin')">
                    <v-list-item-title>Admin Console</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Sign In</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['report-fire', 'toggle-admin'],
  data() {
    return {
      selectedLanguage: 'en'
    }
  }
}
</script>