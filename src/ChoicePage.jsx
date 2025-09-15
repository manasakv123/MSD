import { useParams, Link } from "react-router-dom";

function ChoicePage() {
  const { role } = useParams();

  return (
    <div>
      <h1>{role === "user" ? "User" : "Driver"} Options</h1>
      <Link to={`/${role}/register`}>Register as {role}</Link>
      <br />
      <Link to={`/${role}/login`}>Login as {role}</Link>
    </div>
  );
}

export default ChoicePage;
