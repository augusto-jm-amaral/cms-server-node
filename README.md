# CMS Server in Node.js

![Completion: 90%](https://img.shields.io/badge/completion-90%25-green.svg)

> A Node.js project

> Without using cms framework

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5000
npm run dev

# run tests
npm run test

# run production mode
npm start
```

### Routes

``` bash
# Get all posts
/posts GET

# Get post using id
/posts/:_id GET

# Create a post
/posts POST

# Update a post
/posts/:_id PUT

# Delete post
/posts/:_id DELETE


# Get a post using path
/:_path GET


# Get a Authorization token
/users/login POST

# Create a user
/users POST
```
### JSON structure 

``` bash
# POST structure
{
    _id: 1, 
    title: 'Post1', 
    body: 'Lorem ipsum..', 
    path: '/news/1' 
}

# USER structure
{
    _id: '123456',
    name: 'Augusto',
    email: 'augusto@email.com',
    password: '123456'
}
```
