import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <p>I am home page</p>
            <Link to="/account">Account</Link>
        </div>
    )
}
export default Home