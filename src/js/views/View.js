import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  //render data
  render(data) {
    //check if there's no data or data is an empty array then return and render error
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); //  this error rendering is currently not working yet

    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
    console.log(this._data);
  }

  //update only the needed data in the view and not re-render all the view
  update(data) {
    //check if there's no data or data is an empty array then return and render error
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError(); //  this error rendering is currently not working yet

    this._data = data;
    // the generated markUp in memory
    const newMarkUp = this._generateMarkup();

    // convert this newMarkup to a DOM Elelement(Node-list)
    const newDom = document.createRange().createContextualFragment(newMarkUp);

    // Select the new and current elemets and convert them to an array so we can compare both
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Comparing the current elements in the DOM with the new elements in memory
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      //Update text changes
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      //updates changed attributes
      if (!newEl.isEqualNode(currEl))
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // clear parent element before inserting new elements
  _clear() {
    this._parentElement.innerHTML = '';
  }

  //render loading spinner
  renderSpinner() {
    const markUp = `
              <div class="spinner">
                      <svg>
                        <use href="${icons}#icon-loader"></use>
                      </svg>
              </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  // render error message
  renderError(message = this._errorMessage) {
    const markUp = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  //render success message
  renderMessage(message = this._message) {
    const markUp = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
