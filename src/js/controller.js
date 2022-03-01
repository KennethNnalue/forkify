import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime';

//This is coming from parcel and not pure javascript
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// getting and rendering the recipe
const controlRecipes = async function () {
  try {
    // getting the recipe id from the DOM when we click a recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //loding recipe
    await model.loadRecipe(id);

    // Redering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// Get and Render search results
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query from searchView to enable us load search results using the query value
    const query = searchView.getQuery();
    if (!query) return;

    //Load search result
    await model.loadSearchResults(query);

    //Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render innitial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //Render results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render innitial pagination buttons
  paginationView.render(model.state.search);
};

// getting and rendering the number of servings
const controlServings = function (newServings) {
  // update the recipe servings in the state
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

// Add bookmark controller
const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
};

// innit function to innitialize our app on start
const innit = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPageNav(controlPagination);
};

innit();
