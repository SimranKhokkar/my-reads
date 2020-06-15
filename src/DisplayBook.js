import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description - function to display a particular book 
 * @param {Object} props
 * @returns - HTML to display a single book 
 */
const DisplayBook = (props) => {
  DisplayBook.propTypes = {
    book: PropTypes.object.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
  }
  
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + props.book.imageLinks.thumbnail + ")" }}></div>
        <div className="book-shelf-changer">
          <select defaultValue="move" onChange={(e) => props.moveBookToShelf(props.book, e.target)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors ? props.book.authors[0] : "Anonymuous"}</div>
    </div>
  )
}

export default DisplayBook;