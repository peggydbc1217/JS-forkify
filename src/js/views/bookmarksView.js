/* eslint-disable no-underscore-dangle */
import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View.js';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ‼‼';

  _message = '';

  // 在一開始load頁面時 更新右上角的bookmark 因為有些存在local storage
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map((bookmark) => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
