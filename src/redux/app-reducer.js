import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
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
export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS,
});

//                       Thunk Creator => Thunk(function) to despatch
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  // dispatch(somethingElse());
  // dispatch(somethingElse());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
