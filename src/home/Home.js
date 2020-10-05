import React, { Component } from 'react';
import DisplayList from './DispplayList';
import DisplayFollowers from './DisplayFollowers';
import PopUp from './PopUp';

import axios from 'axios';
import styled from "styled-components";

const MainDiv = styled.div.attrs(() => ({
    className: "home"
}))`
background-color: rgb(14, 210, 245);
padding: 30px;
display: flex;
justify-content: space-between;
position: relative;
`;

class Home extends Component {

    constructor(props) {
        super(props);

        this._isMounted = false;
        this.observer = new IntersectionObserver(entries => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
                this.getOlderPostData();
            }
        })

        this.state = {
            postList: [],
            followersList: [],
            allFollowersList: [],
            popUpShow: false,
        };
    }

    componentDidMount() {

        this._isMounted = true;

        this.getLatestPostData();
        this.timerID = setInterval(() => this.getNewerPostData(), 10000);

        if (this.props.isLogged) {

            this.getFollowersData();
            this.getAllFollowersData();
        }

        if (!this.props.isLogged) {
            this.timerID = setTimeout(() => this.showPopUp(), 10000);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(this.timerID);
        this.observer.disconnect();
    }

    observeFun = () => {
        let target = document.querySelector('.PostList li:last-child');
        if (this.state.postList.length !== 0) {
        this.observer.observe(target);
        };
    }

    showPopUp = () => {
        this.setState(() => {
            return ({
                popUpShow: true
            });
        });
    }

    notShowPopUp = () => {
        this.setState(() => {
            return ({
                popUpShow: false
            });
        });
    }

    getLatestPostData = () => {
        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/latest', {},
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {
                    let newPostList = req.data;

                    return ({

                        postList: newPostList
                    });
                });
                this.observeFun();
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    getNewerPostData = () => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }
    
        let newerPostDate = {
            date: this.state.postList[0].created_at
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/newer-then', JSON.stringify(newerPostDate),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {
                    let newerPostList = req.data;

                    return ({

                        postList: newerPostList.concat(this.state.postList)
                    });
                });
            }
            }).catch((error) => {
                console.error(error);
            })
    }

    getOlderPostData = () => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }
        let olderPostDate = {
            date: this.state.postList[this.state.postList.length - 1].created_at
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/older-then', JSON.stringify(olderPostDate),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {
                    let olderPostList = req.data;

                    return ({
                        postList: this.state.postList.concat(olderPostList)
                    });
                });
                this.observeFun();
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    getFollowersData = () => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/recommendations', {},
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {
                    let newFollowersList = req.data;

                    return ({

                        followersList: newFollowersList
                    });
                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    getAllFollowersData = () => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/allfollows', {},
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {
                    let newAllFollowersList = req.data;

                    return ({

                        allFollowersList: newAllFollowersList
                    });
                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    followUser = (followId) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let followUser = {
            leader_id: followId
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/follow', JSON.stringify(followUser),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {

                    if (req.data.followed) {
                        let newFollowersList = this.state.followersList.filter((followObj) => followObj.id !== followId);

                        this.getAllFollowersData();
                        this.getLatestPostData();

                        return ({

                            followersList: newFollowersList
                        });
                    };
                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    removeFollowUser = (removeId) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let removeFollowUser = {
            leader_id: removeId
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/disfollow', JSON.stringify(removeFollowUser),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {

                    if (!req.data.followed) {
                        let newAllFollowersList = this.state.allFollowersList.filter((followObj) => followObj.id !== removeId);

                        this.getFollowersData();
                        this.getLatestPostData();

                        return ({

                            allFollowersList: newAllFollowersList
                        });
                    };
                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    addLike = (likeId) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let likedPost = {
            post_id: likeId
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/like', JSON.stringify(likedPost),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                let newPostList = this.state.postList;

                if (req.data.liked) {

                    newPostList.map((postObj) => {
                        let liked = false;
                        if (postObj.likes.some(like => like.id === this.props.loggedUser.id)) {
                            liked = true;
                        } else {
                            liked = false;
                        };

                        return postObj.id === likeId && !liked ? postObj.likes.push({ id: this.props.loggedUser.id }) : postObj.likes

                    });
                };
                this.setState((state) => {
                    return ({ postList: newPostList })

                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    removeLike = (disLikeId) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let likedPost = {
            post_id: disLikeId
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/dislike', JSON.stringify(likedPost),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                let newPostList = this.state.postList;

                if (!req.data.liked) {

                    newPostList.map((postObj) => {
                        let liked = false;

                        if (postObj.likes.some(like => like.id === this.props.loggedUser.id)) {
                            liked = true;
                        } else {
                            liked = false;
                        };

                        return postObj.id === disLikeId && liked ? postObj.likes = postObj.likes.filter((like) => like.id !== this.props.loggedUser.id) : postObj.likes
                    });
                };
                this.setState((state) => {
                    return ({ postList: newPostList })

                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    addNewPost = (newContent) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let postToAdd = {
            content: newContent
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/add', JSON.stringify(postToAdd),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                if (req.data.message === 'Post added') {
                    
                    this.getNewerPostData();

                };
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    removePost = (postID) => {

        let loggedUserToken = '';

        if (this.props.isLogged) {
            loggedUserToken = JSON.parse(localStorage.getItem('storUser')).jwt_token;
        }
        else {
            loggedUserToken = '';
        }

        let postToRemove = {
            post_id: postID
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loggedUserToken
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/delete', JSON.stringify(postToRemove),
            { 'headers': headers })
            .then((req) => {
                if (this._isMounted) {
                this.setState((state) => {

                    if (req.data.message === 'Post deleted Successfully') {
                        let newPostList = this.state.postList.filter((postObj) => postObj.id !== postID);

                        return ({

                            postList: newPostList
                        });
                    };
                });
            }
            }).catch((error) => {
                console.error(error);
            })

    }

    render() {
        return (
            <MainDiv>
                <DisplayList postList={this.state.postList} isLogged={this.props.isLogged} addLikeMethod={this.addLike} removeLikeMethod={this.removeLike} addNewPostMethod={this.addNewPost} removePostMethod={this.removePost} loggedUser={this.props.loggedUser} />

                {this.props.isLogged ? <DisplayFollowers followersList={this.state.followersList} allFollowersList={this.state.allFollowersList} followUserMethod={this.followUser} removeFollowMethod={this.removeFollowUser} /> : null}

                {this.state.popUpShow ? <PopUp notShowPopUpMethod={this.notShowPopUp} logInMethod={this.props.logInMethod} /> : null}
            </MainDiv>
        );
    }
}

export default Home;