import React, { useEffect, useState, } from "react";
import { Button } from "react-bootstrap";

function FreeComponent() {

    const [message, setMessage] = useState("");

    // home
    const home = () => {
        window.location.href = "/";
    }

    useEffect(() => {
        try {
            fetch("http://localhost:3000/free-endpoint", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
            })
                .then(response => response.json())
                .then(data => {
                    setMessage(data.message);
                });
        } catch (err) {
            // Remediation logic
            setMessage('Error');
        }
    }, [])

    return (
        <div className="text-center">
            <h1 className="text-center">Free Component</h1>

            <h3 className="text-center text-danger">{message}</h3>

            <Button type="submit" variant="danger" onClick={() => home()}>
                Home
            </Button>
        </div>
    );
}

export default FreeComponent