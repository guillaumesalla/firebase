/* eslint-disable no-undef */
<<<<<<< HEAD
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
=======
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./SignIn";
import Chat from "./Chat/Chat";
>>>>>>> 70ebb4ed3b6ab59ab41391416473d1e2bbc05bd8
import Axios from "axios";

const Loading = () => (
  <div className="App-loading">
    <img src={logo} className="App-logo" alt="logo" />
  </div>
);

const Rooms = props => (
  <div className="App-rooms">
    <span>Sélectionnez une chat room :</span>
    {props.rooms.map(room => (
      <Link to={`/room/${room.id}`}>
        <span>
          {room.name} ({room.nbMessages} messages)
        </span>
      </Link>
    ))}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      token: "",
      rooms: []
    };
  }

  componentDidMount() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          console.log("Auth changed: ", user);
          if (firebase.auth().currentUser) {
            firebase
              .auth()
              .currentUser.getIdToken()
              .then(token => {
                console.log("User token : ", token);
                if (this.state.token !== token) {
                  this.setState({
                    token
                  });
                }
              });
          }
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
    this.getRooms();
  }

  getRooms() {
    Axios.get("https://europe-west1-ynovb3web.cloudfunctions.net/getRooms")
      .then(response => this.setState({ rooms: response.data.rooms }))
      .catch(error => console.error(error));
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User signed out"));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
<<<<<<< HEAD
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
                    <Users />
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
=======
            <Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <span>
              Welcome{" "}
              {this.state.user &&
                (this.state.user.displayName || this.state.user.email)}
              !
            </span>
            <a
              href="#"
              onClick={e => {
                this.signOut();
                e.preventDefault();
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </a>
          </header>
          <div class="App-body">
            {this.state.isLoading ? (
              <Loading />
            ) : this.state.user ? (
              <Switch>
                <Route path="/room/:roomId">
                  <Chat
                    messages={this.state.messages}
                    token={this.state.token}
                  />
                </Route>
                <Route path="/">
                  <Rooms rooms={this.state.rooms} />
                </Route>
              </Switch>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </Router>
>>>>>>> 70ebb4ed3b6ab59ab41391416473d1e2bbc05bd8
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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Service Demandé</th>
            <th scope="col">Service Proposé</th>
            <th scope="col">Photo</th>
          </tr>
        </thead>
        {this.state.data.map(item =>
          <tbody>
            <tr>
              <td>{item.servicedemande}</td>
              <td>{item.servicepropose}</td>
              <td><img src={item.photo} class="img-fluid" alt="Responsive image" width="100px" height="100px"></img></td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  }
}

function AddTroc() {
  return <h2>Ajouter un trocs</h2>;
}

class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [] }
  }
  componentDidMount() {
    Axios.get("https://europe-west1-trocservices-7b189.cloudfunctions.net/getUsers")
      .then(response => this.setState({ data: response.data }))
  }
  render() {
    return <div><h2>Utilisateurs</h2>
      {this.state.data.map(item => { item.name })}
    </div>
  }
}
export default App;