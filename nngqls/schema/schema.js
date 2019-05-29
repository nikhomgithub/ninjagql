const graphql=require('graphql');
const Book=require('../models/book');
const Author=require('../models/author');

const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
}=graphql;

const BookType=new GraphQLObjectType({
  name:'BookType',
  fields:()=>({
    id:{type:GraphQLID},
    title:{type:GraphQLString},
    genre:{type:GraphQLString},
    author:{
      type:AuthorType,
      resolve(parent,args){
          return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType=new GraphQLObjectType({
  name:'AuthorType',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({authorId:parent.id})
      }
    }
  })
});

const RootQuery=new GraphQLObjectType({
  name:'RootQuery',
  fields:{
    book:{
      type:BookType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return Book.findById(args.id);
      }
    },
    author:{
      type:AuthorType,
      args:{id:{type:GraphQLID}},
      resolve(parent,args){
        return Author.findById(args.id);
      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return Book.find({});
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent,args){
        return Author.find({});
      }
    }
  }
});

const Mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addAuthor:{
      type:AuthorType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
      },
      resolve(parent,args){
        let author=new Author({
          name:args.name,
          age:args.age
        })
        return author.save();
      }
    },
    addBook:{
      type:BookType,
      args:{
        title:{type:new GraphQLNonNull(GraphQLString)},
        genre:{type:new GraphQLNonNull(GraphQLString)},
        authorId:{type:new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        let book=new Book({
          title:args.title,
          genre:args.genre,
          authorId:args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports=new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});

/*
http://localhost:5000/graphql


query{
  author(id:"5caf3df7e13dd21f0c41510d"){
    id
		name
    age
  }
}
-----------
query{
  authors{
    id
		name
    age
  }
}
-----------
query{
  book(id:"5cb1b8893e25d125f8a996cc"){
    id
    title
    genre
    author{
      name
    }
  }
}
-----------
query{
  books{
    id
    title
    genre
    author{
      name
    }
  }
}
------------
mutation{
  addBook(title:"Batman",genre:"fansy",authorId:"5caf3e2cd674c6275035ffcf"){
     id
    title
    genre
    author{
      name
    }
  }
}
---------------
  mutation{
  addAuthor(name:"Doctore",age:12){
    id
    name
    age
    books{
      title
    }
  }
}
*/
