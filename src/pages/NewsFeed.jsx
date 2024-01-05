import { useContext } from "react";
import AuthContext from "../providers/AuthProvider";
import News from "../components/News";
import LoadingSpinner from "../components/LoadingSpinner";

function NewsFeed() {
  const { loading } = useContext(AuthContext);
  
  return (
    <>
        {!loading ? <News /> : <LoadingSpinner />}
    </>
  );
}

export default NewsFeed;
