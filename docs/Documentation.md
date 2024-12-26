# Provider Access Platform Frontend Setup

## Project Setup

To set up the frontend project "provider-access-platform-frontend" using Vite, React, and JavaScript, follow these steps:

__1. Create a New Vite Project:__

Open your terminal and run the following command to create a new Vite project with the React template:

```bash
npm create vite@latest provider-access-platform-frontend -- --template react
```

__2. Navigate to your project directory:__

```bash
cd provider-access-platform-frontend
```

__3. Install the necessary dependencies:__

```bash
npm install
```

__4. Start the development server:__

```bash
npm run dev
```

Your React application will now be running on http://localhost:5173

__Vite Configuration Changes__

We replaced the default `vite.config.js` with the following customizations for the following reasons:

1. **Network Accessibility**: Enabled the `host: true` option so the development server is accessible from other devices on the same network. This is particularly useful for mobile and external device testing.
2. **File Change Detection**: Added the `usePolling: true` option under the `watch` configuration to ensure file changes are detected in environments like WSL or Docker where default file-watching may fail.


## Project Directory Structure

The directory structure of this project has undergone multiple reorganizations to enhance:

- Modularity
- Scalability
- Maintainability



## Bootstrap

- Install Bootstrap: This adds Bootstrap to your dependencies in package.json
- Import Bootstrap into the Project
- Use Bootstrap's pre-defined classes directly in your React components.
- Customize Bootstrap (optional)




