import { FaCamera, FaVideo, FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';

const ChatComponent = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold">Chat</h2>
        <div className="flex items-center space-x-2">
          <FaVideo className="text-primary text-xl cursor-pointer" />
          <FaPhoneAlt className="text-primary text-xl cursor-pointer" />
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Example chat messages */}
        <div className="flex mb-4">
          <div className="flex-1">
            <div className="bg-gray-200 p-2 rounded-lg">
              <p>Hello!</p>
            </div>
          </div>
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full ml-2" />
        </div>
        <div className="flex mb-4 justify-end">
          <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full mr-2" />
          <div className="bg-primary text-white p-2 rounded-lg">
            <p>Hi there!</p>
          </div>
        </div>
        {/* Add more chat messages here */}
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-4 border-t border-gray-200 bg-white">
        <FaCamera className="text-primary text-xl mr-2 cursor-pointer" />
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button className="bg-primary text-white p-2 rounded-lg ml-2">
          <AiOutlineSend className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
