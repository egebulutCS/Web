import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'name': username,
            'password': password
        }

        try {
            fetch("http://localhost:3100/register", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setRegister(true);
                    setStatusMessage('UserLogin ' + userpass.name + ' registered');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error registering the user');
        }
    }

    return (
        <>
            <h2>Register</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                {/* username */}
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
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
                    Register
                </Button>

                {/* display success message */}
                {register ? (
                    <p className="text-success">You Are Registered Successfully</p>
                ) : (
                    <p className="text-danger">You Are Not Registered</p>
                )}
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>
        </>
    )
}

export default Register