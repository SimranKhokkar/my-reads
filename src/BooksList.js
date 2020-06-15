import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DisplayBook from './DisplayBook';

/**
 * @description - to display all different shelves and the books that belong to those shelves respectively
 */
class BooksList extends Component {

  /**
   * check the type of props 
   */
  static propTypes = {
    books: PropTypes.object.isRequired,
    moveBookToShelf: PropTypes.func.isRequired,
  }
  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(this.props.books).map((key) => (
              <div className="bookshelf" key={key}>
                {key === 'currentlyReading' ? (
                  <h2 className="bookshelf-title">Currently Reading</h2>
                ) : key === 'wantToRead' ? (
                  <h2 className="bookshelf-title">Want To Read</h2>
                ) : (
                      <h2 className="bookshelf-title">Read</h2>
                    )}
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.props.books[key].map((book) => (
                      <li key={book.id}>
                        <DisplayBook book={book} moveBookToShelf={this.props.moveBookToShelf} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button> Add a book </button></Link>
        </div>
      </div>
    )
  }
}

export default BooksList;