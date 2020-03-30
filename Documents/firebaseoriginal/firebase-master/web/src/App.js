/* eslint-disable no-undef */
import React, { useState } from "react";
import logo from "./trocLogo.png";
import "./App.css";
import "./Connexion_style.css"
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

  delTroc() {
    Axios.get("https://europe-west1-trocservices-7b189.cloudfunctions.net/delTroc")
  }

  delUser() {
    Axios.get("https://europe-west1-trocservices-7b189.cloudfunctions.net/delUser")
  }

  render() {
    return (
        <div className="main">
          {this.state.isLoading ? (
              <Loading />
          ) : this.state.user ? (
              <header className="App" style={{background:'#141e34'}}>
                <Router>
                  <div>
                    <nav>
                      <ul>
                        <li>
                          <Link to="/trocs"><h2 style={{color:'#2f4578',fontStyle:'bold', textAlign:'left'}}>Liste des trocs</h2></Link>
                        </li>
                        <li>
                          <Link to="/users"><h2 style={{color:'#2f4578',fontStyle:'bold', textAlign:'left'}}>Liste des utilisateurs</h2></Link>
                        </li>
                        <li style={{ listStyleType: 'none' }}>
                          <button onClick={this.signOut} className="bouton_submit" style={{alignItems:'left'}}>Se déconnecter</button>
                        </li>
                      </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                    <Switch>
                      <Route path="/trocs">
                        <Trocs />
                      </Route>
                      <Route path="/users">
                        <Users />
                      </Route>
                      <Route path="/">
                        <Trocs />
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
    return (
    <div className="troc"><h2>Trocs</h2>
      <table class="table" style={{marginLeft: 'auto',marginRight:'auto'}}>
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
              <td><button onClick={this.delTroc} className="bouton_submit">Supprimer</button></td>
            </tr>
            </tbody>
        )}
      </table>
    </div>);
  }
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
    return <div style={{backgroundColor:'#8d93b1'}}><br/><h2>Utilisateurs</h2>

      <table class="table"  style={{marginLeft: 'auto',marginRight:'auto'}}>
        <thead>
        <tr>
          <th scope="col">email</th>
          <th scope="col">nom</th>
        </tr>
        </thead>
        {this.state.data.map(item =>
            <tbody style={{textAlign:'left'}}>
            <tr>
              <td style={{paddingRight:'20px'}}>{item.email}</td>
              <td style={{paddingRight:'20px'}}>{item.name}</td>
              <td><button className="bouton_submit">Supprimer</button></td>
            </tr>
            <tr>
              <br/>
            </tr>
            </tbody>
        )}
      </table>
    </div>
  }
}
export default App;