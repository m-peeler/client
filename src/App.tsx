import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useMutation } from '@tanstack/react-query';
import JoinGame from './components/JoinGame';

function App() {

  const client = StreamChat.getInstance('tvg29652x35s');
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);

  const connectUser = useMutation({
    mutationFn: () => 
      client.connectUser(
        {
          id: cookies.get('userId'),
          name: cookies.get('username'),
          firstName: cookies.get('firstName'),
          lastName: cookies.get('lastName'),
          hashedPassword: cookies.get('hashedPassword')
        },
        token
      )
  })

  useEffect(() => { if (token) connectUser.mutate(); }, [token]);
  useEffect(() => setIsAuth(!!connectUser.data), [!!connectUser.data])
  
  const logOut = useCallback(() => {
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('firstName');
    cookies.remove('hashedPassword');
    cookies.remove('token');
    cookies.remove('userId');
    client.disconnectUser();
    setIsAuth(false);
  }, [setIsAuth]);

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <h1>
            {`Welcome to the Game, ${cookies.get('username')}`}
          </h1>
          <button onClick={logOut}>Log Out</button>
        </Chat>) 
      : (
      <>
        <SignUp setIsAuth={setIsAuth} />
        <Login setIsAuth={setIsAuth} />
      </>)
      }
    </div>
  );
}

export default App;
