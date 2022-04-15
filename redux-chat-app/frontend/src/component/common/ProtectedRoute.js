import React from "react";

import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component }, ...rest) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Link to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
