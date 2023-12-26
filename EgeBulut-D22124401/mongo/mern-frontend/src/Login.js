import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        setWrongPassword(false);

        let userpass = {
            'name': username,
            'password': password
        }

        try {
            fetch("http://localhost:3100/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => {
                    if(!response.ok) {setWrongPassword(true); throw new Error(response.status);} 
                    else return response.json()})
                .then(data => {
                    console.log(data);
                    setLogin(true);
                    // set the cookie
                    cookies.set("TOKEN", data.token, {
                        path: "/",
                    });
                    // redirect user to the auth page
                    window.location.href = "/auth";

                    setLogin(true);

                    setStatusMessage('UserLogin ' + userpass.name + ' authenticated');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error authenticating the user');
        }
    }

    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </Form.Group>

                {/* password */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Login
                </Button>

                {/* display success message */}
                {login ? (
                    <p className="text-success">You Are Logged in Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}

                {wrongPassword ? (
                    <p className="text-danger">Wrong Password!!!</p>
                ) : (
                    <p></p>
                )}

                <p className="text-red-900">
                    {statusMessage}
                </p>
            </Form>
        </>
    )
}

export default Login