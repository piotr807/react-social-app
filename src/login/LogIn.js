import React, { useState } from 'react';

import axios from 'axios';
import styled from "styled-components";

import { Link } from "react-router-dom";

const SignUpForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 350px;
  margin: 0 auto;
  background-color: rgb(14, 210, 245);
  padding: 30px 70px;
`;

const Title = styled.h2`
  margin: 10px auto;
  color: #fff;
  font-size: 30px;
  font-weight: 500;
`;

const Label = styled.label`
  flex-basis: 100%;
  text-align: start;
  color: #fff;
  margin: 5px 0;
  font-size: 18px;
  margin-top: 10px;
`;

const Input = styled.input`
  flex-basis: 100%;
  text-align: start;
  border: none;
  height: auto;
  font-size: 15px;
  padding: 5px 5px;

  &.wrong-name {
    border-bottom: 1px solid red;
  }

  &.wrong-pass {
    border-bottom: 1px solid red;
  }
`;

const InputSub = styled.input`
  flex-basis: 30%;
  text-align: center;
  margin: 25px auto;
  background-color: #fff;
  border-radius: 40px;
  border: none;
  padding: 10px 30px;
  color: gray;
  outline: 0;
  font-size: large;
  transition: all 0.3s;
  cursor: pointer;

 &:hover {
  background-color: gray;
  color: #fff;
 }
`;

const Paragraph = styled.p`
  flex-basis: 100%;
  font-size: smaller;
  color: red;
  text-align: left;
  margin: 0;
  display: none;

  &.login-info {
    display: block;
  }

  &.wrong-name {
    display: block;
  }

  &.wrong-pass {
    display: block;
  }
`;

const Linked = styled(Link)`
text-decoration: none;
flex-basis: 100%;
margin-top: 5px;
`;

const ParLink = styled.p`
text-transform: uppercase;
color: #fff;
margin: 0;
`;



function LogIn(props) {

  let _inputUser;
  let _inputPass;

  const [cssWrongName, setCssWrongName] = useState('');
  const [cssWrongPass, setCssWrongPass] = useState('');
  const [loginInfo, setLoginInfo] = useState('');
  const [cssLoginInfo, setCssLoginInfo] = useState('');

  const formValidate = (event) => {
    event.preventDefault();

    let error = false;

    if (_inputUser.value.trim() === '') {
      error = true;
      setCssWrongName('wrong-name');
    } else setCssWrongName('');

    if (_inputPass.value.trim() === '' || _inputPass.value.trim().length < 4) {
      error = true;
      setCssWrongPass('wrong-pass');
    } else setCssWrongPass('');

    if (!error) {
      logUser();
    }

  };

  const logUser = (event) => {

    setCssLoginInfo('');
    let newUser = {
      username: _inputUser.value,
      password: _inputPass.value,
      ttl: 3600
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    axios.post(
      'https://akademia108.pl/api/social-app/user/login',
      JSON.stringify(newUser),
      { 'headers': headers })
      .then((req) => {

        if (!req.data.error) {
          props.logInMethod(req.data);


        }
        else {
          setCssLoginInfo('login-info');
          setLoginInfo('Wrong username or password!');
          console.log(req.data)
        };

      }).catch((error) => {
        console.error(error);
      })

  };

  return (
    <div className="logIn">
      <SignUpForm onSubmit={formValidate}>
        <Title>Login</Title>
        <Label>
          Name:
          </Label>
        <Input className={cssWrongName} ref={(data) => _inputUser = data} type="text" />
        <Paragraph className={cssWrongName}>Username is required!</Paragraph>
        <Label>
          Password:
          </Label>
        <Input className={cssWrongPass} ref={(data) => _inputPass = data} type="password" />
        <Paragraph className={cssWrongPass}>Password is required, min 4 characters!</Paragraph>
        <InputSub type="submit" value="Login" className="submit" />
        <Paragraph className={cssLoginInfo}>{loginInfo}</Paragraph>
        <Linked to='/signup'>
          <ParLink>Sign Up Now!</ParLink>
        </Linked>
      </SignUpForm>

    </div>
  );
}

export default LogIn;