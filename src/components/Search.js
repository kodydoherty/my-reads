import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI'
import Book from './Book';

class Search extends React.Component {

   state = {
     books: []
   }

   searchTerms = ['Android', 'Art', 'Artificial Intelligence', 
   'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 
   'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 
   'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling',
   'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 
   'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 
   'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 
   'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 
   'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 
   'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 
   'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 
   'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 
   'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 
   'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

   capitalize(word) {
     return word.charAt(0).toUpperCase() + word.slice(1);
   }

   onChangeSearch(event) {
      event.preventDefault();
      let searchTerm = event.target.value;
      let search = searchTerm.split(' ');
      let capitilize_search_term
      if (search.length === 2) {
        capitilize_search_term = `${this.capitalize(search[0])} ${this.capitalize(search[1])}` 
      } else {
        capitilize_search_term = this.capitalize(searchTerm);
      }
      if (this.searchTerms.includes(capitilize_search_term)) {
        BooksAPI.search(capitilize_search_term)
          .then((books) => {
            let updpated_books = []
            for (let book of books) {
              let found = false;
              for (let b of this.props.books) {
                if (book.title === b.title) {
                  found = true;
                  book['shelf'] = b.shelf;
                  updpated_books.push(book)
                }
              }
              if (!found) {
                updpated_books.push(book)
              }
            }
            this.setState({
              books: updpated_books
            })
          }).catch((err) => {
            console.log(err);
          })
      } else {
        this.setState({
          books: []
        })
      }
   }

    render() {
        return  (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to={'/'}><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={this.onChangeSearch.bind(this)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"> {
                  this.state.books.map( (book, i) => {
                    return (
                        <Book 
                            book={book} 
                            key={book.id}
                            onUpdateBook={this.props.onAddBook.bind(this)}>
                        </Book>
                    )
                  })
              }
              
              </ol>
            </div>
          </div>
        );  
    }
}
export default Search
