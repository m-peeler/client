import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Login(props: {setIsAuth: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const cookies = new Cookies();
    
    const login = useMutation({
        mutationFn: () => {
            console.log(username, password);
            return Axios.post("http://localhost:3001/login", {
                username, password
            });
        }
    });

    useEffect(() => {
        if (!!login.data) {
            console.log(login.data.data);
            const { firstName, lastName, username, token, userId } = login.data.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("username", username);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            props.setIsAuth(true);
        }
    }, [login.isSuccess])

    return (
        <div className={'signUp'}>
            <label>Login</label>
            <input 
                placeholder={"Username"} 
                onChange={(event) => setUsername(event.target.value)} 
            />
            <input 
                type={'password'}
                placeholder={"Password"} 
                onChange={(event) => setPassword(event.target.value)} 
            />
            <button onClick={() => login.mutate()}>Login</button>
        </div>
    );

}