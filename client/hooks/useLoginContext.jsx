import React from "react";

const useLoginContext = React.createContext({
  //Login Info
  username: undefined,
  userID: undefined,
  userType: undefined,
  //Google Login Info
  googleName: undefined,
  googleEmail: undefined,
  googleImg: undefined,
  //Active
  userList: [],
  googleUserList: [],
  //Loads
  loadUser: async () => {},
  loadActive: async () => {},
});

export default useLoginContext;
