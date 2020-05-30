import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi! how are you?", likesCount: 12 },
        { id: 2, message: "it's my first post", likesCount: 20 },
      ],
      newPostText: "new Post text!",
    },

    dialogsPage: {
      dialogs: [
        { id: 1, name: "Anatol" },
        { id: 2, name: "Galina" },
        { id: 3, name: "Julia" },
        { id: 4, name: "Alexander" },
        { id: 5, name: "Vladimir" },
        { id: 6, name: "Mary" },
        { id: 7, name: "Ivan" },
      ],
      messages: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Yo" },
      ],
      newMessageBody: "",
    },

    sidebar: {},
  },
  _callSubscruber() {
    console.log("State is changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscruber = observer;
  },
  // addPost() {
  //   let newPost = {
  //     id: 5,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0,
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this._callSubscruber(this._state);
  // },
  // updateNewPostChange(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscruber(this._state);
  // },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

    this._callSubscruber(this._state);
  },
};

export default store;
window.store = store;
