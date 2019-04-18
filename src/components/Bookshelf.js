import React from 'react'
import '../App.css'
import  Book from './Book';
import {Link} from 'react-router-dom';

class Bookshelf extends React.Component {

    render() {
        const { shelfs } = this.props;

        return  (
                <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    { shelfs ? 
                        shelfs.map( (shelf, index) => {

                            return (
                                <div className="bookshelf" key={index}>
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid"> 
                                    {
                                        shelf.books.map( (book, i) => {
                                            return (
                                                <Book 
                                                    book={book} 
                                                    key={book.id}
                                                    onUpdateBook={this.props.onUpdateBook.bind(this)}>
                                                </Book>
                                            )
                                        })
                                    }
                    
                                    </ol>
                                </div>
                                </div>
                            )
                        }) : <div></div>
                    }
                   
                </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button type='button'>Add a book</button>
                    </Link>
                    
                </div>
                </div>
        )
    }
}

export default Bookshelf
