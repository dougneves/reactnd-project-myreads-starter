import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'

class BooksApp extends React.Component {
  state = { books: [], fetched: false }

  fetchBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        console.log(books)
        this.setState({ books, fetched: true })
      })
      .catch(err => window.alert(err))
  }
  componentDidMount = () => {
    this.fetchBooks()
  }
  updateMe = () => {
    this.fetchBooks()
  }
  render() {
    if (!this.state.fetched) return <div>Loading...</div>

    const currentlyReading = this.state.books.filter(
      book => book.shelf === 'currentlyReading'
    )
    const wantToRead = this.state.books.filter(
      book => book.shelf === 'wantToRead'
    )
    const read = this.state.books.filter(book => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            updateMe={this.updateMe}
            title="Currently Reading"
            books={currentlyReading}
          />
          <BookShelf
            updateMe={this.updateMe}
            title="Want To Read"
            books={wantToRead}
          />
          <BookShelf updateMe={this.updateMe} title="Read" books={read} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
