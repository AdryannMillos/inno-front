import { useContext } from "react";
import ProfileForm from "../components/ProfileForm";
import AuthContext from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

function Profile() {
 const {loading} = useContext(AuthContext);
  return (
    <>
        {!loading ? <ProfileForm /> : <LoadingSpinner />}
    </>
  );
}

export default Profile