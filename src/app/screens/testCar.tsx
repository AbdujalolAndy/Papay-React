// @ts-nocheck
import { Component, ReactNode } from "react";

class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: "Ferrari",
            model: "G-77",
            year: 1976,
            color: "red"
        }
    }
    componentDidMount(): void {
        console.log("ran componentDidMount")
    }
    componentWillUnmount(): void {

    }
    componentDidUpdate() {

    }
    changeColor() {
        this.state.color === "blue" ? this.setState({ color: "red" }) : this.setState({ color: "blue" })

    }
    render() {
        return (
            <div>
                <h1>My Car</h1>
                <p>My car's brand is {this.state.brand},and it is {this.state.color} {this.state.model} - from {this.state.year}</p>
                <button onClick={() => this.changeColor()}>Change color</button>
            </div>
        )
    }
}

export default Car;