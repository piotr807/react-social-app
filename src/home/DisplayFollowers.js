import React from 'react';

import styled from "styled-components";

const FollowersDiv = styled.div`
background-color: rgb(14, 210, 245);
flex-basis: 20%;
margin-left: 20px;
position: sticky;
top: 0; 
height: 0;
`;

const Title = styled.h2`
margin: 20px 0;
color: #fff;
font-size: 30px;
font-weight: 500;
`;

const FollowersDivUl = styled.div`
height: 605px;
overflow: scroll;

&::-webkit-scrollbar {
  display: none;
}
`;

const FollowersUl = styled.ul`
background-color: rgb(14, 210, 245);
text-align: left;
list-style: none;
margin: 0;
padding: 0;
`;

const FollowersLi = styled.li`
background-color: #fff;
text-align: center;
list-style: none;
margin-bottom: 5px;
padding: 20px;
font-size: 14px;
`;

const FollowersIm = styled.img`
width: 100px;
`;

const FollowersPa = styled.p`
text-transform: capitalize;
color: gray;
font-weight: 500;
margin: 5px 0;
`;

const FollowersBtn = styled.button`
text-align: center;
background-color: rgb(14, 210, 245);
border-radius: 40px;
border: none;
padding: 5px 20px;
color: #fff;
outline: 0;
transition: all 0.3s;
cursor: pointer;
font-weight: 600;

&:hover {
background-color: gray;
color: #fff;
}
`;

const RemoveFollowBtn = styled(FollowersBtn)`

background-color: gray;

&:hover {
background-color: rgb(14, 210, 245);;
color: #fff;
}
`;



function DisplayFollowers(props) {

    let followersList = props.followersList;
    let allFollowersList = props.allFollowersList;
    
    let liElements = followersList.map((followObj) => {

        return (
            <FollowersLi key={followObj.id}>
                <FollowersIm src={followObj.avatar_url} alt={`${followObj.username} logo`} />
                <FollowersPa>{followObj.username}</FollowersPa>
                <FollowersBtn onClick={() => props.followUserMethod(followObj.id)}>Subscribe Me</FollowersBtn>
            </FollowersLi>
        );
    });

    let allLiElements = allFollowersList.map((allFollowObj) => {

        return (
            <FollowersLi key={allFollowObj.id}>
                <FollowersIm src={allFollowObj.avatar_url} alt={`${allFollowObj.username} logo`} />
                <FollowersPa>{allFollowObj.username}</FollowersPa>
                <RemoveFollowBtn onClick={() => props.removeFollowMethod(allFollowObj.id)}>Don't Subscribe</RemoveFollowBtn>
            </FollowersLi>
        );
    });

    return (

        <FollowersDiv>
            <Title>Follow Them</Title>
            <FollowersDivUl>
            <FollowersUl className="FollowThemtList">
                {liElements}
            </FollowersUl>
            <FollowersUl className="FollowedList">
                {allLiElements}
            </FollowersUl>
            </FollowersDivUl>
        </FollowersDiv>
    );
}

export default DisplayFollowers;