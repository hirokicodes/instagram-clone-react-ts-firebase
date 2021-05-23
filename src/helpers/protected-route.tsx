import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Firebase from "firebase";

type ProtectedRouteProps = {
  user?: Firebase.User;
  path: string;
  exact: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  children,
  path,
  exact,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      path={path}
      exact
      render={({ location }) => {
        if (user) {
          return React.cloneElement(
            <React.Fragment>{children}</React.Fragment>,
            { user }
          );
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
};

export default ProtectedRoute;
