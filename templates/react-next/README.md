# ESMate React Next

ESMate React Next is a production-ready SaaS template built with the latest technologies to help you launch your next
idea in days, not weeks. It comes with a complete setup for authentication, payments, database, and all the tools you
need for a modern web application.

This template is built with:

- **Framework**: [Next.js](https://nextjs.org/) – A complete React framework for production.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapid UI development.
- **Authentication**: [Better Auth](https://www.better-auth.com/) – A complete open-source authentication solution for
  Next.js applications.
- **Payments**: [Stripe](https://stripe.com/) – A complete payment platform engineered for growth.
- **Database**: [PostgreSQL](https://www.postgresql.org/) – A powerful, open-source object-relational database system.
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) – A lightweight and performant TypeScript ORM for Node.js and
  TypeScript.
- **Linting**: [ESLint](https://eslint.org/) – A tool for identifying and reporting on patterns found in
  ECMAScript/JavaScript code.
- **Formatting**: [Prettier](https://prettier.io/) – An opinionated code formatter.

## Features

- ✅ Complete authentication flow (Sign in, Sign up, Sign out)
- ✅ Database integration with Drizzle ORM and PostgreSQL
- ✅ Stripe integration for subscriptions and payments
- ✅ Protected routes and API endpoints
- ✅ Modern UI with Tailwind CSS
- ✅ Code quality with ESLint and Prettier
- ✅ Docker setup for local development

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing
purposes.

### Installation

1.  **Create a new project:**

    ```bash
    npx create-esmate --template react-next
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
