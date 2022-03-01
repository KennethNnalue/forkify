import icons from 'url:../../img/icons.svg';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try one of our Soups';
  _message = '';

  // generate the markup to render for the searched results
  _generateMarkup() {
    // tutorial implementaion
    // return this._data.map(this._generateMarkupPreview).join('');

    // My personal implementation
    const data = this._data.map(result => {
      return `
        <li class="preview">
        <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${result.title} ...</h4>
            <p class="preview__publisher">${result.publisher}</p>
           
            </div>
        </a>
        </li>

      `;
    });
    return data.join('');
  }

  // generate the markup to be passed to _generateMarkup() function
  _generateMarkupPreview(result) {
    return `
        <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
            <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__title">${result.title} ...</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            </div>
        </a>
        </li>
      
      `;
  }
}

//export the ResultView class to be available in other modules( controller module)
export default new ResultsView();
