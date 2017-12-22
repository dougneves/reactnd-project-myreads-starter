import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends React.Component {
  state = { books: [], query: '', fetching: false, fetchPromisse: null }

  queryChanged = e => {
    let query = e.target.value
    if (!query) return this.setState({ books: [], fetching: false, query: '' })
    this.setState({ query, fetching: true })

    BooksAPI.search(query)
      .then(books => {
        //avoid older searches to resolve before last search
        if (this.state.query !== query) return

        if (!books || books.error) {
          return this.setState({ books: [], fetching: false })
        }
        this.setState({ books, fetching: false })
      })
      .catch(err => this.setState({ books: [], fetching: false }))
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={'/'}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.queryChanged}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.fetching ? <div>Loading...</div> : <div />}
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
