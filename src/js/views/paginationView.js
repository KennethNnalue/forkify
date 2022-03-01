import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // monitor page navigation event
  addHandlerPageNav(handler) {
    // using event delegation to listen for click events on the two buttons by adding the
    // event listener on their common parent element
    this._parentElement.addEventListener('click', function (e) {
      // closest() method is like querySelector but it looks up for the nearest ancestor that meets
      // the specified requirement(most useful for selecting children of an ancestor together as a group)

      const btn = e.target.closest('.btn--inline');

      // prevent clicks outside the button from returning an error
      if (!btn) return;

      // get the page number on the nav button using dataset attribute on the button and
      // convert it to a number so the handler can use to know which page to go
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    // get the  number of pages and round to the nearest integer
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currentPage = this._data.page;

    // Page 1 and there's no other pages
    if (currentPage === 1 && currentPage === numPages) {
      return '';
    }

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
      `;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (currentPage > 1 && currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
        </button>
      `;
    }
  }
}

export default new PaginationView();
