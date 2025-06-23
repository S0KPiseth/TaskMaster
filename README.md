# Task-er

## Overview

**Task-er** is a full-stack web application that allows users to create and manage their tasks efficiently. Although still under development, users can already log in, create tasks, and have them saved securely.

---

## Sneak Peek

<table>
  <tr>
    <td><img src="https://via.placeholder.com/300" alt="Screenshot 1" /></td>
    <td><img src="https://via.placeholder.com/300" alt="Screenshot 2" /></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/300" alt="Screenshot 3" /></td>
    <td><img src="https://via.placeholder.com/300" alt="Screenshot 4" /></td>
  </tr>
</table>

---

## Features

- User authentication using OAuth 2.0 (Google, Discord, GitHub)
- Create, edit, complete, and delete tasks
- Create boards to organize tasks
- Drag and drop tasks across boards
- Search bar for easy task filtering
- Integrated calendar for tracking ongoing tasks
- Toggleable task layout: list & board view
- Fully responsive and modern UI
- Smooth animations powered by GSAP

---

## Tech Stack

- **Frontend**: React.js, CSS, GSAP (for animations)
- **Backend**: Node.js, Express
- **Database**: MongoDB

---

## Installation

### Prerequisites

#### Node.js and npm

Required for running the backend server and installing dependencies.  
[Download Node.js](https://nodejs.org/)

#### MongoDB

Used for the local database.  
You can install the [MongoDB Community Server](https://www.mongodb.com/try/download/community)

---

### Steps to Set Up

1. **Clone** both the frontend (this repository) and [backend](https://github.com/S0KPiseth/Task-er_Backend) repositories.
2. Open both folders in your code editor and run:
   ```bash
   npm install
   ```
3. In the **backend folder**, create a `.env` file using the example provided.  
   You’ll need 3 client IDs and secrets for the following providers:

   - [Google OAuth Credentials](https://console.cloud.google.com/apis/credentials)
   - [Discord Developer Portal](https://discord.com/developers/applications)
   - [GitHub OAuth Apps](https://github.com/settings/developers)

4. Start the **backend server**:
   ```bash
   npm run start
   ```
5. Start the **frontend app**:
   ```bash
   npm start
   ```
6. Navigate to `http://localhost:8888` You can now use Task-er locally.

---

## ⚠️ Important Notes

Task-er is still in development. Some features shown in the UI (e.g., dashboard analytics, user notifications, settings, profile view/switching) are **not yet implemented**.

Thank you for your understanding.
