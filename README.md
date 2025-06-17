# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - Download & Install Docker
- Docker Compose (included with Docker Desktop)

Running with Docker (Recommended)
Using Docker Compose

Clone the repository and navigate to the project directory
Start the application:
bash docker-compose up
Or to run in detached mode:
bash docker-compose up -d

The application will be available at:

API: http://localhost:4000
OpenAPI documentation: http://localhost:4000/doc


To stop the application:
bash docker-compose down


Using Pre-built Images from Docker Hub
bash# Pull the images
docker pull davidtavartk/music-library-app:latest
docker pull davidtavartk/music-library-db:latest

# Run with docker-compose (recommended)
docker-compose up

## Downloading

```
git clone https://github.com/davidtavartk/nodejs2025Q2-service.git

git checkout development3
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Testing
With Docker
bash# Start the application
docker-compose up -d

# Run tests in a new terminal
npm test
Without Docker
bash# Terminal 1
npm start

# Terminal 2
npm run test

To run all tests without authorization

```
npm start (On first terminal)
npm run test (On second terminal)
```

Not Applicable yet:

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

API Documentation
After starting the app, you can access:

OpenAPI documentation: http://localhost:4000/doc
For more information about OpenAPI/Swagger: https://swagger.io/