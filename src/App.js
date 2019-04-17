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
        
        console.log(books);
      })
  }

  componentDidMount() {
    this.refresh();
  }

  async updateBookShelf(book, shelf) {
    let res = await BooksAPI.update(book, shelf)
    console.log(res);
    console.log('UPDATED');
    await this.refresh().bind(this);
  }
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => (
            <Bookshelf shelfs={this.state.shelfs} onUpdateBook={this.updateBookShelf} />
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
