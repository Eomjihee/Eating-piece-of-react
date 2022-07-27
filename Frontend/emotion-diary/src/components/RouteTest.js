import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/create"}>Create</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
      <br />
      <Link to={"/diary"}>diary</Link>
    </>
  );
};

export default RouteTest;
