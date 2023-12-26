import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

function User() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [change, setChange] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'name': username,
            'password': password,
            'newPassword': newPassword
        }

        try {
            fetch("http://localhost:3100/changePassword", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setChange(true);
                    setStatusMessage('UserLogin ' + userpass.name + ' password changed');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error changing the password');
        }
    }

    const handleSubmitDelete = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'name': username,
        }

        try {
            fetch("http://localhost:3100/deleteUser", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDelete(true);
                    setStatusMessage('UserLogin ' + userpass.name + ' deleted');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error deleting the user');
        }
    }

    return (
        <>
            <h2>User Change Password</h2>
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

                {/* new password */}
                <Form.Group controlId="formBasicNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="NewPassword"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Change Password
                </Button>

                {/* display success message */}
                {change ? (
                    <p className="text-success">User Password Has Been Changed</p>
                ) : (
                    <p className="text-danger">User Password Has Not Been Changed</p>
                )}
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>

            <h2>Delete User</h2>
            <Form onSubmit={(e)=>handleSubmitDelete(e)}>
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

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmitDelete(e)}
                >
                    Delete User
                </Button>

                {/* display success message */}
                {isDelete ? (
                    <p className="text-success">User Has Been Deleted</p>
                ) : (
                    <p className="text-danger">User Has Not Been Deleted</p>
                )}
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>
        </>
    )
}

export default User