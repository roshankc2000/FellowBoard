# FellowBoard Platform

FellowBoard is a collaborative platform designed for fellowship management and engagement.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Accessing the Application](#accessing-the-application)


## Getting Started

Follow the instructions below to set up and run the FellowBoard platform locally.

## Prerequisites

- **Docker**: Make sure Docker is installed. Docker will be used to run PostgreSQL with Docker Compose.
- **Node.js**: To run the backend application.
- **Yarn**: To manage dependencies.
## Installation

1. **Clone the Repository**:

   `git clone https://github.com/roshankc2000/FellowBoard`

   `cd fellowboard`

2. **Install Dependencies**:

   `yarn install`

## Environment Variables

The project requires specific environment variables to be set. A `.env.sample` file is provided as a reference.

1. **Copy `.env.sample` to `.env`**:

   `cp backend/.env.sample backend/.env`

2. **Edit `.env`**:

   Modify the environment variables in `.env` to fit your local setup. Make sure to set up values like database credentials and ports according to your requirements.

## Running the Application

### Using Docker Compose

The codebase is configured to run PostgreSQL on Docker for easy setup. Ensure Docker is running, then start the application:

`docker-compose up --build -d`

This command will start PostgreSQL database.

### Running the Application
To run the application (API server), run the following command:

`yarn start`

### Accessing the Application

Once the services are running, you can access the platform via `http://localhost:YOUR_PORT`.
