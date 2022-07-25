import React from "react";

const DUMMY_USERS = {
  users: [
    { id: "u1", name: "Max" },
    { id: "u2", name: "Manuel" },
    { id: "u3", name: "Julie" },
    { id: "u4", name: "Ammar" },
    { id: "u5", name: "Ali" },
  ],
};

export const UsersContext = React.createContext({ users: [] });

// Context provider to wrap the components
const UsersContextProvider = (props) => {
  return (
    <UsersContext.Provider value={DUMMY_USERS}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;
