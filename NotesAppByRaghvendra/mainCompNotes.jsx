import React, { Component } from "react";
import RegistrationPage from "./registrationPage";
import LoginAuth from "./portalLogin";
import NavbarCookieAuth from "./NavbarNotes";
import HomePage from "./homePage";
import httpService from "../services/httpService";
import { Redirect, Route, Switch } from "react-router-dom";
import authPassportService from "../services/authPassportService";
import MyNotes from "./myNotes";
import AddNotes from "./addNotes";
import DeleteNote from "./deleteNote";
import "./login.css";
class MainCompWeb extends Component {
  state = {
    notes: [],
    person: {},
  };
  fetchData = async () => {
    let response = await httpService.get("/myNotes");
    let { data } = response;
    // console.log(data);
    this.setState({ notes: data });
  };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) this.fetchData();
  }

  render() {
    const { notes, person } = this.state;
    let auth = authPassportService.getToken();
    // console.log(auth);
    return (
      <>
        <NavbarCookieAuth />
        <div className="container">
          <Switch>
            <Route
              path="/registration"
              render={(props) => (
                <RegistrationPage {...props} person={person} />
              )}
            />
            <Route
              path="/login"
              render={(props) => <LoginAuth {...props} person={person} />}
            />
            <Route
              path="/home"
              render={(props) =>
                auth ? <HomePage {...props} person={person} /> : <LoginAuth />
              }
            />

            <Route
              path="/myNotes"
              render={(props) =>
                auth ? <MyNotes {...props} notes={notes} /> : <LoginAuth />
              }
            />
            <Route
              path="/note/:mode/:index"
              render={(props) =>
                auth ? <AddNotes {...props} notes={notes} /> : <LoginAuth />
              }
            />
            <Route
              path="/delNote/:index"
              render={(props) =>
                auth ? <DeleteNote {...props} /> : <LoginAuth />
              }
            />

            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </>
    );
  }
}
export default MainCompWeb;
