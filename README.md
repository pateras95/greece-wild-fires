Here’s the **full README.md text** ready to copy and paste into your project:

````markdown
# Wildfire Watch (Greece)

A Vue 3 + JavaScript single-page web application that enables citizens, volunteers, and authorities to collaboratively report and monitor wildfire incidents in Greece.  
The app provides a live incidents map, local fire risk index, real-time alerts, and a protected console for report triage and status updates.

---

## 📦 Installation & Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

### Steps
1. **Install dependencies**
   ```bash
   npm install
````

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. Open the URL provided in your terminal (usually `http://localhost:5173/`).

---

## 📄 Product Specification

### 1. Product Summary

Wildfire Watch is a single-page web app that helps people in Greece report suspected wildfires in two taps, view a live incidents map, check a local fire risk index, and receive real-time alerts.
It supports:

* **Citizen reports** with GPS, photo, and timestamp
* **Authority/volunteer triage** for dispatch and incident management
* **Public dashboard** with safety guidance and evacuation notices

---

### 2. User Roles & Permissions

| Role                                       | Capabilities                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Public User** (no sign-in)               | View live map, risk index, safety tips; submit basic fire report                                         |
| **Registered Reporter** (optional)         | All Public features + track submitted reports; receive location-based alerts                             |
| **Moderator / Authority / Volunteer Lead** | Triage reports, merge duplicates, set status (Open, Confirmed, Contained, False Alarm), push area alerts |

---

### 3. Core Features (v1)

#### Report a Fire (modal form)

* Auto-capture location via GPS (with manual pin drop fallback)
* Fields: photo upload (optional), smoke/flame toggle, size estimate, wind presence, notes
* Submit to a queue; display thank-you message & incident ID

#### Live Incidents Map

* Pins colored by status: Open, Confirmed, Contained, False Alarm
* Clustering at zoomed-out levels
* Click pin → incident details drawer with latest updates

#### Local Risk Index

* Card showing today’s fire risk: Low / Moderate / High / Extreme
* Drivers: temperature, humidity, wind (mock/manual input in v1)

#### Regional Alerts

* Subscribe by municipality or postcode
* Receive push/email/SMS alerts (v1: email only / simulated)

#### Volunteer/Authority Console (protected)

* Incident list with triage actions:

    * Assign priority
    * Merge duplicates
    * Update status
    * Add notes
    * Broadcast area alert

---

## 🧑‍💻 Tech Stack

* [Vue 3](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Vuetify 3](https://vuetifyjs.com/)
* [Leaflet](https://leafletjs.com/)
* [Vue3-Leaflet](https://vue3-leaflet.netlify.app/)
