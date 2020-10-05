import React from 'react';
import LogIn from '../login/LogIn';

import styled from "styled-components";

const PopUpDiv = styled.div`
position: fixed;
background-color: rgba(14, 210, 245, 0.3);
width: 100%;
bottom: 0;
left: 0;
transition: all 0.3s;
`;

const SpanClose = styled.span`
text-align: center;
color: #fff;
position: absolute;
top: 10px;
right: 10px;
transition: all 0.3s;
font-size: 20px;
&:hover {
    cursor: pointer;
    color: gray;
    }
`;

function PopUp(props) {

    return (

        <PopUpDiv>
            <SpanClose onClick={() => props.notShowPopUpMethod()}>x</SpanClose>
            <LogIn logInMethod={props.logInMethod} />
        </PopUpDiv>
    );
}

export default PopUp;