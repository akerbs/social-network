import React from "react";
// import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import Profileinfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <Profileinfo />
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        addPost={props.addPost}
        updateNewPostChange={props.updateNewPostChange}
      />
    </div>
  );
};

export default Profile;
