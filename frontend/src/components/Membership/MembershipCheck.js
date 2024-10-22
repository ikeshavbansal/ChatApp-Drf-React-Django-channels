import { useEffect } from "react";
import { useMembershipContext } from "../../context/MemberContext";
import { useParams } from "react-router-dom";

const MembershipCheck = ({ children }) => {
  const { serverId } = useParams();
  const { isMember } = useMembershipContext();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await isMember(Number(serverId));
      } catch (error) {
        console.log("Error checking membership status", error);
      }
    };
    checkMembership();
  }, [serverId]);

  return <>{children}</>;
};

export default MembershipCheck;
