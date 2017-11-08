# Temis backend
A voice to report acts of violence and create awareness 

## Setup
- Run `npm install`
- Copy the file `config.js.sample` into `config.js` and provide the correct settings.

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
`npm test`

## Run

- `npm start` will start the development server
- `npm run dev` will start the development server with hot reload (watches for changes)
- `npm run build` will statiscally build into the `dist` folder
- `npm run serve` will start the server from the `dist` folder