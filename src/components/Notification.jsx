import { FaArrowLeft, FaRegWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNotification } from '../hooks/useNotification';
import { format } from 'date-fns';

const Notification = ({ onClose, showNotification, className }) => {
  const {notifications}= useNotification()

  return (
    <div
    className={` ${className} ${
      showNotification ? 'w-11/12 mx-auto translate-x-0' : ' translate-x-full duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] z-50 animate-spin'
    }`}
    
  >
    <div className='flex justify-between items-center text-primary dark:text-secondary p-4 border-b border-gray-200 transform transition-transform'>
      <FaArrowLeft className='text-xl cursor-pointer' onClick={onClose} />
      <p className='font-semibold text-lg'>Notification</p>
      <FaRegWindowClose onClick={onClose} className='cursor-pointer text-2xl' />
    </div>
    {notifications.length > 0 ? (
      notifications.map((item) => (
        <div key={item.id} className=' flex-grow  border-2 border-gray-100 mt-2 mx-auto'>
          <h3 className='font-bold text-md mb-2'>{item.subject}</h3>
          <p className='mx-3 text-sm text-gray-400 mb-2'>{item.body}</p>
          <div className='flex justify-end mt-3'>
            <div className='flex'>
              <p className='text-sm text-gray-400 mt-1 mx-3'> {format(new Date(item.created_at), 'MMMM dd, yyyy hh:mm:ss a')}
              </p>
              <span className='bg-gray-200 text-sm text-gray-600 px-2 py-1 rounded-md'>{item.type}</span>
            </div>
            {/* <a href={item.link || '#'} className='text-gray-500 ml-2 flex'>
              <span>View More</span> <FaArrowRight className='mt-2 ml-1 text-xs' />
            </a> */}
          </div>
        </div>
      ))
    ) : (
      <div className='p-4 text-gray-500 text-center'>No notification available</div>
    )}
  </div>
);
};

Notification.propTypes = {
  onClose: PropTypes.func.isRequired,
  showNotification: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export default Notification;
