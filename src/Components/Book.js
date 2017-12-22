import React from 'react'
import * as BooksAPI from '../BooksAPI'

class Books extends React.Component {
  shelfChanged = (bookId, shelf, title) => {
    BooksAPI.update({ id: bookId }, shelf)
      .then(res => {
        if (this.props.updateMe) this.props.updateMe()
        window.alert(`Book ${title} moved to your shelf ${shelf}!`)
      })
      .catch(err => window.alert(err))
  }
  render = () => {
    const book = this.props.book

    //avoid books without authors to break this component
    const authors = book.author || []

    console.log(book.shelf)
    const optionValue = book.shelf || 'none'

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={optionValue}
              onChange={e =>
                this.shelfChanged(book.id, e.target.value, book.title)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))}
      </div>
    )
  }
}

export default Books
