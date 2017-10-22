import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Components/Home'
import Portfolio from './Components/Portfolio'
import About from './Components/About'
import Contact from './Components/Contact'
import Header from './Components/Partials/Header'
import Footer from './Components/Partials/Footer'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeLoader: false,
      videos: []
    }
  }
  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
   
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/portfolio'  component={Portfolio}/>
          <Route exact path='/contact' component={Contact} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
