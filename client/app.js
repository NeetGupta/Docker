import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit('chat', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', msg => {
      setChat(prev => [...prev, msg]);
    });
  }, []);

  return (
    <div>
      <h2>Real-Time Chat</h2>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>{chat.map((msg, idx) => <li key={idx}>{msg}</li>)}</ul>
    </div>
  );
}

export default App;
