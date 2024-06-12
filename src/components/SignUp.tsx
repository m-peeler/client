import React, { useCallback, useState } from 'react';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import Cookies from 'universal-cookie';

type SignupInfo = {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

export default function SignUp(props: {setIsAuth: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [user, setUser] = useState({username: '', password: '', firstName: '', lastName: ''});
    const cookies = new Cookies();

    const sendSignup = useMutation({
        mutationFn: (signupUser: SignupInfo) => {
            console.log(signupUser);
            return Axios.post("http://localhost:3001/signup", signupUser);
        }
    })

    if (sendSignup.isSuccess) {
        const {token, userId, firstName, lastName, username, hashedPassword}  = sendSignup.data.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashedPassword", hashedPassword);
        props.setIsAuth(true);
    }

    return (
        <div className={'signUp'}>
            <label>Sign Up</label>
            <input 
                placeholder={"First Name"} 
                onChange={(event) => setUser({...user, firstName: event.target.value})} 
            />
            <input 
                placeholder={"Last Name"} 
                onChange={(event) => setUser({...user, lastName: event.target.value})} 
            />
            <input
                placeholder={"Username"}
                onChange={(event) => setUser({...user, username: event.target.value})}
            />
            <input 
                type={'password'}
                placeholder={"Password"} 
                onChange={(event) => setUser({...user, password: event.target.value})} 
            />
            <button onClick={() => sendSignup.mutate(user)}>Sign Up</button>
        </div>
    );

}