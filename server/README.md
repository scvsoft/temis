# Temis backend
A voice to report acts of violence and create awareness 

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]

[![Maintainability][codeclimate-maintainability-image]][codeclimate-maintainability-url]
[![Issues][codeclimate-issues-image]][codeclimate-issues-url]
[![Test Coverage][codeclimate-test_coverage-image]][codeclimate-test_coverage-url]

[![Dependency Status][depstat-image]][depstat-url]
[![Dev Dependency Status][devdepstat-image]][devdepstat-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

## Setup
- Run `npm install`
- Copy the file `.env.sample` into `.env` and provide the correct settings.

## Test

### Running the app

- Go to your Facebook app (https://developers.facebook.com/apps)
- Go to Roles -> Test users
- Get an access token from one of your test users
- Launch the server with `npm start``
- Do a POST http://localhost:3000/auth/facebook with json body
````
{
	"access_token": "YOUR_TOKEN"
}
````
- If the response is 200 OK, check the custom header `x-auth-token`
- Pass that same custom header in every subsequent request, such as:
````
GET http://localhost:3000/auth/me
````

### Testing
`npm test` or `npm test:watch`. The last one watches your changes and executes all the tests.

## Run

- `npm start` will start the development server
- `npm run dev` will start the development server with hot reload (watches for changes)
- `npm run build` will statiscally build into the `dist` folder
- `npm run serve` will start the server from the `dist` folder

[travis-image]: https://travis-ci.org/scvsoft/temis.svg?branch=master
[travis-url]: https://travis-ci.org/scvsoft/temis

[coverage-url]: https://codecov.io/github/scvsoft/temis?branch=master
[coverage-image]: https://codecov.io/github/scvsoft/temis/coverage.svg?branch=master

[snyk-url]: https://snyk.io/test/github/scvsoft/temis?targetFile=server%2Fpackage.json
[snyk-image]: https://snyk.io/test/github/scvsoft/temis/badge.svg?targetFile=server%2Fpackage.json

[depstat-url]: https://david-dm.org/scvsoft/temis
[depstat-image]: https://david-dm.org/scvsoft/temis.svg?path=server

[devdepstat-url]: https://david-dm.org/scvsoft/temis?path=server&type=dev
[devdepstat-image]: https://david-dm.org/scvsoft/temis/dev-status.svg?path=server

[codeclimate-maintainability-url]: https://codeclimate.com/github/scvsoft/temis/maintainability
[codeclimate-maintainability-image]: https://api.codeclimate.com/v1/badges/cdb13afdb31afeea07ad/maintainability

[codeclimate-issues-url]: https://codeclimate.com/github/scvsoft/temis/issues
[codeclimate-issues-image]: https://codeclimate.com/github/scvsoft/temis/badges/issue_count.svg

[codeclimate-test_coverage-url]: https://codeclimate.com/github/scvsoft/temis/test_coverage
[codeclimate-test_coverage-image]: https://api.codeclimate.com/v1/badges/cdb13afdb31afeea07ad/test_coverage