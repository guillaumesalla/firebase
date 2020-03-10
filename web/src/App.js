/* eslint-disable no-undef */
import React, { useState } from "react";
import logo from "./trocLogo.png";
import "./App.css";
import SignIn from "./SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Axios from "axios";

const Loading = props => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
  </header>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true
    };
  }

  componentDidMount() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          console.log("Auth changed: ", user);
          if (user) {
            this.setState({ user, isLoading: false });
          } else {
            this.setState({ isLoading: false, user: null });
          }
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out"));
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.user ? (
          <header className="App-header">
            <Router>
              <div>
                <nav>
                  <ul>
                    <li>
                      <Link to="/trocs">Liste des trocs</Link>
                    </li>
                    <li>
                      <Link to="/addtroc">Ajouter un troc</Link>
                    </li>
                    <li>
                      <Link to="/users">Liste des utilisateurs</Link>
                    </li>
                    <li>
                      <button onClick={this.signOut}>Sign Out</button>
                    </li>
                  </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/trocs">
                    <Trocs />
                  </Route>
                  <Route path="/addtroc">
                    <AddTroc />
                  </Route>
                  <Route path="/users">
                    <GetUsers />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </header>
        ) : (
              <SignIn />
            )}
      </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

class Trocs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount() {
    Axios.get("https://europe-west1-trocservices-7b189.cloudfunctions.net/getTrocs")
      .then(response => this.setState({ data: response.data }))
  }
  render() {
    return <div><h2>Trocs</h2>
      {
        this.state.data.map(item => <div> {item.photo} </div>)
      }
    </div>;
  }

}

function AddTroc() {
  return <h2>Ajouter un trocs</h2>;
}

function GetUsers() {
  return <h2>Liste des users</h2>;
}

export default App;