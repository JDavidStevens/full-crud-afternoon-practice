import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      input: "",
      color: ""
    };
  }

  componentDidMount() {
    axios.get("/api/dog").then(results => {
      console.log(results.data);
      this.setState({ list: [...results.data] });
    });
  }

  handleChange(input) {
    this.setState({ input: input });
  }

  handleClick() {
    axios
      .post("/cat", { input: this.state.input, color: this.state.color })
      .then(results => {
        this.setState({ list: results.data });
      });
  }

  handleDelete(index) {
    axios.delete(`/pizza-crumbs/${index}`).then(results => {
      this.setState({ list: [...results.data] });
    });
  }

  handleUpdate(index) {
    axios
      .put(`/pizza-crumbs/${index}`, { name: this.state.input })
      .then(results => {
        this.setState({ list: [...results.data] });
      });
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.text}</p>
        <input
          placeholder="puttin in some text yo"
          onChange={e => this.handleChange(e.target.value)}
        />
        <input
          placeholder="color"
          onChange={e => this.setState({ color: e.target.value })}
        />
        <button onClick={() => this.handleClick()}>
          send to server via post
        </button>
        {this.state.list.map((val, i) => {
          return (
            <div>
              <div>{val.name}</div>
              <button onClick={() => this.handleUpdate(i)}>Update</button>
              <button onClick={() => this.handleDelete(i)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
