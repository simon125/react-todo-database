import React, { Component } from 'react'
import './App.css'

import TextField from 'material-ui/TextField';


class App extends Component {

  state = {
    counter: 0,
    text: ''

  }

  componentDidMount() {

    fetch('https://jfddl4-sandbox.firebaseio.com/szymon/counter/.json')
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => this.setState({ counter: myJson }))

      fetch('https://jfddl4-sandbox.firebaseio.com/szymon/text/.json')
      .then(function (response) {
        return response.json();
      })
      .then((myJson) => this.setState({ text: myJson }))




  }



  decHandler = () => {
    this.setState({ counter: this.state.counter - 1 }, this.saveToDb)
  }

  increaseHandler = () => {
    this.setState({ counter: this.state.counter + 1 }, this.saveToDb)
  }
  changeText = (newValue) => {
    this.setState({text: newValue })
   
  }

  saveToDb = () => fetch('https://jfddl4-sandbox.firebaseio.com/szymon/counter/.json',
    {
      method: 'PUT',
      body: JSON.stringify(this.state.counter)
    })

  postText = () => fetch('https://jfddl4-sandbox.firebaseio.com/szymon/text/.json',
  {
    method: 'PUT',
    body: JSON.stringify(this.state.text)
  }) 

  render() {
    return (
      <div className="App">
      <h2>Text:{this.state.text}</h2>
      <TextField
      hintText="Type text"
      onChange={(event, newValue) => this.changeText(newValue)}
      value={this.state.text}
    />
    <button
     className='App-btn App-btn-minus' 
     onClick={() => this.postText()}
     
     >Post text</button>
      

        <h1>{this.state.counter}</h1>
        <button className='App-btn App-btn-minus' onClick={() => this.decHandler()}>-</button>
        <button className='App-btn App-btn-plus' onClick={() => this.increaseHandler()}>+</button>
      </div>
    )
  }
}

export default App;
