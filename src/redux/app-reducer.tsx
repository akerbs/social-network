import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "social_network/app/INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

//                       Action Creators => Action(object) to despatch
type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

//                       Thunk Creator => Thunk(function) to despatch
export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  // dispatch(somethingElse());
  // dispatch(somethingElse());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
