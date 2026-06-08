# Control App

This app is designed for tablet devices to control the contents of a screen dynamically. It allows users to update screen contents by intuitively dragging and dropping assets into a designated screen location within the UI. The application uses OSC (Open Sound Control) to send commands to the screen.

## Project Structure

This project is organized into two main parts:
- **Server (`/server`)**: A Node.js and Express backend that handles communication and acts as an OSC bridge.
- **Frontend App (`/apps/control`)**: A React-based web interface built with Vite, designed for tablet usage, featuring drag-and-drop capabilities.

## Technologies Used

- **Frontend**:
  - React (via Vite)
  - `@dnd-kit` for robust drag-and-drop functionality

- **Backend**:
  - Node.js
  - Express
  - `node-osc` for sending Open Sound Control commands

## Installation

You will need to install the dependencies for both the server and the frontend app.

### 1. Install Server Dependencies
Open your terminal, navigate to the `server` directory, and run `npm install`:
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
Open a new terminal or navigate to the `apps/control` directory and run `npm install`:
```bash
cd apps/control
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the project to store your sensitive configurations such as ports and IPs.

Example `.env` file:
```env
CONTROL_PORT=3000
OSC_IP=127.0.0.1
OSC_PORT=10000
```

## Running the Application

To run the application locally, you will need to start both the server and the frontend app in separate terminal windows.

### 1. Start the Server
Navigate to the `server` directory and start it:
```bash
cd server
npm start
```
*This will start the backend server, ready to receive and dispatch OSC commands.*

### 2. Start the Frontend App
Navigate to the `apps/control` directory and start the Vite development server:
```bash
cd apps/control
npm run dev
```
*This will start the React app. It should provide a local URL (usually `http://localhost:5173/`) that you can open in your tablet's browser or a desktop browser for testing.*

## Usage
Once both the server and the frontend are running, open the provided frontend URL in your browser. You can then interact with the UI by dragging available assets into the screen area, which will trigger the respective OSC commands to update the remote screen content.
