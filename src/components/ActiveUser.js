// import { AuthContext } from "../contexts/AuthContext";
import React from "react";
import emptyImage from "../assets/shoppingcart.png";
import { useAuth } from "../contexts/AuthContext";
import { EmptyState } from "./EmptyState";

export const ActiveUser = () => {
  const { logout } = useAuth();
  return (
    <div className="m-20 ">
      <EmptyState
        imageUrl={emptyImage}
        title="Hii there"
        description="We will love if you stay and shop"
        buttonText="Logout"
        onButtonClick={() => logout()}
      />
    </div>
  );
};
