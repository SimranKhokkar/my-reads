import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import DisplayBook from './DisplayBook';

/**
 * @description - to search a book and move it to one of the shelves
 */
class SearchBook extends Component {
  /**
   * check the props passed
   */
  static propTypes = {
    moveBookToShelf: PropTypes.func.isRequired,
  }

  /**
   * state for the search component
   */
  state = {
    query: "",
    searchedBooks: {}
  }

  /**
   * @description - update the state of query when ever the search query is updated
   * @param {String} query
   */
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.value.trim()
    }))
    this.getSearchedBooks();
  }

  /**
   * @description - clear the query string or search string for a new search
   */
  clearQuery = () => {
    this.updateQuery("")
  }

  /**
   * @description - get all the books using the search API and update the state for searchedBooks
   */
  getSearchedBooks = () => {
    BooksAPI.search(this.state.query).then((searchedBooks) => {
      if (searchedBooks && !searchedBooks.error) {
        this.setState(() => ({
          searchedBooks
        }));
      }
    });
  }
  
  /**
   * @description - to move a book from the searched items to one of the shelves
   * @param {Object} book 
   * @param {String} shelf 
   */
  moveBookToShelf = (book, shelf) => {
    this.props.moveBookToShelf(book, shelf);
    this.setState((prevState) => ({
      searchedBooks: prevState.searchedBooks.filter((filteredBook) => filteredBook.id !== book.id)
    }))
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search"> Close </button></Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {(this.state.searchedBooks === {} || this.state.searchedBooks === null || this.state.searchedBooks === undefined) ?
            "" : (
              <ol className="books-grid">
                {Object.keys(this.state.searchedBooks).map((key) => (
                  <li key={this.state.searchedBooks[key].id}>
                    <DisplayBook book={this.state.searchedBooks[key]} moveBookToShelf={this.moveBookToShelf} />
                  </li>
                ))}
              </ol>
            )}
        </div>
      </div>
    )
  }
}

export default SearchBook;