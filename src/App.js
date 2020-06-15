import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import BooksList from './BooksList';
import SearchBook from './SearchBook';

class BooksApp extends React.Component {
  /** state to store all the books for My Reads*/
  state = {
    books: {
      currentlyReading: [],
      read: [],
      wantToRead: []
    }
  }

  /**
   * @description - To get all books using the BokksAPI and set the state according to the book shelves
   */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      const result = books.reduce((res, currentValue) => {
        (res[currentValue['shelf']] = res[currentValue['shelf']] || []).push(currentValue);
        return res;
      }, {});
      this.setState(() => ({
        books: result
      }))
    })
  }

  /**
   * @description - To get all books and set the state when the Application is loaded
   */
  componentDidMount() {
    this.getAllBooks();
  }

  /**
   * @description - To move a book from one shelf to another
   * @param {Object} book 
   * @param {String} shelf 
   * @returns - updated state
   */
  moveBookToShelf = (book, shelf) => {
    const category = shelf.value;
    BooksAPI.update(book, category).then((response) => {
      if (response && !response.error) {
        // if the book is being added after search, it may not have the field shelf
        if (book.shelf !== undefined) {
          // the same method getAllBooks can also be used to update the state
          this.setState((prevState) => ({
            books: {
              ...prevState.books,
              [book.shelf]: prevState.books[book.shelf].filter((bookData) => bookData.id !== book.id),
              [category]: prevState.books[category].concat([book])
            }
          }))
        } else {
          // update the state with the book added from the search
          this.getAllBooks();
          // this.setState((prevState) => ({
          //   books: {
          //     ...prevState.books,
          //     [category]: prevState.books[category].concat([book])
          //   }
          // }))
        }
      }
    }).catch();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksList books={this.state.books} moveBookToShelf={this.moveBookToShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBook moveBookToShelf={this.moveBookToShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
