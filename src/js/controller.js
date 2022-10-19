/* eslint-disable arrow-body-style */
// import icons from '../img/icons.svg'; // Parcel 1

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeViews.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot) {
//   module.hot.accept();
// }

// Forkify API https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner(); // Spinner

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();

    // (1 get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
  }
};

const controlPagination = (goToPage) => {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const contorlServings = (newServings) => {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe); 這個會把全部圖片都更新
  recipeView.update(model.state.recipe); // only update text AND ATTRIBUTES in the dom
};

const controlAddBookmark = () => {
  // 1) check current recipe whether been bookmarked.
  if (!model.state.recipe.bookmarked) {
    //  cuurent recipe add bookmarked = true
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2) update DOM
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks(右上角的選單)
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async (newRecipe) => {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render RECIPE
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
  // Reload page
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const init = () => {
  // Publisher subscrber pattern
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpadteServings(contorlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  // 右上角的bookmark 在一開始load頁面時  把存在local storage的bookmark 丟進state.bookmarks 並render
  model.restoreBookmarks();
};
init();

// ['hashchange', 'load'].forEach((e) => {
//   window.addEventListener(e, controlRecipes);
// });
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
