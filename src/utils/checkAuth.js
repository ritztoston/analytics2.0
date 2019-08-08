import setAuthToken from "./setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../store";
import {logoutUser, setCurrentUser} from "../actions/authActions";
import Cookies from "universal-cookie/cjs";

const checkAuth = level => {
    const cookies = new Cookies();
    const cookie_token = cookies.get('sra_token');
    const message_content = "Session expired. Please login again.";

    if(cookie_token) {
        const decoded = jwt_decode(cookie_token);

        if(level === 1) {
            setAuthToken(cookie_token);
            store.dispatch(setCurrentUser(decoded));
        }

        const current_time = Date.now() / 1000;
        if (decoded.exp < current_time) {
            store.dispatch(logoutUser(message_content));
            window.location.href = '/login';
        }
    }

    return null;
};

export default checkAuth;
