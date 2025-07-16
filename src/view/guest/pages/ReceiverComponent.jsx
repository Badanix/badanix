// ReceiverComponent.jsx

import  { useState } from 'react';
import { FaPaperclip, FaSmile, FaMicrophone, FaCamera } from 'react-icons/fa';

const ReceiverComponent = ({ messages, typingStatus }) => {
  return (
    <div className="flex flex-col h-screen mx-auto border mb-7 border-gray-300 rounded-xl">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/50"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-lg font-semibold">John Doe</h3>
            {typingStatus && <p className="text-gray-500 text-sm">Sender is typing...</p>}
          </div>
        </div>
      </div>

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

      <div className="flex items-center p-4 border-t border-gray-200">
        <FaPaperclip className="text-gray-600 text-xl mr-2 cursor-pointer" />
        <FaSmile className="text-gray-600 text-xl mr-2 cursor-pointer" />
        <FaCamera className="text-blue-500 text-2xl cursor-pointer" />
        <FaMicrophone className="text-gray-600 text-xl ml-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default ReceiverComponent;
