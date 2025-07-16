// SenderComponent.jsx

import React, { useState, useEffect } from 'react';
import { FaPaperclip, FaSmile, FaMicrophone, FaCamera, FaArrowRight } from 'react-icons/fa';

const SenderComponent = ({ onSendMessage, onTyping }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (newMessage) {
        setIsTyping(true);
        onTyping(true);
      } else {
        setIsTyping(false);
        onTyping(false);
      }
    }, 500);

    return () => clearTimeout(typingTimer);
  }, [newMessage, onTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleInputChange = (e) => setNewMessage(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
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
        <FaArrowRight className="text-blue-500 text-2xl cursor-pointer" onClick={handleSendMessage} />
      ) : (
        <>
          <FaCamera className="text-blue-500 text-2xl cursor-pointer" onClick={handleSendMessage} />
          <FaMicrophone className="text-gray-600 text-xl ml-2 cursor-pointer" />
        </>
      )}
    </div>
  );
};

export default SenderComponent;
