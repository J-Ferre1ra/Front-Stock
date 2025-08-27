import {Navigate} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"
const PrivateRoute = ({children}) => {
    const {usuario, carregando} = useAuth()

    if(carregando) return <p>Carregando...</p>

    return usuario ? children : <Navigate to="/login" replace/>
}

export default PrivateRoute