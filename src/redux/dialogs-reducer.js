const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY: {
      let stateCopy = { ...state };
      stateCopy.newMessageBody = action.body;
      return stateCopy;
    }
    case SEND_MESSAGE: {
      let stateCopy = { ...state };
      let body = stateCopy.newMessageBody;
      stateCopy.newMessageBody = "";
      stateCopy.messages = [...state.messages];
      stateCopy.messages.push({ id: 4, message: body });
      return stateCopy;
    }

    default:
      return state;
  }
};

//                       Action Creators
// utility (software) designed to help to create a correct action object
export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default dialogsReducer;
