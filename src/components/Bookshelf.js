import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import  Book from './Book';

class Bookshelf extends React.Component {

    render() {

        let bookshelfs = [{
            title: 'Currently Reading',
            books: [{
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                pic: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
            }]
        }, {
            title: 'Want to Read',
            books: []
        }, {
            title: 'Read',
            books: []
        }]

        return  (
                <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    {
                        bookshelfs.map( shelf => {

                            return (
                                <div className="bookshelf">
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid"> 
                                    {
                                        shelf.books.map( book => {
                                            return (
                                                <Book book={book}></Book>
                                            )
                                        })
                                    }
                    
                                    </ol>
                                </div>
                                </div>
                            )
                        })
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
