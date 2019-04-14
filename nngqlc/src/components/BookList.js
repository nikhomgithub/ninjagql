import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooks } from '../queries/queries';
import BookDetail from './BookDetail';

class BookList extends Component {
    state = {selected: null}
    displayBooks=()=>{
        var getBooks = this.props.getBooks;
        if(getBooks.loading){
            return( <div>Loading books...</div> );
        } else {
            return getBooks.books.map(book => 
                    <li key={ book.id } onClick={(e)=>this.setState({selected:book.id})}>{ book.title }</li>
                    //{return(<li key={ book.id } onClick={(e)=>this.setState({selected:book.id})}>{ book.title }</li>)}
            )
        }
    }
    render(){
        return(
            <div>
                <h3>{this.state.selected}</h3>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
                <BookDetail bookId={this.state.selected}/>
            </div>
        );
    }
}

export default compose( 
    graphql(getBooks,{name:"getBooks"})
)(BookList);