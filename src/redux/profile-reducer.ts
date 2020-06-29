import { stopSubmit, FormAction } from "redux-form";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { profileAPI } from "../api/profile-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  posts: [
    { id: 1, message: "Hi! how are you?", likesCount: 12 },
    { id: 2, message: "it's my first post", likesCount: 20 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD_POST": {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    }

    case "SN/PROFILE/SET_USER_PROFILE": {
      return { ...state, profile: action.profile };
    }
    case "SN/PROFILE/SET_STATUS": {
      return { ...state, status: action.status };
    }
    case "SN/PROFILE/DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    case "SN/PROFILE/SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }

    default:
      return state;
  }
};

//                       Action Creators => Action(object) to despatch

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: "SN/PROFILE/ADD_POST",
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SN/PROFILE/SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SN/PROFILE/SET_STATUS",
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: "SN/PROFILE/DELETE_POST",
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

//                       Thunk Creator => Thunk(function) to despatch
export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  // try {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
  // } catch (error) {
  //   //
  // }
};
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId can not be null");
    }
  } else {
    dispatch(stopSubmit("editProfile", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
