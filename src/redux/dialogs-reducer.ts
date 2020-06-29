import { InferActionsTypes } from "./redux-store";

type DialogType = {
  id: number;
  name: string;
};

type MessageType = {
  id: number;
  message: string;
};

let initialState = {
  dialogs: [
    { id: 1, name: "Anatol" },
    { id: 2, name: "Galina" },
    { id: 3, name: "Julia" },
    { id: 4, name: "Alexander" },
    { id: 5, name: "Vladimir" },
    { id: 6, name: "Mary" },
    { id: 7, name: "Ivan" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hi!" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "SN/DIALOGS/SEND_MESSAGE":
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

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: "SN/DIALOGS/SEND_MESSAGE",
      newMessageBody,
    } as const),
};

export default dialogsReducer;
