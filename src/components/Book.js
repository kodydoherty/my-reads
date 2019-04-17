import React from 'react'
import '../App.css'
class Book extends React.Component {
    // change(event) {
    //     this.props.onUpdateBook(this.props.book, event.target.value)
    // }
    render() {

        let change = (event) => {
            this.props.onUpdateBook(this.props.book, event.target.value)
        }
        
        const { book } = this.props;
        
        return  (
            <li>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                    <select onChange={change} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" >Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read" >Read</option>
                        <option value="none" >None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    this.props.book.authors.map( (author, index) => {
                        return (
                            <div className="book-authors" key={index}>{author}</div>
                        )
                    })
                }
                
                </div>
            </li>       
             
        )
    }
}

export default Book
