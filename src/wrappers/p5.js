import React, {Component} from 'react'
import p5 from 'p5'

class P5Wrapper extends Component {

    constructor(props) {
        super(props)

        this.state = {
            canvas: null,
        }

        this.doesComponentReceivedData = this.doesComponentReceivedData.bind(this)
    }

    componentDidMount() {
        this.setState({canvas: new p5(this.props.sketch, this.el)})
    }

    componentDidUpdate() {
        this.doesComponentReceivedData()
    }

    doesComponentReceivedData() {
        this.state.canvas.data = this.props.data ? this.props.data : null

        // this.setState((prevState) => ({
        //     canvas: {
        //         ...prevState.canvas,
        //         ...dataObject
        //     }
        // }))
    }

    render() {
        return (
            <div id="canva-container" ref={(el) => {this.el = el}}></div>
        )
    }
}

export default P5Wrapper