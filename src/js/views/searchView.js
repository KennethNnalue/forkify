class searchView {
  _parentElement = document.querySelector('.search');

  // get the search input value
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;

    //Clear search input field
    this._clearInput();
    return query;
  }

  // clear the search area after getting the search input value
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  //subscriber listening for search event
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
