import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

import useUser from "../../hooks/useUser";
import Loader from "../Loader";

export default function ProtectedRoute({ children, ...rest }: RouteProps) {
  const [user, loading, error] = useUser();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={() => {
        return user && !error ? (
          children
        ) : (
          <Redirect to={`/login?next=${location.pathname}`} />
        );
      }}
    />
  );
}
