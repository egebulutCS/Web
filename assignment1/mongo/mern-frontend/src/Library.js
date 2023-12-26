import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function Library() {

    const [username, setUsername] = useState("");
    const [book, setBook] = useState("");
    const [fee, setFee] = useState("");
    const [created, setCreated] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmitCreateLog = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let log = {
            'name': username,
            'book': book,
            'fee': fee
        }

        try {
            fetch("http://localhost:3100/createLog", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(log)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setCreated(true);
                    setStatusMessage('Library log created for ' + log.name);
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error creating library log');
        }
    }

    const handleSubmitDelete = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'name': username,
        }

        try {
            fetch("http://localhost:3100/deleteLog", {
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

    const handleSubmitSearchLogByName = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'name': username,
        }

        try {
            fetch("http://localhost:3100/getLogsByName", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSearchResults(data);
                    setStatusMessage('Search by name ' + userpass.name + ' completed');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error sarching the logs');
        }
    }

    const handleSubmitSearchLogByBook = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'book': book,
        }

        try {
            fetch("http://localhost:3100/getLogsByBook", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSearchResults(data);
                    setStatusMessage('Search by book ' + userpass.book + ' completed');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error sarching the logs');
        }
    }

    const handleSubmitSearchLogByFee = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();

        let userpass = {
            'fee': fee,
        }

        try {
            fetch("http://localhost:3100/getLogsByFee", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(userpass)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSearchResults(data);
                    setStatusMessage('Search by fee ' + userpass.fee + ' completed');
                });
        } catch (err) {
            // Remediation logic
            setStatusMessage('There was an error sarching the logs');
        }
    }

    return (
        <>
            <h2>Create Library Log</h2>
            <Form onSubmit={(e)=>handleSubmitCreateLog(e)}>
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

                {/* book */}
                <Form.Group controlId="formBasicBook">
                    <Form.Label>Book</Form.Label>
                    <Form.Control
                        type="book"
                        name="book"
                        value={book}
                        onChange={(e) => setBook(e.target.value)}
                        placeholder="Book"
                    />
                </Form.Group>

                {/* fee */}
                <Form.Group controlId="formBasicFee">
                    <Form.Label>Fee</Form.Label>
                    <Form.Control
                        type="fee"
                        name="fee"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="Fee"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmitCreateLog(e)}
                >
                    Create Log
                </Button>

                {/* display success message */}
                {created ? (
                    <p className="text-success">Library Log Has Been Created</p>
                ) : (
                    <p className="text-danger">Library Log Has Not Been Created</p>
                )}
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>

            <h2>Delete Library Log</h2>
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

            <h2>Search Library Log By Name</h2>
            <Form onSubmit={(e)=>handleSubmitSearchLogByName(e)}>
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
                    onClick={(e) => handleSubmitSearchLogByName(e)}
                >
                    Search Log By Name
                </Button>
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>

            <h2>Search Library Log By Book</h2>
            <Form onSubmit={(e)=>handleSubmitSearchLogByBook(e)}>
                {/* book */}
                <Form.Group controlId="formBasicBook">
                    <Form.Label>Book</Form.Label>
                    <Form.Control
                        type="book"
                        name="book"
                        value={book}
                        onChange={(e) => setBook(e.target.value)}
                        placeholder="Book"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmitSearchLogByBook(e)}
                >
                    Search Log By Books
                </Button>
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>

            <h2>Search Library Log By Fee</h2>
            <Form onSubmit={(e)=>handleSubmitSearchLogByFee(e)}>
                {/* fee */}
                <Form.Group controlId="formBasicFee">
                    <Form.Label>Fee</Form.Label>
                    <Form.Control
                        type="fee"
                        name="fee"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="Fee"
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmitSearchLogByFee(e)}
                >
                    Search Log By Fee
                </Button>
                
                <p className="text-red-900">
                    { statusMessage }
                </p>
            </Form>

            <div>
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Book</th>
                            <th>Fee</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((log) => {
                            return(
                                <tr>
                                    <td>
                                    <EditText
                                        name="name"
                                        defaultValue={log.name}
                                    />
                                    </td>
                                    <td>
                                    <EditText
                                        name="book"
                                        defaultValue={log.book}
                                    />
                                    </td>
                                    <td>
                                    <EditText
                                        name="fee"
                                        defaultValue={log.fee}
                                    />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
        </>
    )
}

export default Library