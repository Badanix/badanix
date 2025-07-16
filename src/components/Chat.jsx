import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaRegHandPointRight, FaRegTimesCircle, FaTimes, FaUserAstronaut, FaUserTie } from 'react-icons/fa';

import { BsEmojiSunglassesFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";

import { MdDeleteForever } from "react-icons/md";
import { COMMON_QUESTIONS, NAMES,AI_MESSAGES } from './Constants';



const Chat = ({ ChatIcon: Icon, toggleClassName,visibleClassName, size }) => {
  const socket = useRef(null); // UseRef for socket
  const [messages, setMessages] = useState([]);
    const [liveAgent, setLiveAgent] = useState(null); // To track the live agent state
    const [userName, setUserName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [isDefaultVisible, setIsDefaultVisible] = useState(true); // Track if default message should be visible

  const [textareaValue, setTextareaValue] = useState('');
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [clearChatPopup, setClearChatPopup] = useState(false);
  const [iconSize, setIconSize] = useState(25);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640); // 640px is the default breakpoint for 'sm' in Tailwind CSS

  

  const buttonRef = useRef(null);
  const textareaRef = useRef(null);



  const detectTimezoneGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };
  const handleRatingClick = () => {
    setShowRatePopup(true);
    setShowFeedbackPopup(false);
    setShowThankYouPopup(false);
  };
  const handleClearChatClick = () => {
    setClearChatPopup({});
  }

  const handleFeedbackClick = () => {
    setShowRatePopup(false);
    setShowFeedbackPopup(true);
  };

  const handleSubmitFeedback = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowFeedbackPopup(false);
      setShowThankYouPopup(true);
    }, 2000); // 5 seconds delay
  };

  const handleClose = () => {
    setShowRatePopup(false);
    setShowFeedbackPopup(false);
    setShowThankYouPopup(false);
    setClearChatPopup(false)
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setIsTyping(event.target.value.length > 0);
    setTextareaValue(event.target.value);

  };
  const handleQuestionClick = (question) => {
    setTextareaValue(question);
    textareaRef.current.focus(); 
    
    // Automatically send the message as if "Enter" was pressed
    setTimeout(() => {
      const enterEvent = new KeyboardEvent('keydown', { 
        key: 'Enter', 
        code: 'Enter', 
        charCode: 13, 
        keyCode: 13, 
        bubbles: true 
      });
      textareaRef.current.dispatchEvent(enterEvent);
    }, 1); 
  };
  
  const handleClearChat = () => {
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessages([]);
      setIsDefaultVisible(true); 
      setClearChatPopup(false);
    }, 2000);

  };

  const handleCloseChat = () => {
    setIsVisible(false);
    setIsDefaultVisible(true); // Show default message when chat is closed
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Do nothing on component mount
  }, []);
  
  const getResponseForMessage = (message) => {
    const lowerCaseMessage = message.toLowerCase();
  
    // Check if the message includes any of the keywords from AI_MESSAGES
    for (const key in AI_MESSAGES) {
      if (AI_MESSAGES[key].keywords) {
        for (const keyword of AI_MESSAGES[key].keywords) {
          if (lowerCaseMessage.includes(keyword)) {
            return AI_MESSAGES[key].text;
          }
        }
      }
    }
    
    return null; // Return null if no match found
  };
  
  const handleSendMessage = async () => {
    const message = textareaRef.current.value.trim();
  
    if (message) {
      // Add user message to the chat
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, sender: 'user' }
      ]);
  
      // Clear the textarea
      textareaRef.current.value = '';
      setIsTyping(false);
      setTextareaValue(''); // Clear textarea value here
  
      // Check for predefined responses
      const predefinedResponse = getResponseForMessage(message);
  
      if (predefinedResponse) {
        // Add predefined response to the chat
        setMessages(prevMessages => [
          ...prevMessages,
          { text: predefinedResponse, sender: 'ai' }
        ]);
        return; // Exit early after adding the predefined response
      }
  
      // Handle user name and send a personalized greeting if name is not set
      if (!userName) {
        setUserName(message);
        const greeting = detectTimezoneGreeting();
        setMessages(prevMessages => [
          ...prevMessages,
          AI_MESSAGES.WELCOME(message, greeting)
        ]);
        return; // Exit early after sending the greeting
      }
  
      // Send the user message to the live agent or AI if no predefined response
      if (liveAgent) {
        socket.current.emit('user-message', { text: message, sender: 'user' });
      } else {
        try {
          const websiteInfo = await axios.get(`https://your-website-api.com/search?q=${encodeURIComponent(message)}`);
          const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [
              ...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text })),
              { role: 'user', content: message },
              { role: 'system', content: `Here's some information from our website: ${websiteInfo.data}` }
            ],
          }, {
            headers: {
              'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
              'Content-Type': 'application/json',
            },
          });
  
          const aiMessage = aiResponse.data.choices[0].message.content;
          setMessages(prevMessages => [
            ...prevMessages,
            { text: aiMessage, sender: 'ai' }
          ]);
        } catch (error) {
          console.error(error);
          setMessages(prevMessages => [
            ...prevMessages,
            AI_MESSAGES.DEFAULT_RESPONSE
          ]);
          socket.current.emit('request-live-agent');
        } finally {
          setIsTyping(false);
        }
      }
    }
  };
  
  
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent adding a new line
      handleSendMessage('');
      setTextareaValue('');

    }
  };
  useEffect(() => {
    // Connect to the backend WebSocket server
    socket.current = io('https://your-backend-url.com'); // Replace with your backend URL

    // Listen for live agent connection events
    socket.current.on('live-agent-connected', (agent) => {
      setLiveAgent(agent); // Set the live agent info when they connect
    });

    return () => {
      // Clean up the socket connection on component unmount
      socket.current.disconnect();
    };
  }, []);
      // Simulate AI response
    //   const lowerCaseMessage = message.toLowerCase();
    //   let aiMessage = '';
  
    //   if (lowerCaseMessage.includes('hosting')) {
    //     aiMessage = "I see you're interested in hosting. Can you tell me more about your project needs?";
    //   } else if (lowerCaseMessage.includes('price')) {
    //     aiMessage = "Our hosting plans start at $5 per month. Would you like to know more about the features included?";
    //   } else {
    //     aiMessage = `Hi! I’m the  AI sales expert 🤖. I’m here to help you choose the perfect hosting plan for your project. Tell me about your needs, and I’ll guide you through selecting the best hosting solution.`;
    //   }
  
      // Simulate AI response
     



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // 640px is the default breakpoint for 'sm' in Tailwind CSS
        setIconSize(40);
      } else {
        setIconSize(25);
      }
    };


    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial size based on the window width

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial size based on the window width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

 
  return (
    <div className="relative">
      {Icon &&(<Icon  
      onClick={toggleVisibility} className={toggleClassName} size={size}
      
    />)}
    
     
    
   
    {/* Conditional Chat Box */}
    {isVisible && (
      <div className={visibleClassName}>
        {/* Header */}
        <div className="flex justify-between sm:p-5 items-center mb-2 sticky top-0 bg-white z-10">
          <p>🤖 AI assistant
            <span className='bg-gray-300 sm:p-1 font-bold text-gray-500 rounded-md ml-2'>Beta</span>
          </p>
          <div className='flex sm:items-center sm:space-x-2'>
          <div className="relative inline-block group">
      {/* Feedback Button */}
      <BsEmojiSunglassesFill
        className="text-yellow-500 hover:bg-gray-200 px-1 sm:p-2 cursor-pointer rounded-md"
        size={iconSize}

        onClick={handleRatingClick}
        ref={buttonRef}
      />
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 p-2 hidden group-hover:block bg-green-700 text-white font-serif text-sm rounded whitespace-nowrap">
        Leave a Feedback
      </div>

      {/* Rating Popup */}
      {showRatePopup && (
      <div
      className="absolute bg-white  px-6 py-[50px] rounded-lg shadow-lg w-80 sm:w-[450px] z-50 text-center mt-7 border-2 border-gray-300"
      style={{
        top: 'calc(100% + 2px)',
        left: '50%',
        transform: isDesktop ? 'translateX(-70%)' : 'translateX(-80%)',
      }}

    >
        <div className='flex justify-between'><h3 className="text-[20px] font-bold mx-6  mb-4  primary-color">Rate your experience using AI Assistant</h3><FaTimes size={30}onClick={handleClose} className='mt-1
         primary-color cursor-pointer' />
        </div>
          
         
          <div className="flex justify-between mt-3">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i + 1}
                className=" px-1 py-2 sm:px-3 sm:py-5 mr-1 border-2 border-gray-500 rounded-md hover:primary-bgcolor hover:text-white text-center"
                onClick={handleFeedbackClick}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs">Poor</span>
            <span className="text-xs">Excellent</span>
          </div>
        </div>
      )}

      {/* Feedback Form Popup */}
      {showFeedbackPopup && (
        <div
        className="absolute bg-white  px-6 py-[50px] rounded-lg shadow-lg w-80 sm:w-[450px] z-50 text-center mt-7 border-2 border-gray-300"
        style={{
          top: 'calc(100% + 2px)',
          left: '50%',
          transform: isDesktop ? 'translateX(-70%)' : 'translateX(-80%)',
        }}
  
      >
         
          <div className='flex justify-between'><FaChevronLeft  onClick={handleRatingClick} size={30} className='mt-1
         primary-color cursor-pointer' />

          <h3 className="text-[20px] font-bold mx-6  mb-4  primary-color">How can we improve your experience?</h3>
          <FaTimes size={30} onClick={handleClose} className='mt-1
         primary-color cursor-pointer' />
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded text-lg focus:outline-none focus:primary-border-color text-gray-600"
            placeholder="Write your feedback (optional)..."
          ></textarea>
          <div className="flex justify-end items-center mt-4">
           
            <button
              className="primary-bgcolor text-white py-2 px-4 rounded hover:bg-[#62cff4] relative"
              onClick={handleSubmitFeedback}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Thank You Popup */}
      {showThankYouPopup && (
       
        
       <div
       className="absolute bg-white  px-6 py-[50px] rounded-lg shadow-lg w-80 sm:w-[450px] z-50 text-center mt-7 border-2 border-gray-300"
       style={{
         top: 'calc(100% + 2px)',
         left: '50%',
         transform: isDesktop ? 'translateX(-70%)' : 'translateX(-80%)',
       }}
 
     >
        <div className='flex justify-end'>
  <FaTimes size={20} onClick={handleClose} className='
         primary-color cursor-pointer -mt-7' />
          </div>
        <FaRegHandPointRight className=' inline-flex justify-center mt-9 primary-color ' size={40} />

          <p className="text-2xl my-7  mb-[50px]">Thank you for your feedback!</p>
          
        </div>
       
      )}
    </div>
            <div className="relative inline-block group">

            <MdDeleteForever className='text-tomato cursor-pointer hover:bg-gray-200 px-1 sm:p-2  rounded-md'       size={iconSize}
 onClick={handleClearChatClick}  ref={buttonRef} />
            <div className="absolute top-full left-1/2 transform sm:p-2 -translate-x-1/2 mb-2 hidden group-hover:block  bg-red-700 text-white font-serif text-sm rounded mt-1 whitespace-nowrap">
    Restart
  </div>
   {/* Thank You Popup */}
   {clearChatPopup && (
       
        
       <div
       className="absolute bg-white  px-6 py-[50px] rounded-lg shadow-lg w-80 sm:w-[450px] z-50 text-center mt-7 border-2 border-gray-300"
       style={{
         top: 'calc(100% + 2px)',
         left: '50%',
         transform: isDesktop ? 'translateX(-80%)' : 'translateX(-85%)',
       }}
 
     >
     
       <div className='flex justify-end'>
 <FaTimes size={20} onClick={handleClose} className='
        primary-color cursor-pointer -mt-7' />
         </div>
         <h3 className="text-[26px] font-bold  mb-4  primary-color text-start">Clear chat</h3>

         <p className="text-lg my-9 text-center  mb-[50px]">After clearing history you won’t be able to access previous chats.</p>
         <div className='flex justify-between'>  <button  onClick={handleClose} className='bg-gray-500 font-semibold text-lg text-white p-3 rounded-md'>Cancel</button>
         <button className='primary-bgcolor font-semibold text-lg text-white px-4 py-2 rounded-md'  onClick={handleClearChat}   disabled={isLoading} >   {isLoading ? (
            <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
              ) : (
                'Clear chat'
              )}</button></div>
        
       </div>
      
     )}
            </div>
            <div className="relative inline-block group">
            <FaRegTimesCircle
      className="primary-color hover:bg-gray-200 px-1 sm:p-2 cursor-pointer rounded-md"
      onClick={handleCloseChat}
      size={iconSize}
    />

            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 p-2 hidden group-hover:block bg-gray-500 text-white font-serif text-sm rounded whitespace-nowrap">
            Close
  </div>
</div>

          </div>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
        {isDefaultVisible && messages.length === 0 && (
 <div>
 <div className="flex items-start  m-3 mb-4">
    <FaUserAstronaut className="mr-2 chatbot-bg text-white p-1 rounded-lg mt-3" size={40} />
    <p className="flex-1 bg-gray-300 p-2 rounded-md my-3">
      Hi! I’m the {NAMES.SITE_TITLE} AI sales expert 🤖. I’m here to help you choose the perfect hosting plan for your project. Tell me about your needs and I’ll guide you through selecting the best hosting solution.
    </p>
   
  </div>
<p className='text-start font-semibold primary-color'>Common questions are:</p>
{
    COMMON_QUESTIONS.map((item,index)=>(
<div key={index} data-v-09c87304="" className="border border-gray-200 cursor-pointer mt-[8px] py-[8px] px-[8px] sm:px-[12px] rounded-2xl hover:primary-color hover:primary-border-color mb-3" onClick={() => handleQuestionClick(item.question)}>{item.question}</div>
    ))

  
}

</div> 
 )}
 {messages.map((msg, index) => (
   <div key={index} className="flex items-start mb-4 m-3">
     {msg.sender === 'ai' ? (
       <FaUserAstronaut className="mr-2 chatbot-bg text-white p-1 rounded-lg mt-3" size={40} />
     ) : (
       <FaUserTie className="mr-2 primary-bgcolor text-white p-1 rounded-lg mt-3" size={40} />
     )}
     <p className={`flex-1 p-2 rounded-md my-3 ${msg.sender === 'ai' ? 'bg-gray-300' : 'bg-blue-300 text-white'}`}>
    {msg.text}     </p>
   </div>
 ))}
  </div>
 <div>
   
</div>

  
  
          {isTyping && (
            <div className="text-left mb-2">
              <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">Typing...</span>
            </div>
          )}

          {/* Input Area */}
          <div className="flex items-center mt-2 relative">
          <textarea
   className={`w-full p-4 border rounded-2xl transition-colors duration-200 primary-border-color focus:outline-none ${
     isFocused ? 'primary-border-color' : 'border-gray-300'
   }`}
              placeholder="Type a message..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={textareaValue}
              ref={textareaRef}
            ></textarea>
            <button
              className="primary-bgcolor text-white p-2 ml-2 rounded-full"
              onClick={handleSendMessage}
            >
              <IoSendSharp size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  
  );
};

Chat.propTypes = {
  ChatIcon: PropTypes.elementType, // This specifies that ChatIcon should be a React component
  toggleClassName: PropTypes.string,
  visibleClassName:PropTypes.string,
  size: PropTypes.number
};
export default Chat;
