import React, { Component } from 'react'
import './App.css'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {

  state = {
    newTask: '',
    tasks: null
  }

  componentDidMount() {

    fetch('https://jfddl4-sandbox.firebaseio.com/szymon/tasks/.json')
      .then((response) => response.json())
      .then((myJson) => {
        const dataInArray = (
          Object.entries(myJson)
            .map(el => ({
              key: el[0],
              value: el[1]
            }))
        )

        this.setState({ tasks: dataInArray })
      })
  }




  newTaskHandler = (event, newValue) => {

    this.setState({ newTask: newValue })

  }


  saveNewTask = () => {

    fetch('https://jfddl4-sandbox.firebaseio.com/szymon/tasks/.json', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(this.state.newTask)
    })


  }

  render() {
    return (
      <div className="App">

        <TextField
          hintText={'Type task'}
          value={this.state.newTask}
          onChange={this.newTaskHandler}
        />
        <RaisedButton
          label={'Save'}
          onClick={this.saveNewTask}
        />
        {
          !this.state.tasks ? 
          'Ładowanie' 
          : 
          this.state.tasks.map(
            task => (
            <div 
            key={task.key}
            onClick={}
            > {task.value}</div> ))



        }

      </div>
    )
  }
}

export default App
