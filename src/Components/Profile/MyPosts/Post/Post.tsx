import React from "react";
import s from "./Post.module.css";
import p1 from "./p1.jpg";

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src={p1} alt="p1" />
      {props.message}

      <div>
        <span>like</span>
        {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
