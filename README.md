# Movie Search

This is a basic app for searching for movies using [The Movie DB API](https://developers.themoviedb.org/3/). It's built using React Typescript, with Redux state management, using MUI for the visuals. It was bootstrapped with create-react-app.

# Running it

You must have npm installed. First, change your directory to `/movie-browser` and install dependancies:

`npm i`

Then, run the app, use npm to start the development server: 

`npm run start`

To run the tests, run

`npm run test`

# Api Key

This app requires an API key to the Movie DB API, place this in the 

`/movie-browser/src/constants.ts` file.

# Future development

There are many options for future development:

* Adding a back button from the details page
* Better error handling for network requests
* Inline CSS should be in `.scss` files instead
* Linting can be used for better developer experience
* If deploying this to the cloud, the API key should be in secrets management
* More unit tests can be written (especially for the homepage)

## Bugs

* Sometimes fewer than 5 results display.
* When searching for 2 movies of the same title, the app can crash.
