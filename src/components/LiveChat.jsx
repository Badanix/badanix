import  { useState } from 'react';
import axios from 'axios';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [liveAgentAvailable, setLiveAgentAvailable] = useState(false);
  const [showConnections, setShowConnections] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: input }]);

    if (
      input.toLowerCase().includes('liveagent') ||
      input.toLowerCase().includes('live') ||
      input.toLowerCase().includes('agent') ||
      input.toLowerCase().includes('live chat') ||
      input.toLowerCase().includes('talk to agent')
    ) {
      try {
        const response = await axios.get('/api/check-live-agent');
        if (response.data.available) {
          setLiveAgentAvailable(true);
          setShowConnections(true);
        } else {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: 'No live agents are available at the moment.' },
          ]);
        }
      } catch (error) {
        console.error('Error checking live agent availability:', error);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Error checking agent availability. Please try again later.' },
        ]);
      }
    } else {
      // Placeholder for AI responses
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Processing your request...' },
      ]);
    }

    setInput('');
  };

  const handleConnections = (opt) => {
    if (opt === 'call') {
      // Logic to initiate calls
      alert('Connecting to live agent via call');
    } else if (opt === 'video') {
      // Logic to initiate video calls
      alert('Connecting to live agent via video');
    } else {
      alert('Connecting to live agent via chat');
    }
    setShowConnections(false);
  };

  return (
    <>
      <div className="chatbot">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>

        {showConnections && (
          <div className="connect-options">
            <p>Would you like to connect to a live agent via:</p>
            <button onClick={() => handleConnections('call')}>Call</button>
            <button onClick={() => handleConnections('chat')}>Chat</button>
            <button onClick={() => handleConnections('video')}>Video</button>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveChat;
