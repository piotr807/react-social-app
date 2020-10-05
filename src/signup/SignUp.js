import React, { useState } from 'react';

import axios from 'axios';
import styled from "styled-components";

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
  
    &.wrong-email {
      border-bottom: 1px solid red;
    }
  
    &.wrong-pass {
      border-bottom: 1px solid red;
    }
  
    &.wrong-pass-conf {
      border-bottom: 1px solid red;
    }
  
    &.gray-background {
      background-color: lightgray;
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

    &.signing-info-ok {
      color: green;
    }

    &.signing-info-notok {
      color: red;
    }

    &.wrong-name {
      display: block;
    }

    &.wrong-email {
      display: block;
    }

    &.wrong-pass {
      display: block;
    }

    &.wrong-pass-conf {
      display: block;
    }

    &.signing-info-ok {
      display: block;
    }

    &.signing-info-notok {
      display: block;
    }
`;

function SignUp(props) {

  let _inputUser;
  let _inputEmail;
  let _inputPass;
  let _inputPassConf;
  let emailChar = /\S+@\S+\.\S+/;
  let numChar = /\d/;
  let specChar = /[!@#$%]/;

  const [cssWrongName, setCssWrongName] = useState('');
  const [cssWrongEmail, setCssWrongEmail] = useState('');
  const [cssWrongPass, setCssWrongPass] = useState('');
  const [cssWrongPassConf, setCssWrongPassConf] = useState('');
  const [cssSigningInfo, setCssSigningInfo] = useState('');
  const [signingInfo, setSigningInfo] = useState('');
  const [cssGrayBackground, setCssGrayBackground] = useState('');

  const validateEmail = (email) => {
    return emailChar.test(email)
  };

  const hasNumber = (myString) => {
    return numChar.test(myString);
  };

  const hasSpecChar = (myString) => {
    return specChar.test(myString);
  };

  const formValidate = (event) => {
    event.preventDefault();

    let error = false;

    setCssGrayBackground('');

    if (_inputUser.value.trim().length < 4) {
      error = true;
      setCssWrongName('wrong-name');
    } else setCssWrongName('');

    if (_inputEmail.value.trim() === '' || !validateEmail(_inputEmail.value)) {
      error = true;
      setCssWrongEmail('wrong-email');
    } else setCssWrongEmail('');

    if (_inputPass.value.trim() === '' || _inputPass.value.trim().length < 6 || !hasNumber(_inputPass.value) || !hasSpecChar(_inputPass.value)) {
      error = true;
      setCssWrongPass('wrong-pass');
    } else setCssWrongPass('');

    if (_inputPassConf.value.trim() === '' || _inputPass.value.trim() !== _inputPassConf.value.trim()) {
      error = true;
      setCssWrongPassConf('wrong-pass-conf');
    } else setCssWrongPassConf('');

    if (!error) {
      registerUser();
    }
  };

  const registerUser = () => {

    setCssGrayBackground('');
    setCssSigningInfo('');

    let newUser = {
      username: _inputUser.value,
      email: _inputEmail.value,
      password: _inputPass.value
    }

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    axios.post(
      'http://akademia108.pl/api/social-app/user/signup',
      JSON.stringify(newUser),
      { 'headers': headers })
      .then((req) => {

        if (req.data.signedup) {
          setCssSigningInfo('signing-info-ok');
          setCssGrayBackground('gray-background')
          setSigningInfo('You are signed!');
      
        }
        else {
          setCssSigningInfo('signing-info-notok');
          let usernameMess = req.data.message.username;
          let emailMess  = req.data.message.email;
          
          if (usernameMess === undefined) usernameMess = '';
          if (emailMess === undefined) emailMess = '';
          
          setSigningInfo(`${usernameMess} ${emailMess}`)
  
        };

        console.log(req.data.signedup);
      }).catch((error) => {
        console.error(error);
      })

  };

  return (
    <div className="signUp">
      <SignUpForm onSubmit={formValidate}>
        <Title>Sign Up Site</Title>
        <Label>
          Name:
        </Label>
        <Input className={`${cssWrongName} ${cssGrayBackground}`} ref={(data) => _inputUser = data} type="text" />
        <Paragraph className={cssWrongName}>Name can't be empty field and should contain at least 4 characters!</Paragraph>
        <Label>
          E-mail:
        </Label>
        <Input className={`${cssWrongEmail} ${cssGrayBackground}`} ref={(data) => _inputEmail = data} type="email" />
        <Paragraph className={cssWrongEmail}>Incorrect E-mail address!</Paragraph>
        <Label>
          Password:
        </Label>
        <Input className={`${cssWrongPass} ${cssGrayBackground}`} ref={(data) => _inputPass = data} type="password" />
        <Paragraph className={cssWrongPass}>Password can't be empty field and should contain at least 6 characters, 1 digit and 1 special character!</Paragraph>
        <Label>
          Confirm password:
        </Label>
        <Input className={`${cssWrongPassConf} ${cssGrayBackground}`} ref={(data) => _inputPassConf = data} type="password" />
        <Paragraph className={cssWrongPassConf}>Password is not the same!</Paragraph>
        <InputSub type="submit" value="Submit" className="submit" />
        <Paragraph className={cssSigningInfo}>{signingInfo}</Paragraph>
      </SignUpForm>
    </div>
  );
}

export default SignUp;