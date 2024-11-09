import { useEffect } from "react";
import useAppFunction from "../../hooks/useAppFunction";
import useTestQuery from "./useQuery";

const Home = () => {
  const { handleAlert } = useAppFunction();
  const { data } = useTestQuery();
  console.log(`🚀 ~ file: Home.jsx:9 ~ data:`, data);
  useEffect(() => {
    handleAlert(true, "success", "this is test message");
  }, []);

  return (
    <div style={{ height: "1222vh" }} className="container">
      Home page is under construction
    </div>
  );
};

export default Home;
