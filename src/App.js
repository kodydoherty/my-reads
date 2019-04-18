import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }
  state = {
    books: [],

    shelfs: [
      {
        title: 'Currently Reading',
        books: []
      },{
        title: 'Want to Read',
        books: []
      },{
        title: 'Read',
        books: []
      },
    ]
  }

  refresh() {
    BooksAPI.getAll()
      .then((books) => {
        let cr = [];
        let wr = [];
        let r = [];

        for (let book of books) {
          if (book.shelf === 'currentlyReading') {
            cr.push(book);
          } else if (book.shelf === 'wantToRead') {
            wr.push(book);
          } else {
            r.push(book);
          }
        }

        this.setState(() => ({
          books: books,
          shelfs: [
            {
              title: 'Currently Reading',
              books: cr
            },{
              title: 'Want to Read',
              books: wr
            },{
              title: 'Read',
              books: r
            },
          ]
        }))        
      })
  }

  componentDidMount() {
    this.refresh();
  }

  async updateBookShelf(book, shelf) {
    await BooksAPI.update(book, shelf)
    await this.refresh();
  }
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <Bookshelf shelfs={this.state.shelfs} onUpdateBook={this.updateBookShelf.bind(this)} />
          )} />
          <Route exact path='/search' render={() => (
            <Search books={this.state.books} onAddBook={this.updateBookShelf.bind(this)}/>
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
