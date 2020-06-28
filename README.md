# BookStore-Crud
Getting hands dirty with NodeJS, typeORM and postgres
This is a API base practice

# Prerequisites

  - Node.js and npm are essential to this setup
  - postgres (install from https://www.postgresql.org/download/)

# Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server. nodemon will automatically restart your server when you save the changes

```sh
$ cd BookStore-Crud
$ npm install -d
$ npm run serve
```


# API's
```sh
To get List of the Books
http://localhost:8000/books/
To add books
http://localhost:8000/books/add 
To edit books
http://localhost:8000/books/put/:id
with the json Example
{"name":"Harry Poter", "description":"here is some description for harry poter", "author_id":"3"}
To delete book
http://localhost:8000/books/delete/:id
for author simply replace books with authors
for Readers simply replace books with users
```

# DB Structure

Book Store is currently extended with the following Tables and column.

| Tabke | Columns |
| ------ | ------ |
| books | [id//name/description/author_id] |
| authors | [author_id/name/age] |
| readers | [user_id/name/designation] |
| readersintrust | [intrest_id/book_id/user_is] |

# Todos

 - Write MORE API

License
----

MIT


**Free Software, Hell Yeah!**


