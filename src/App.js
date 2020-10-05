import React, { useState, useEffect } from 'react';

import axios from 'axios';
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Nav from './app/Nav';
import Home from './home/Home';
import SignUp from './signup/SignUp';
import LogIn from './login/LogIn';

const AppDiv = styled.div.attrs(() => ({
  className: "App"
}))`
text-align: center;
`;

const Header = styled.header`
background-color: rgb(14, 210, 245);
min-height: 25vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: white;
`;

const Title = styled.h1`
font-weight: 500;
`;

function App() {

  const [logState, setLogState] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {

    let storUser = JSON.parse(localStorage.getItem('storUser'));


    if (storUser !== null) {
      setLogState(true);
      setLoggedUser(storUser);
    } else {
      setLogState(false);
      setLoggedUser('');
    }
  }, []);

  const logIn = (data) => {

    localStorage.clear();
    localStorage.setItem('storUser', JSON.stringify(data));
    setLoggedUser(data);
    setLogState(true);

  };

  const logOut = () => {

    let logOutUser = loggedUser;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + loggedUser.jwt_token
    }

    axios.post(
      'https://akademia108.pl/api/social-app/user/logout', JSON.stringify(logOutUser),
      { 'headers': headers })
      .then((req) => {
        setLoggedUser('');
        setLogState(false);
        localStorage.clear();

      }).catch((error) => {
        console.error(error);
      })


  };

  return (
    <Router>
      <AppDiv>
        <Header className="App-header">
          <Title>Social App</Title>
        </Header>
        <Nav logState={logState} logOutMethod={logOut} />
        <Switch>
            <Route path="/react-social-app" exact>
              <Home key={`${logState}`} isLogged={logState} loggedUser={loggedUser} logInMethod={logIn} />
            </Route>
            <Route path="/react-social-app/signup" exact>
              <SignUp />
            </Route>
            <Route path="/react-social-app/login" exact>
              {logState ? <Redirect to="/react-social-app" /> : <LogIn logInMethod={logIn} />}
            </Route>
          </Switch>
      </AppDiv>
    </Router >
  );
}

export default App;
