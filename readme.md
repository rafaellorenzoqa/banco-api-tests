# Banco API Tests

Automated test suite for a REST banking API, covering authentication and account transfer flows.

## Tech Stack

- [Mocha](https://mochajs.org/) — test runner
- [Chai](https://www.chaijs.com/) — assertions
- [Supertest](https://github.com/ladjs/supertest) — HTTP requests
- [Mochawesome](https://github.com/adamgruber/mochawesome) — test report
- [dotenv](https://github.com/motdotla/dotenv) — environment variables

## Project Structure

```
├── fixtures/           # Request body data used in the tests
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/
│   └── autenticacao.js # Helper to obtain the auth token
├── test/
│   ├── login.test.js
│   └── transferencias.test.js
└── mochawesome-report/ # Report generated after running the tests
```

## Prerequisites

- Node.js
- A running instance of the target banking API (e.g. running locally)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a `.env` file in the project root with the API base URL (you can use the URL of your API):
   ```
   BASE_URL = "http://localhost:3000"
   ```

## Running the tests

```
npm test
```

Tests are executed with Mocha and the report is generated with Mochawesome at `mochawesome-report/mochawesome.html`.

## Test Coverage

### Login (`POST /login`)
- Returns 200 with a valid token when given valid credentials.

### Transferencias
- `POST /transferencias`: succeeds (201) for values >= 10 and fails (422) for values less than 10.
- `GET /transferencias/{id}`: returns the transfer data matching the given id.
- `GET /transferencias`: validates pagination (number of items per page).
