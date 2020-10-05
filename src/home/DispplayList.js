import React from 'react';
import AddPost from './AddPost';
import Likes from './Likes'

import styled from "styled-components";

const PostDiv = styled.div`
background-color: rgb(14, 210, 245);
flex-basis: ${(props) => props.logState ? '80%' : '100%'};
`;

const Title = styled.h2`
margin: 20px 0;
color: #fff;
font-size: 30px;
font-weight: 500;
`;

const PostUl = styled.ul`
background-color: rgb(14, 210, 245);
text-align: left;
list-style: none;
margin: 0;
padding: 0;
`;

const PostLi = styled.li`
background-color: #fff;
text-align: left;
list-style: none;
margin-bottom: 5px;
padding: 20px 30px;
font-size: 14px;
position: relative;
`;

const PostSpan = styled.span`
display: block;
font-size: 14px;
color: darkgray;
margin-bottom: 10px;
`;

const PostPar = styled.p`
color: gray;
margin: 0;
`;

const SpanRemove = styled.span`
text-align: center;
color: gray;
position: absolute;
top: 5px;
right: 10px;
opacity: 0;
transition: all 0.3s;
font-size: 20px;
&:hover {
    cursor: pointer;
    opacity: 1;
    }
`;

const SpanLikes = styled.span`
text-align: center;
color: rgb(14, 210, 245);
position: absolute;
bottom: 5px;
right: 10px;
`;

function DisplayList(props) {

    let postList = props.postList;

    let liElements = postList.map((postObj) => {

        let date = new Date(Date.parse(postObj.created_at));
        let postDay = date.getDate();
        if (postDay < 10) {
            postDay = `0${postDay}`;
        }

        let postMonth = date.getMonth();
        if (postMonth < 10) {
            postMonth = `0${postMonth}`;
        }

        let postHours = date.getHours();
        if (postHours < 10) {
            postHours = `0${postHours}`;
        }

        let postMinutes = date.getMinutes();
        if (postMinutes < 10) {
            postMinutes = `0${postMinutes}`;
        }

        let postSeconds = date.getSeconds();
        if (postSeconds < 10) {
            postSeconds = `0${postSeconds}`;
        }

        return (
            <PostLi key={postObj.id}>
                <PostSpan className="postTime">{`${postDay}-${postMonth}-${date.getFullYear()}, ${postHours}:${postMinutes}:${postSeconds}, ${postObj.user.username.charAt(0).toUpperCase() + postObj.user.username.slice(1)}`}</PostSpan>
                <PostPar className="postContent">{postObj.content}</PostPar>
                {props.isLogged ? <Likes isLogged={props.isLogged} addLikeMethod={props.addLikeMethod} removeLikeMethod={props.removeLikeMethod} postObj={postObj} loggedUser={props.loggedUser} /> : null}
                {props.isLogged && props.loggedUser.id === postObj.user.id ? <SpanRemove onClick={() => props.removePostMethod(postObj.id)}>x</SpanRemove> : null}
                <SpanLikes>{postObj.likes.length}</SpanLikes>
            </PostLi>
        );
    })

    return (

        <PostDiv logState={props.isLogged}>
            <Title>Our Posts</Title>
            {props.isLogged ? <AddPost addNewPostMethod={props.addNewPostMethod} /> : null}
            <PostUl className="PostList">
                {liElements}
            </PostUl>
        </PostDiv>
    );
}

export default DisplayList;