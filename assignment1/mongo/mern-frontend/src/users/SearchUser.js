import React, {useState} from 'react';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const SearchUser = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');

    const handleNameFieldChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const updateName = ({value}) => {
        setErrorMessage('');

        try {
            fetch(`http://localhost:3100/userNameUpdate?name=${name}&updateName=${value}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error updating the user');
        }
    };

    const updateAge = ({value}) => {
        setErrorMessage('');

        try {
            fetch(`http://localhost:3100/userAgeUpdate?name=${name}&updateAge=${value}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error updating the user');
        }
    };

    async function handleSearchUser(event) {
        event.preventDefault();
        setErrorMessage('');

        try {
            fetch(`http://localhost:3100/users?name=${name}`)
                .then(response => response.json())
                .then(data => {
                    setSearchResults(data);
                });
        } catch (err) {
            // Remediation logic
            setErrorMessage('There was an error searching for the user');
        }
    }

    return(
        <div className="flex items-center justify-center ">
            <div className="grid grid-flow-row auto-rows-max">
                <div className="flex border-2 border-gray-200 rounded">
                    <input type="text" className="px-4 py-2 w-80" placeholder="Search..." value={name} onChange={(e) => handleNameFieldChange(e)}>
                    </input>
                    <button className="px-4 text-white bg-gray-600" onClick={handleSearchUser}>
                        Search
                    </button>

                </div>
                <div>
                    <table className="table-auto">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((user) => {
                            return(
                                <tr>
                                    <td>
                                    <EditText
                                        name="userName"
                                        defaultValue={user.name}
                                        onSave={updateName}
                                    />
                                    </td>
                                    <td>
                                    <EditText
                                        name="userAge"
                                        defaultValue={user.age}
                                        onSave={updateAge}
                                    />
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
