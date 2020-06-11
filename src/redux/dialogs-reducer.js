const SEND_MESSAGE = "social_network/dialogs/SEND-MESSAGE";

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
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,

        messages: [...state.messages, { id: 4, message: body }],
      };

    default:
      return state;
  }
};

//                       Action Creators
// utility (software) designed to help to create a correct action object
export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
