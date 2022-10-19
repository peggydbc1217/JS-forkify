/* eslint-disable no-underscore-dangle */
import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found for your query! Please try again💥💥';

  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map((result) => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
