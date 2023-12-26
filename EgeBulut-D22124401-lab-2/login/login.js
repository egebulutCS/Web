import React, { useState } from 'react';
import styled from "styled-components";

const LoggedIn = styled.h1`
    color: blue;
`;
const NotLoggedIn = styled.h1`
    color: red;
`;
// This is a sample start

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        isLoggedIn ? <LoggedIn>Welcome back</LoggedIn> : <NotLoggedIn>Please login to continue</NotLoggedIn>
    );
}