import React, { Component } from 'react'
import { graphql,compose } from 'react-apollo';
import { getBook } from '../queries/queries';

class BookDetail extends Component {
 
  displayBookDetail(){
    const { book } = this.props.data;
    if(book){
        return(
            <div>
                <h2>{ book.id }</h2>
                <h2>{ book.title }</h2>
                <p>{ book.genre }</p>
                <p>{ book.author.name }</p>
                <p>All books by this author:</p>
                
            </div>
        );
    } else {
        return( <div>No book selected...</div> );
    }
}


  render() {
    return (
      <div id="book-details">
        {this.displayBookDetail()}
      </div>
    );
  }
}

export default graphql(getBook, {
  options: (props) => {
      return {
          variables: {
              id: props.bookId
          }
      }
  }
})(BookDetail);