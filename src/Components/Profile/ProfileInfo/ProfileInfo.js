import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img
          src="https://cdn.civitatis.com/alemania/hamburgo/free-tour-hamburgo.jpg"
          alt="img"
        />
      </div>
      <div className={s.descriptionBlock}>ava + decs</div>
      <img src={props.profile.photos.large} />
    </div>
  );
};

export default ProfileInfo;
