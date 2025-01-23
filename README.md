# Vite React App

This is a simple React application powered by Vite, a fast and modern frontend build tool.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version v23.1.0 or higher
- **pnpm** or **npm** or **yarn**: A package manager to manage dependencies

You can verify your installations using the following commands:

```bash
node -v
npm -v
```

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/miradoniaina/vite-pertimm.git
```

### 2. Navigate to the Project Directory

Change into the project directory:

```bash
cd vite-pertimm
```

### 3. Install Dependencies

Install the required packages using `pnpm` of `npm` or `yarn`:

```bash
# Using pnpm
pnpm i

# Using npm
npm install

# Or using yarn
yarn install
```

### 4. Copy .env

Run the development server to start the application:

```bash
# Using npm
cp .env.example .env
```

### 5. Start the Development Server

Run the development server to start the application:

```bash
# Using pnpm
pnpm run dev

# Using npm
npm run dev

# Or using yarn
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for Production

To create an optimized production build, use the following command:

```bash
# Using pnpm
pnpm run build

# Using npm
npm run build

# Or using yarn
yarn build
```

The production-ready files will be in the `dist` directory.

### 6. Preview the Production Build

You can preview the production build locally:

```bash
# Using pnpm
pnpm run preview

# Using npm
npm run preview

# Or using yarn
yarn preview
```

This will serve the files at [http://localhost:4173](http://localhost:4173) by default.

## Additional Scripts

- **Linting**: Run `npm run lint` or `yarn lint` to lint your code.
- **Formatting**: Run `npm run format` or `yarn format` to format your code (if configured).

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)

---
