import { getAuthUserData } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = { initialized: false };

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

//                       Action Creators => Action(object) to despatch
export const actions = {
  initializedSuccess: () => ({ type: "SN/APP/INITIALIZED_SUCCESS" } as const),
};

//                       Thunk Creator => Thunk(function) to despatch
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  // dispatch(somethingElse());
  // dispatch(somethingElse());
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
