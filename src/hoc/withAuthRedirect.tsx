import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForRederect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};

type DispatchPropsType = {};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (
    props
  ) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/login" />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    MapPropsType,
    DispatchPropsType,
    WCP,
    AppStateType
  >(
    mapStateToPropsForRederect,
    {}
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}
