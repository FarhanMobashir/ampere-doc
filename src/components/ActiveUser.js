// import { AuthContext } from "../contexts/AuthContext";
import React from "react";
import emptyImage from "../assets/girlsitting.svg";
import { useAuth } from "../contexts/AuthContext";
import { EmptyState } from "./EmptyState";

export const ActiveUser = () => {
  const { logout } = useAuth();
  return (
    <div className="m-20 ">
      <EmptyState
        imageUrl={emptyImage}
        title="Welcome User"
        description="We will love if you stay keep making notes"
        buttonText="Logout"
        onButtonClick={() => logout()}
      />
    </div>
  );
};
