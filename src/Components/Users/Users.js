import React from "react";
import s from "./Users.module.css";

let Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://images-na.ssl-images-amazon.com/images/I/61o8HELSE2L._AC_SL1080_.jpg",
        followed: false,
        fullName: "Anatol K.",
        status: "I am a web developer",
        location: { city: "Hamburg", country: "Germany" },
      },
      {
        id: 2,
        photoUrl:
          "https://images-na.ssl-images-amazon.com/images/I/61o8HELSE2L._AC_SL1080_.jpg",
        followed: true,
        fullName: "Galina K.",
        status: "I'm at home :)",
        location: { city: "Yeysk", country: "Russia" },
      },
      {
        id: 3,
        photoUrl:
          "https://images-na.ssl-images-amazon.com/images/I/61o8HELSE2L._AC_SL1080_.jpg",
        followed: true,
        fullName: "Larisa K.",
        status: "Summer!!!",
        location: { city: "Genue", country: "Italy" },
      },
    ]);
  }

  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={s.userPhoto} alt="userPhoto" />
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    props.unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
