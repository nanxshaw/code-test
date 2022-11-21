import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Auth = ({ children }) => {
    const user = useSelector((state) => state.user);
    if (user == null) {
        // user is not authenticated
        return <Navigate to="/" />;
    }
    return children;
};

export default Auth;