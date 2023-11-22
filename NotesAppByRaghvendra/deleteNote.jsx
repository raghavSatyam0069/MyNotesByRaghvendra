import React, { Component } from "react";
import http from "../services/httpService.js";
class DeleteNote extends Component {
  async componentDidMount() {
    const { index } = this.props.match.params;
    // console.log(index);
    let response = await http.deleteApi(`/delNote/${index}`);
    window.location = "/myNotes";
  }
  render() {
    return "";
  }
}
export default DeleteNote;
