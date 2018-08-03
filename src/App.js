import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './BooksList'
import BooksSearch from './BooksSearch'
import './App.css'

class BooksApp extends React.Component {
 
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  state = {
      books: []
  }

  handlshelf = (book, shelf) => {
    this.setState(state => ({
      books: state.books.map((bookmap) => {
          if (bookmap.id === book.id) {
              bookmap.shelf = shelf
        }

          return bookmap
      })
    }))

   BooksAPI.update(book, shelf).then((response) => {

    })
  }


  render() {
    const { books } = this.state

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            books={books}
                    onUpdateShelf={this.handlshelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
                <BooksSearch
            currentBooks={books}
                    onUpdateShelf={this.handlshelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((response) => {
        if (response.installing) {
            console.log("installing");
        } else if (response.waiting) {
            console.log("waiting");
        } else if (response.active) {
            console.log("active");
        }
        console.log("success");

    }
    ).catch((error) => {

        console.log("fail" + error);
    })
}