import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useAuth() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return await axios.get('http://localhost:3100/login').then(res => {         
            setUser(res.data.currentUser);  
            navigate('/home');                     
            }).catch((err) => {
            setError(err.response.data);
        })
    }

    //register user  
    const registerUser = async (data) => {
        console.log(data);
        const { username, email, password, passwordConfirm } = data;
            return axios.post(`http://localhost:3100/register`, {
                  username,
                  email,
                  password,
                  passwordConfirm
                }).then(async () => {
                    await setUserContext();
                })
                .catch((err) => {
                   return setError(err.response.data);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { username, password } = data;
            return axios.post('http://localhost:3100/login', {
                username,
                password,
            }).then(async () => {
                await setUserContext();
            }).catch((err) => {
                setError(err.response.data);
            })
        };

    return {
        registerUser,
        loginUser,
        error
    }
}