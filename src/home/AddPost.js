import React, {useState} from 'react';

import styled from "styled-components";

const AddPostDiv = styled.div`
background-color: rgb(14, 210, 245);
flex-basis: 100%;
text-align: right;
`;

const PostContent = styled.textarea`
background-color: #fff;
padding: 10px;
margin: 0 auto;
font-size: 14px;
color: gray;
width: 100%;
height: 100px;
border: 0;
outline: 0;
box-sizing: border-box;
`;

const AddPostBtn = styled.button`
display: inline-block;
background-color: #fff;
border: none;
padding: 10px 20px;
margin-bottom: 4px;
color: gray;
outline: 0;
transition: all 0.3s;
cursor: pointer;
font-weight: 500;
font-size: 15px;

&:hover {
background-color: gray;
color: #fff;
}
`;

function AddPost(props) {

    let _inputContent;
    
    let [contentToAdd, setContentToAdd] = useState('');
 
    const setContent = () => {
        setContentToAdd(_inputContent.value);
    };

    const sendContent = () => {
        if (contentToAdd.trim() !== '') {
        props.addNewPostMethod(contentToAdd);
        setContentToAdd('');
    }};

    return (

        <AddPostDiv>
            <PostContent ref={(data) => _inputContent = data} onChange={setContent} value={contentToAdd}></PostContent>
            <AddPostBtn onClick={sendContent}>Add New Post</AddPostBtn>
        </AddPostDiv>
    );
}

export default AddPost;