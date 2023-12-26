import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import InlineButton from './InlineButton';
import { UserContext } from './UserContext';
import useLogout from './useLogout';

export default function Header() {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout(); 
    
    return(
        <header>
            {user 
            ? <>
                Hello, {user.username}.
                <InlineButton name={'logout'} handleClick={logoutUser} />
            </>
           : <div className='btnGroup'>
                <Link to = "/login"> 
                    <InlineButton name={"login"}/>
                </Link>
                <Link to = "/register"> 
                    <InlineButton name={"register"}/>
                </Link>
            </div>
            }
        </header>
    )
}