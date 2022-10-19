/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-underscore-dangle */
import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupButtonNext() {
    return `<button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
  }

  _generateMarkupButtonPre() {
    return `<button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>`;
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const curPage = this._data.page;

    // Page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext();
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPre();
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButtonNext() + this._generateMarkupButtonPre()}`;
    }

    // Page 1 , and there are NO other pages
    return '';
  }
}

export default new PaginationView();
