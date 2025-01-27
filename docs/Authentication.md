## Provider Access Platform - Frontend Implementation

This repository provides the frontend implementation for the **Provider Access Platform**, a role-based web application built using React. The platform enables providers and admins to interact with service requests, offers, and profiles while maintaining a structured and role-specific workflow.

### Key Features

#### 1. Login and Authentication
- **Context-Based Authentication**: 
  - The `AuthContext` manages user authentication globally, ensuring a centralized state.
- **Persistent Sessions**: 
  - User credentials, including `authToken`, `userRole`, and `providerId`, are securely stored in `localStorage` for session persistence.
- **Error Handling**:
  - Authentication failures (e.g., invalid credentials or network errors) display clear error messages to users.
- **Dynamic Navigation**:
  - Upon successful login, users are redirected to their role-specific dashboards (`Admin` or `User`).

#### 2. Dashboard Based on User Role
- **Admin Dashboard**:
  - Accessible at `/dashboard/admin`.
  - Provides functionality specific to administrative tasks, such as user and provider management.
- **User Dashboard**:
  - Accessible at `/dashboard/user`.
  - Offers features like viewing assigned tasks, submitting offers, and profile management.
- **Role-Based Navigation**:
  - Dynamic routing ensures users are redirected to the appropriate dashboard based on their role (`Admin` or `User`).
- **Invalid Role Handling**:
  - Users with unrecognized roles are flagged with an error for administrative review.

#### 3. Public Pages and Management Pages
- **Public Pages**:
  - Includes the `LoginPage` for user authentication.
  - Styled with responsive CSS (`PublicPages.css`) for a consistent user experience across devices.
- **Management Pages**:
  - Accessible only after authentication.
  - Role-based management features such as user configurations and service request management.
- **Error States**:
  - Meaningful error states on public pages guide users in resolving login or access issues.

#### 4. Routing
- **React Router for Navigation**:
  - Handles dynamic routing for public and protected pages.
  - Ensures authenticated users are routed to role-specific dashboards.
- **Route Protection**:
  - Non-authenticated users cannot access management pages.
- **Defined Route Structure**:
  - `/login`: Public login page.
  - `/dashboard/admin`: Admin-specific dashboard.
  - `/dashboard/user`: User-specific dashboard.
  - Routes dynamically redirect users based on their roles after login.
- **404 Handling**:
  - Undefined routes can display a custom error page for user guidance (optional enhancement).