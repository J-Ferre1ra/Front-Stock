import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { usuario, carregando } = useAuth();
  const location = useLocation();

  if (carregando) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>Carregando...</div>;
  }

  return usuario ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;