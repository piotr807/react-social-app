import React from 'react';

import styled from "styled-components";

const LikesDiv = styled.div`
position: absolute;
bottom: 20px;
right: 5px;
`;

const SpanIcon = styled.i`
text-align: center;
color: rgb(14, 210, 245);
&:hover {
cursor: pointer;
}
`;

function Likes(props) {

    let object = props.postObj;
    let user = props.loggedUser;
    let liked = false;

    if (object.likes.some(like => like.id === user.id)) {
        liked = true;
    } else {
        liked = false;
    };

    return (

        <LikesDiv>     
                {!liked ? <SpanIcon onClick={() => props.addLikeMethod(object.id)} className="fas fa-thumbs-up"></SpanIcon> :
                <SpanIcon onClick={() => props.removeLikeMethod(object.id)} className="fas fa-thumbs-down"></SpanIcon> }
        </LikesDiv>
    );
}

export default Likes;