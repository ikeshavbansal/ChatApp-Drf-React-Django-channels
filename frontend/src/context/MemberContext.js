import React, { createContext, useContext } from "react";
import useMembership from "../services/membershipService";

const MembershipContext = createContext(null);

export function MembershipProvider(props) {
  const membership = useMembership();
  return (
    <MembershipContext.Provider value={membership}>
      {props.children}
    </MembershipContext.Provider>
  );
}

export function useMembershipContext() {
  const context = useContext(MembershipContext);

  if (context === null) {
    throw new Error("Error - You have to use the MembershipProvider");
  }
  return context;
}

export default MembershipProvider;
