import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from '../BooksAPI'

class BooksApp extends React.Component {
  state = { books: [], fetched: false }
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        console.log(books)
        this.setState({ books, fetched: true })
      })
      .catch(err => window.alert(err))
  }
  render() {
    if (!this.state.fetched) return <div>Loading...</div>

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf books={this.state.books} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
