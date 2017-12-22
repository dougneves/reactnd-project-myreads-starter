import React from 'react'
import { Route } from 'react-router-dom'
import BooksList from './Components/BooksList'
import Search from './Components/Search'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" component={BooksList} />
      </div>
    )
  }
}

export default BooksApp
