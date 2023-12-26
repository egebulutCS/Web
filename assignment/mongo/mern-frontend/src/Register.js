import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import CTA from './CTA';
import Prompt from './Prompt';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import Error from './Error';
import useForm from './useForm';
import useAuth from './useAuth';

export default function Register() {

    const { values, handleChange} = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    });

    const { registerUser, error } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        await registerUser(values);
    }

    return(
        <div className="page" style={{justifyContent:'center'}}>
            <div className="inlineForm">
            <h3>Register</h3>
                <div className="inlineForm__notif">
                    {error && <Error error={error.messages}/>}
                </div>
                    <form onSubmit={handleRegister}>
                        <FormInput type={"text"} 
                                    placeholder={"Username"} 
                                    name={"username"} 
                                    value={values.username} 
                                    handleChange={handleChange} />

                        <ConfirmPasswordInput type={"password"} 
                                    placeholder={"Password"}
                                    name={"password"}
                                    value={values.password}
                                    handleChange={handleChange}/>

                        <div className="inlineForm__submit">
                            <Link to='/login'>
                                <Prompt prompt={"Existing account? Log in."}/>
                            </Link>
                            <CTA name={"register"} type={"submit"}
                            /> 
                    </div>
                </form>
            </div>
        </div>
    )
}