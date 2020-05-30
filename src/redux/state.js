const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

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
    if (action.type === ADD_POST) {
      let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscruber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscruber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscruber(this._state);
    } else if (action.type === SEND_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = "";
      this._state.dialogsPage.messages.push({ id: 4, message: body });
      this._callSubscruber(this._state);
    }
  },
};
//                       Action Creator
// utility (software) designed to help to create a correct action object
export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default store;
window.store = store;
