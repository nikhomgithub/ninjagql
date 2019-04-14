import { gql } from 'apollo-boost';
//Get all authors
const getAuthors=gql`
    query{
        authors{
            name
            id
        }
    }
`;

//Get all books
const getBooks = gql`
    query{
        books {
            title
            id
        }
    }
`;

//add a book
const addBook=gql`
    mutation addBook($title:String!,$genre:String!,$authorId:ID!){
        addBook(title:$title,genre:$genre,authorId:$authorId){
            title
            id
        }
    }
`;

//get a book
const getBook=gql`
    query getBook($id:ID){
        book(id:$id){
            id
            title
            genre
            author{
                id
                name
                age
                books{
                    title
                    id
                }
            }
        }
    }
`;



export {getAuthors,getBooks,addBook,getBook};