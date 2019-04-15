import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))

        console.log(this.state.books);
      })
  }
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <Bookshelf books={this.state.books} />
          )} />
          <Route exact path='/search' render={() => (
            <Search books={this.state.books} />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
