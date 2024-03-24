# GraphiQL App

Welcome to the GraphiQL App project! This interactive GraphQL playground allows users to make requests to a user-specified GraphQL endpoint with added features such as authorization, authentication, and more.

## Team Members

- Irina
- Anastasia
- Maria

## Project Overview

This project aims to create a robust GraphiQL application with the following key features:

- Authorization and authentication for restricted access.
- Support for any open, user-specified GraphQL API with CORS.
- Utilization of a proxy service for making requests to GraphQL APIs.
- A well-structured app with a welcome page, user authentication, and a GraphiQL page.
- Semantic layout and responsive design for an optimal user experience.

## Repository Information

- Repository Name: graphiql-app
- Branches:
  - `main`: Empty branch containing only README.md.
  - `develop`: Development branch for ongoing work.
  
## Project Structure

The project is organized into the following main components:

- **Welcome Page**: Contains information about the developers, project, and course. Provides links for Sign In and Sign Up.

- **User Authentication**: Implements Firebase for email/password sign-in. Performs client-side validation for email and password strength.

- **GraphiQL Page**: A private route with a sticky header. Features a functional query editor and JSON viewer with prettifying support. Includes sections for variables, headers, and response.

- **Documentation Explorer**: Lazily loaded section visible upon a successful SDL request.

- **Localization**: Supports at least 2 languages with a language toggle in the header, implemented using Context API.

- **Footer**: Visible on all pages and contains links to authors' GitHub, the year of application creation, and the course logo.

## Development Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
2. Install dependencies:
   npm install
3. Run the development server:
   npm run dev
4. Access the app in your browser at http://localhost:3000.
  
## Deployment

The demo version of the application is deployed on https://codehub-graphiql-app.netlify.app/ for easy access.

## Contribution

Please follow the guidelines mentioned in the task description. Team members, make sure to coordinate with the team lead for contributions and pull requests.

### Happy coding!
