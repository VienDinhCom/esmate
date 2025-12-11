# ESMate React Astro

ESMate React Astro delivers SEO-friendly pages combined with a smooth single-page experience powered by TanStack Router
and TanStack Query, keeping the project fast while fully interactive. It includes a type-safe API layer using oRPC. The
stack also uses Postgres with Drizzle, authentication with Better Auth, and a UI built with TailwindCSS, React, and
ShadCN.

## Features

- ✅ **SEO-First with Astro**: Static-site generation for optimal SEO and performance.
- ✅ **React for Interactivity**: Seamless client-side navigation and dynamic components with React.
- ✅ **TanStack Router & Query**: Robust routing and data-fetching for a smooth SPA experience.
- ✅ **Typesafe API with oRPC**: End-to-end type safety from backend to frontend.
- ✅ **Postgres with Drizzle**: Modern, typesafe ORM for PostgreSQL.
- ✅ **Authentication with Better Auth**: Secure and flexible authentication.
- ✅ **UI with TailwindCSS & ShadCN**: A beautiful, modern UI with the power of TailwindCSS and ShadCN.
- ✅ **Code Quality**: Formatting with Prettier and linting with ESLint.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing
purposes.

### Installation

1.  **Create a new project:**

    ```bash
    npx create-esmate --template react-astro
    ```

    Change into the new project directory:

    ```bash
    cd [new-project-name]
    ```

2.  **Install dependencies:**

    ```bash
    npm run install
    ```

3.  **Set up environment variables:**

    Create a `.env` file by copying the `sample.env` file:

    ```bash
    cp sample.env .env
    ```

    Update the `.env` file with your credentials for the database, Stripe, and authentication providers.

4.  **Start the database:**

    Use Docker Compose to start a PostgreSQL instance:

    ```bash
    docker-compose up -d
    ```

5.  **Run database migrations:**

    Apply the database schema to your PostgreSQL instance:

    ```bash
    npm run db:migrate
    ```

6.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production build of the application.
- `npm run start`: Starts the production server.
- `npm run fix`: Fix the codebase with Prettier & ESLint.
- `npm run check`: Check the codebase using ESLint & Prettier.
- `npm run db:migrate`: Applies database migrations.
- `npm run db:studio`: Opens the Drizzle Studio to manage your database.
