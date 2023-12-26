import React, { useEffect, useState, } from "react";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function AuthComponent() {

    const [message, setMessage] = useState("");

    // logout
    const logout = () => {
        // destroy the cookie
        cookies.remove("TOKEN", { path: "/" });
        // redirect user to the landing page
        window.location.href = "/";
    }

    // home
    const home = () => {
        window.location.href = "/";
    }

    useEffect(() => {
        try {
            fetch("https://nodejs-mongodb-auth-app.herokuapp.com/auth-endpoint", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setMessage(data.message);
                });
        } catch (err) {
            // Remediation logic
            setMessage('Error');
        }
    }, [])

    return (
        <div className="text-center">
            <h1 className="text-center">Auth Component</h1>

            <h3 className="text-center text-danger">{message}</h3>

            <Button type="submit" variant="danger" onClick={() => logout()}>
                Logout
            </Button>

            <Button type="submit" variant="danger" onClick={() => home()}>
                Home
            </Button>
        </div>
    );
}

export default AuthComponent