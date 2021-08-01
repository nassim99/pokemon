# Pokemon App

Small project for pokemon list fetched from [https://pokeapi.co](https://pokeapi.co) been coded using React, Typescript And CSS flex.

For this small project i haven't used React router or any global state managment like Redux or any template ui

## Basic Flow

Upon lunching the app, it calculate number of items to show based on the dimensions of the view area. It show list of empty cards first then fetch pokemons from api, then looping the pokemons to fetch each pokemon details and show one by one in the place of empty cards. Infinit-scroll is implemented, didn't use any library, i just use IntersectionObserver, upon scroll to bottom it loads another set of empty cards then fetch new pokemons. On clicking pokemon it shows a modal with the more information about the pokemon.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode. (Currentlly only <Modal /> component has test)

### `yarn test:e2e`

Launches the cypress end to end test.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## More

If you have any suggestions, feel free to contact me.
