import { useNavigate, useLocation } from "react-router-dom";
import "./Role.css";

function Role() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const action = params.get("action"); // "register" or "login"

  const goTo = (role) => {
    navigate(`/${role}/${action}`);
  };

  return (
    <div className="role-selection">
      <h2>{action === "register" ? "Register as:" : "Login as:"}</h2>
      <button onClick={() => goTo("user")}>User</button>
      <button onClick={() => goTo("driver")}>Driver</button>
    </div>
  );
}

export default Role;
