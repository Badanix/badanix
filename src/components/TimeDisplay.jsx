import { useState, useEffect } from 'react';
import { FaPaperclip, FaSmile, FaMicrophone, FaVideo, FaPhone, FaCamera, FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
const ChatComponent = ({ img, name }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'other' },
    { id: 2, text: 'Hi there! How are you?', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (newMessage) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    }, 500);

    return () => clearTimeout(typingTimer);
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me' }]);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleVideoCall = () => {
    // Implement video call logic here
    console.log('Starting video call');
  };

  const handleVoiceCall = () => {
    // Implement voice call logic here
    console.log('Starting voice call');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen   mt-[40px]  rounded-xl mb-[90px] overflow-y">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-red-600 shadow-md w-[90vw]">
        <div className="flex items-center">
          <img
            src={img}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className={`text-gray-500 text-sm ${isTyping ? 'hidden' : ''}`}>Online</p>
            {isTyping && <p className="text-gray-500 text-sm">{name} is typing...</p>}
          </div>
        </div>
        <div className="flex items-center">
          {!isTyping && (
            <>
              <FaVideo
                className="text-green-500 text-xl cursor-pointer mx-2"
                onClick={handleVideoCall}
                title="Start Video Call"
              />
              <FaPhone
                className="text-blue-500 text-xl cursor-pointer mx-2"
                onClick={handleVoiceCall}
                title="Start Voice Call"
              />
            </>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}
          >
            <div
              className={`max-w-xs p-2 rounded-md ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <FaPaperclip className="text-gray-600 text-xl mr-2 cursor-pointer" />
        <FaSmile className="text-gray-600 text-xl mr-2 cursor-pointer" />
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
          placeholder="Type a message"
        />
        {isTyping ? (
          <FaArrowRight
            className="text-blue-500 text-2xl cursor-pointer"
            onClick={handleSendMessage}
          />
        ) : (
          <>
            <FaCamera
              className="text-blue-500 text-2xl cursor-pointer"
              onClick={handleSendMessage}
            />
            <FaMicrophone className="text-gray-600 text-xl ml-2 cursor-pointer" />
          </>
        )}
      </div>
    </div>
  );
};
ChatComponent.propTypes ={
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}


export default ChatComponent;

