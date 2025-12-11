import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.length === 0) navigate("/login");
  }, [navigate]);
  return children;
}

export default ProtectedRoute;
