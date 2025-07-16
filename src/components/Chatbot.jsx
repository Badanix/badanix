import { useState, useEffect } from 'react';
import { FaMicrophone, FaCamera, FaPlus, FaKeyboard, FaChevronLeft, FaVideo, FaPhoneAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { GrGallery } from 'react-icons/gr';
import { IoDocumentAttach } from 'react-icons/io5';
import { BiSolidSend } from 'react-icons/bi';
import styles from './styles';
import { useNavigate } from 'react-router-dom';

const ChatComponent = ({ img, name, online }) => {
  const navigate =useNavigate()

  const closeModal = () => {
    navigate(-1);  
  };
  
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'other' },
    { id: 2, text: 'Hi there! How are you?', sender: 'me' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(newMessage.length > 0);
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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80  flex-col overflow-y-auto flex">
  
     
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-full h-full flex flex-col">
        {/* Chat Header */}
        <div className="fixed top-0 left-0 right-0 shadow-md bg-gray-50 p-4 flex items-center justify-between w-full z-50">
          <div className="flex items-center space-x-4">
          <FaChevronLeft className="text-xl cursor-pointer text-primary" onClick={closeModal} />
          <img src={img} alt="User" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <h4 className="text-lg font-semibold text-primary">{name}</h4>
              <p className="text-gray-300 text-sm capitalize">
                {online ? 'Online' : isTyping ? `${name.split(' ').slice(-1)} is Typing...` : 'Last seen today at 22:53'}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <FaVideo className="text-xl cursor-pointer text-primary" onClick={() => console.log('Starting video call')} />
            <FaPhoneAlt className="text-xl cursor-pointer text-primary" onClick={() => console.log('Starting voice call')} />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 pt-16 pb-20 px-4 overflow-y-auto">
          <div className='items-center text-center bg-gray-200 m-4 rounded-xl p-4'>
            <h4 className='text-primary font-semibold text-lg'>Beginning of counseling</h4>
            <p className='text-gray-400'>You can talk to {name} what&apos;s wrong </p>
          </div>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`p-2 rounded-md ${message.sender === 'me' ? 'bg-primary text-white' : 'bg-gray-200 text-black'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className={`fixed bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 z-50 mb-[50px]`}>
          {/* Default Display */}
          <div className={`flex items-center space-x-4 ${isExpanded ? 'mb-[120px]' : ''} transition-all duration-300`}>
            {isExpanded ? (
              <>
                <FaKeyboard className="text-3xl mr-2 cursor-pointer text-primary -mt-3" onClick={handleToggle} />
              </>
            ) : (
              <FaPlus className="text-primary -mt-3 text-xl mr-2 cursor-pointer" onClick={handleToggle} />
            )}
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={`flex-1 p-2 border border-gray-300 rounded-md mr-2 transition-all ${styles.inputStyle}`}
              placeholder="Type a message"
            />
            {isTyping ? (
              <BiSolidSend className="text-primary text-2xl cursor-pointer" onClick={handleSendMessage} />
            ) : (
              <>
                <FaMicrophone className="text-primary text-xl cursor-pointer -mt-3" />
                <FaCamera className="text-primary text-2xl cursor-pointer -mt-3" onClick={() => { /* Handle camera click */ }} />
              </>
            )}
          </div>
          {/* Expanded Toggle Background */}
          {isExpanded && (
            <div className="absolute bottom-0 left-0 flex justify-around items-center bg-gray-50 p-4 w-full space-y-4 my-4">
              <div className="flex flex-col items-center space-y-2 mt-4">
                <div className="p-4 bg-primary rounded-full flex items-center justify-center">
                  <GrGallery className="text-white cursor-pointer" size={30} onClick={() => { /* Handle gallery click */ }} />
                </div>
                <p className="mt-2 text-md font-bold text-primary">Photos</p>
              </div>
              <div className="flex flex-col items-center space-y-2 -mt-8">
                <div className="p-4 bg-primary rounded-full flex items-center justify-center">
                  <FaCamera className="text-white cursor-pointer" size={30} onClick={() => { /* Handle camera click */ }} />
                </div>
                <p className="mt-2 text-md font-bold text-primary">Camera</p>
              </div>
              <div className="flex flex-col items-center space-y-2 -mt-[20px]">
                <div className="p-4 bg-primary rounded-full flex items-center justify-center">
                  <IoDocumentAttach className="text-white cursor-pointer" size={30} onClick={() => { /* Handle document click */ }} />
                </div>
                <p className="mt-2 text-md font-bold text-primary">Document</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    
    
  );
};

ChatComponent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

export default ChatComponent;
