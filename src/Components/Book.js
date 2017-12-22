import React from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: props.book.shelf || 'none' }
  }
  shelfChanged = (bookId, shelf, title) => {
    this.setState({ status: shelf })
    BooksAPI.update({ id: bookId }, shelf)
      .then(res => {
        if (this.props.updateMe) this.props.updateMe()
        window.alert(`Book ${title} moved to your shelf ${shelf}!`)
      })
      .catch(err => window.alert(err))
  }
  componentDidMount = () => {
    //if the book did not have shelf info, get book information again using with the get API
    if (!this.props.book.shelf)
      BooksAPI.get(this.props.book.id)
        .then(res => {
          this.setState({ status: res.shelf || 'none' })
        })
        .catch(err => window.alert(err))
  }
  render = () => {
    const book = this.props.book

    //avoid books without authors to break this component
    const authors = book.authors || []

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
              value={this.state.status}
              onChange={e =>
                this.shelfChanged(book.id, e.target.value, book.title)}
            >
              <option value="default" disabled>
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

export default Book
