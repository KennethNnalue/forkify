// import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE } from './config';
import { getJson } from './helpers';

// state for saving our application data
export const state = {
  recipe: {
    servings: 4,
  },
  search: {
    query: '',
    results: [], // contains all the search results returned fron loadSearchResults
    page: 1, // page one as our default page
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

// loading recipe data with the recipe id fom the API and saving it to the state object
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      image: recipe.image_url,
    };
    console.log(state);
  } catch (err) {
    console.error(` 💣🎈${err}`);
    throw err;
  }
};

// load search results when a query is passed and save the retured results to state object
export const loadSearchResults = async function (query) {
  try {
    // saving the passed in query to our state object
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    console.log(data);

    //maping and saving the returned search data to our state.search.results array
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    // set the page to 1 whenever we are loading a new search result
    state.search.page = 1;
  } catch (err) {
    console.error(` 💣🎈${err}`);
    throw err;
  }
};

// get the results to display according to the page number, this method divides the total results into
// a given number of results per page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  // Getting 10 results for each page using the calculation below.
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end); //  .slice() does not include the last element
};

// calculates and updates the number of ingredients according to the number of servings
export const updateServings = function (newServings) {
  //singleServing = currqauntity / numServings;
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * newServings / oldServings
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // update the number of servings in the state after calculating the ingredients quantity
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
