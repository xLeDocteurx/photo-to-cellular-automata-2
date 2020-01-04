import React, {Component, Fragment} from 'react'
import P5Wrapper from './wrappers/p5'

import mySketch from './sketches/sketch'

import logo from './logo.svg'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sketch: mySketch
    }
  }

  render() {
    return (
      <Fragment>
        <P5Wrapper sketch={this.state.sketch}/>
      </Fragment>
    )
  }

}

export default App
