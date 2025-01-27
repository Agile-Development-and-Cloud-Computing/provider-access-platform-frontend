## Provider Access Platform

### Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Directory Structure](#directory-structure)
4. [Setup Instructions](#setup-instructions)
5. [Technologies Used](#technologies-used)
6. [Development Process](#development-process)
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview
The **Provider Access Platform** is a core module within the Provider Management Platform (PMP). It enables seamless interaction between providers and users, facilitating the management of service requests, offers, and orders in compliance with master agreements.

The **frontend** of the Provider Access Platform is built using **React** and serves as the user interface for interacting with the platform. It supports multiple roles (User and Provider Admin) and provides functionalities like managing service requests, offers, orders, and employee profiles.

### Key Roles
- **User**: Creates and manages service requests, evaluates offers, and selects providers.
- **Provider Admin**: Uploads offers, manages credentials, and handles service requests.

---

## Features
- **Authentication & Authorization**: User and provider admin logins.
- **Service Request Management**: Create, respond, and track service requests.
- **Offer Management**: Submit and manage offers for master agreements.
- **Employee Management**: Upload and maintain employee profiles.
- **Dashboards**:
  - User Dashboard
  - Provider Admin Dashboard
- **Order Handling**: Process orders and manage substitutions.
- **API Integration**: Interaction with external systems for service requests and orders.
- **Responsive Design**: Optimized for desktop and mobile use.
- **Reusable Components**: Modular design with reusable UI components.

---

## Directory Structure
```
src
├── components
│   ├── cards/               # Dashboard cards for specific features
│   ├── kpiCards/            # KPI card components
│   ├── AdminDashboardNavbar.jsx
│   ├── DataFetcher.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── PublicNavbar.jsx
│   └── UserDashboardNavbar.jsx
├── config/
│   └── apiConfig.js         # API base URLs and configurations
├── context/
│   └── AuthContext.jsx      # Context API for authentication
├── layouts/
│   ├── AdminLayout.jsx      # Layout for admin pages
│   ├── PublicLayout.jsx     # Layout for public pages
│   └── UserLayout.jsx       # Layout for user pages
├── pages/
│   ├── auth/                # Authentication pages (Login, Logout, Register)
│   ├── dashboard/           # Dashboards for users and providers
│   ├── management/          # Management pages for various features
│   └── shared/              # Shared pages like Home, About, and Contact
├── routes/
│   └── AppRoutes.jsx        # Route configuration for the app
├── services/
│   ├── apiClient.js         # Axios client for API calls
│   ├── authService.js       # Authentication services
│   └── ...other services
├── styles/
│   ├── cards/               # Styles for card components
│   ├── kpiCards/            # Styles for KPI card components
│   ├── layout.css           # General layout styles
│   └── ...other styles
├── App.jsx                  # Root component
├── main.jsx                 # Application entry point
└── index.html               # HTML template
```

---

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Agile-Development-and-Cloud-Computing/provider-access-platform-frontend.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build the project for production**:
   ```bash
   npm run build
   ```

For detailed instructions on setting up the project, refer to the [Project Setup Guide](./docs/Project-Setup.md).
---

## Technologies Used
- **Framework**: React (with Vite for development)
- **Styling**: CSS modules and custom stylesheets
- **State Management**: Context API
- **HTTP Client**: Axios
- **Routing**: React Router

---

## Development Process
The frontend development follows an Agile methodology with iterative sprints. Key principles include:
- **Modular Codebase**: Each component serves a specific purpose and can be reused.
- **Scalability**: Designed to handle future enhancements and features.
- **API Integration**: Seamless communication with the backend.

---

## Deployment
The frontend is deployed on Railway, adhering to Agile principles and focusing on efficient service request and provider management processes.

## Contributing
Contributions are welcome and appreciated! Please adhere to the following process:
1. Fork the repository.
2. Create a feature branch to introduce changes:
   ```bash
   git checkout -b feature-name
   ```
3. Document and commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push the branch to your forked repository and submit a pull request for review.

---

## License
This project is part of a university module on Agile Methodology and Cloud Computing environments. It adheres to the requirements outlined in the project documentation.


