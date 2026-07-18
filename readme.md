# Banco API Tests

Automated test suite for a REST banking API, covering authentication, account and transfer flows.

> **Note:** This is my first testing/automation project and a learning exercise for me as I study API test automation. The project is still a work in progress — see [Next Steps](#next-steps) below.

## Tech Stack

This project is built with [Node.js](https://nodejs.org/) and the following dependencies:

| Package | Purpose | Docs |
|---|---|---|
| [mocha](https://www.npmjs.com/package/mocha) | Test runner | [mochajs.org](https://mochajs.org/) |
| [chai](https://www.npmjs.com/package/chai) | Assertion library | [chaijs.com](https://www.chaijs.com/) |
| [supertest](https://www.npmjs.com/package/supertest) | HTTP request/assertion library used to call the API | [github](https://github.com/ladjs/supertest) |
| [mochawesome](https://www.npmjs.com/package/mochawesome) | HTML/JSON test reporter for Mocha | [github](https://github.com/adamgruber/mochawesome) |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from a `.env` file | [github](https://github.com/motdotla/dotenv) |

### Installing the dependencies

All dependencies are listed in [package.json](package.json) and can be installed in one step:

```
npm install
```

This installs every package above (and their sub-dependencies) into `node_modules/`. If you ever need to install one individually — for example when starting a new project from scratch — the commands are:

```
npm install mocha --save
npm install chai --save
npm install supertest --save
npm install mochawesome --save
npm install dotenv --save
```

## Project Structure

```
├── fixtures/            # Request body data used in the tests
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/
│   └── autenticacao.js  # Helper to obtain the auth token
├── test/
│   ├── login.test.js
│   ├── contas.test.js
│   └── transferencias.test.js
└── mochawesome-report/  # Report generated after running the tests
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
- Returns 400 when the username is missing.
- Returns 400 when the password is missing.
- Returns 400 when both username and password are missing.
- Returns 401 when the username is incorrect.
- Returns 401 when the password is incorrect.

### Contas
- `GET /contas`: returns 200, and the number of accounts matches the backend.
- `GET /contas/{id}`: returns 200, and the returned id matches the requested account id.

### Transferencias
- `POST /transferencias`:
  - Succeeds (201) for values >= 10.
  - Succeeds (201) when the value exceeds 5000 and the token is valid.
  - Fails (422) for values less than 10.
  - Fails (404) when the destination account is invalid.
  - Fails (401) when the value exceeds 5000 and the token is invalid.
  - _(skipped, see known bugs below)_ Should return 400 for a malformed body (missing `contaDestino`).
- `GET /transferencias/{id}`: returns the transfer data matching the given id.
- `GET /transferencias`: validates pagination (number of items per page).

## Known Bugs

While writing these tests I found a couple of issues in the API's behavior, marked in the test files as `KNOWN BUG`:

1. **`POST /transferencias` with a malformed body returns the wrong status code.**
   When `contaDestino` is missing from the request body, the API is expected to return `400 Bad Request`, but it does not. The corresponding test in [transferencias.test.js](test/transferencias.test.js) is currently skipped (`it.skip`) to document this without failing the suite.

2. **`GET /transferencias/{id}` returns `valor` as a string instead of a number.**
   The `valor` field in the response body is returned as a string (e.g. `"11.00"`) instead of a numeric value. This is asserted (and documented) directly in the test in [transferencias.test.js](test/transferencias.test.js).

## Next Steps

This project is still evolving as I keep learning. Planned next steps:

- Add tests for `PUT` endpoints.
- Add tests for `PATCH` endpoints.
- Add tests for `DELETE` endpoints.
