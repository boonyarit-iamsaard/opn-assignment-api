# RESTful API

## Assignment

Our commerce services need an interface where it bridges between frontend and data source, so we decided to have a RESTful API where it supports bellowing pages.

### Pages
- **Registration page** is where new member can start their membership.
  - Fields submitted: email, password, name, date of birth, gender and address, subscribe to newsletter.
- **Profile page** is where we can see their information.
  - Fields to display: email, name, age, gender, address and subscribe to newsletter.
- **Edit profile page** is where members can update their information.
  - Fields allowed to edit: date of birth, gender, address and subscribe to newsletter.
  - Members can delete their account regarding PDPA policy.
- **Password change page** is where members can set their new password by entering current password and following with new password and confirmation.

### Requirements
- Your program will serve a RESTful API.
- Your API will be called via an HTTP client, e.g.: Postman, curl.
- No need to connect to the database.
- Authentication should be verified from header "Authorization" with mock value e.g.: `Authorization: Bearer faketoken_user1`
- Validation have additional score.

## Prerequisite
- Required Node.js 18.x or later.
- Required pnpm 8.9.x or later.
- If you don't want to use pnpm, you can use npm or yarn but make sure to remove `pnpm-lock.yaml` file and the `"packageManager"` field from `package.json` file.

## Setup

Run the following command to install dependencies.

```sh
pnpm install

# or npm install or yarn install
```

Copy content of `.env.example` to `.env` file.

```sh
cp .env.example .env
```
- `ACCESS_TOKEN_SECRET` is used to sign the JWT token, you can set any value.
- `ACCESS_TOKEN_EXPIRES_IN` is used to set the expiry of the JWT token, more information can be found [here](https://github.com/vercel/ms).


## Run

Run the following command to start the server, it will start the server at `http://localhost:3000`.

```sh
pnpm start:dev

# or npm run start:dev or yarn start:dev
```

## Test

Run the following command to run test.

```sh
pnpm test

# or npm run test or yarn test
```

## Postman Collection

Postman collection is available at `./postman` directory.

## Areas of Improvement

- [ ] Improve validation error message
- [ ] Remove duplicate code

## Roadmap

- [ ] Add refresh token mechanism and httpOnly cookie
- [ ] Add custom response
- [ ] Add logger
- [ ] Add global error handler
- [ ] Add swagger documentation
- [ ] Add versioning
- [ ] Add more test cases
- [ ] Add docker and database integration
- [ ] Add CI/CD pipeline
