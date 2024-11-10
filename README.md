# ykone

## Description

This project is a Vue 3 application that utilizes several APIs for displaying profile, audience, and performance data. The project is built using Vite and TypeScript and includes features like charts with chart.js and Vue Router for navigation.

## Prerequisites

Before running the project, make sure you have the following installed:

Node.js (version 16 or above)
npm (Node Package Manager)
If you don't have these installed, download and install Node.js from [nodejs.org](https://nodejs.org/en).

## Setup Instructions

### Step 1: Clone the Repository

Start by cloning the project repository to your local machine:

```sh
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies

Once you've cloned the repository, you need to install the required dependencies.

Run the following command in the root directory of the project:

```sh
npm install
```

This will install both the production and development dependencies listed in package.json.

### Step 3: Set Up Environment Variables

You need to configure environment variables to connect to the various APIs the project relies on. These variables should be defined in a .env file in the root of the project.

Create a .env file (if it doesn’t already exist) and add the following content:

```sh
VITE_PROFILE_DATA_API_URL=https://staging.campaygn.com/assessment/profile_data
VITE_PROFILE_CONTENT_API_URL=https://staging.campaygn.com/assessment/post_data/1
VITE_AUDIENCE_DEMOGRAPHICS_URL=https://staging.campaygn.com/assessment/audience_demographics
VITE_PERFORMANCE_TIMELINE_API_URL=https://staging.campaygn.com/assessment/performance_timeline
```

These URLs correspond to different APIs that the application will interact with.

### Step 4: Run the Development Server

Once the dependencies are installed and the environment variables are set, you can start the development server.

```sh
npm run dev
```

This will start the development server and your application will be available at [http://localhost:5173](http://localhost:5173).

## Project Structure

Here's an overview of the project structure:

```sh
ykone/
├── public/               # Static assets (favicon.)
├── src/                  # Application source code
│   ├── components/       # Vue components
│   ├── assets/           # Styles, images, fonts etc.
│   ├── composables/      # custom hooks.
│   ├── router/           # Vue Router setup
│   ├── typeInterfaces/   # Some Typesscript interfaces
│   ├── view/             # pages
│   ├── App.vue           # Root component
│   └── main.ts           # Entry point of the application
├── .env                  # Environment variables
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## Technologies Used

-- Vue 3: JavaScript framework for building the user interface.
-- Vite: Next-generation build tool for faster development.
-- TypeScript: Superset of JavaScript with type checking.
-- Chart.js: JavaScript library for creating charts and graphs.
-- Vue Router: Router library for navigating between views.

## Troubleshooting

-- process is not defined Error: This error might occur if you're trying to access environment variables incorrectly. In Vite, use import.meta.env to access variables, not process.env. Ensure that your .env file is set up correctly.

-- Missing Dependencies: If you see errors related to missing dependencies, run npm install to ensure everything is installed.
