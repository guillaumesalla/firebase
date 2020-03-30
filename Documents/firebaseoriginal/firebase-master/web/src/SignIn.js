/* eslint-disable no-undef */
import React, { useState } from "react";
import "./Connexion_style.css"
import Logo from './logo.png'
import logo from "./trocLogo.png";

const reportError = error => {
  console.error(error);
  alert(error.message);
};

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const login = () => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log("User signed in"))
      .catch(error => reportError(error));
  };
  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("User created");
        res.user
          .updateProfile({
            displayName: name
          })
          .then(() => console.log("Display name set"))
          .catch(error => reportError(error));
      })
      .catch(error => reportError(error));
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}
    >
      <div
        className="div_centrale"
      >
        <img src={Logo} alt="Logo" style={{height:'75px',width:'75px'}} />
        <br/>
        {isSignUp ? (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={evt => setName(evt.target.value)}
            class="form_style"
          />
        ) : (
            undefined
          )}
        <br/>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
          class="form_style"
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={evt => setPassword(evt.target.value)}
          class="form_style"
        />
          <br/>
        <button
            className="bouton_submit"
          onClick={() => {
            isSignUp ? createUser() : login();
          }}
        >
          {isSignUp ? "S'enregistrer" : "Se connecter"}
        </button>
          <br/>
        <a
          href="#"
          onClick={() => setIsSignUp(!isSignUp)}
          class="bouton_submit"
        >
          {isSignUp ? "Se connecter" : "S'inscrire"}
        </a>
      </div>
    </div>
  );
}

export default SignIn;