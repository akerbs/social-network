import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          src="https://cdn.civitatis.com/alemania/hamburgo/free-tour-hamburgo.jpg"
          alt="img"
        />
      </div>
      <div className={s.descriptionBlock}>ava + decs</div>
    </div>
  );
};

export default ProfileInfo;
