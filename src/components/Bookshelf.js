import React from 'react'
import '../App.css'
import  Book from './Book';

class Bookshelf extends React.Component {

    render() {
        const { shelfs, onUpdateBook } = this.props;

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
                                                    onUpdateBook={onUpdateBook}>
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
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
                </div>
        )
    }
}

export default Bookshelf
