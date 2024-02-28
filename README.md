# Leaderboard API

The Leaderboard API is a RESTful web service built using Node.js and Express.js. It provides endpoints to retrieve leaderboard data for the current week, last week by country, and user rank based on user ID. The API interacts with a MySQL database to fetch leaderboard data.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dependencies](#dependencies)
- [Authors](#authors)

## Features

- Retrieve the current week's leaderboard.
- Retrieve the last week's leaderboard for a specific country.
- Fetch the rank of a user based on their user ID.
- Serve Swagger UI documentation for easy API exploration.

## Installation

1. Clone the repository:

```
https://github.com/Snehal-Salvi/blacklight_assg
```

2. Navigate to the project directory.

3. Install dependencies:

```
   npm install
```

4. Set up environment variables:

   Create an `.env` file in the root directory and define the necessary environment variables.

```
DB_HOST: localhost
DB_USER: username
DB_PASSWORD: password
DB_DATABASE: database_name
```

5. Start the server:

```
   npm start
```

The server will start running on `http://localhost:{port}`.

## Usage

You can interact with the API using various HTTP clients like Postman. Additionally, Swagger UI documentation is available at `https://blacklight-assg.onrender.com/api-docs` for exploring and testing the endpoints interactively.

## Endpoints

- **GET /leaderboard/current-week**: Retrieve the current week's leaderboard.

```
https://blacklight-assg.onrender.com/leaderboard/current-week
```

- **GET /leaderboard/last-week/:country**: Retrieve the last week's leaderboard for a specific country.
```
 https://blacklight-assg.onrender.com/leaderboard/last-week/US
```
- **GET /user/:userId/rank**: Fetch the rank of a user based on their user ID.

```
https://blacklight-assg.onrender.com/user/user2/rank
```

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [MySQL](https://www.mysql.com/): MySQL database driver for Node.js.
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express): Middleware to serve Swagger UI documentation for APIs.

## Authors

- [@Snehal]https://github.com/Snehal-Salvi
