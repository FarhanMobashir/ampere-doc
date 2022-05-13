import React from "react";

export const useToggle = (initialState = false) => {
  const [on, setToggle] = React.useState(initialState);
  return {
    on,
    toggle: () => setToggle(!on),
    reset: () => setToggle(initialState),
    set: (value) => setToggle(value),
  };
};
