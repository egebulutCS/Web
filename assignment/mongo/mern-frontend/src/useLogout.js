import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useLogout() {
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
           await axios({
                method: 'GET',
                url: `http://localhost:3100/logout`,
            }).then(res => { 
                console.log(res); 
                navigate('/');
            })
        } catch(err) {
            console.log(err);
        } 
    }

    return {
        logoutUser
    }

}