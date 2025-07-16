// components/NotificationIcon.js
import PropTypes from 'prop-types';
import { FcSpeaker } from 'react-icons/fc';
import { IoNotifications } from 'react-icons/io5';

export const NotificationBadge = ({ icon: Icon, totalNotifications, className, onClick, spanClassName, iconClassName}) => (
    <div className={`relative ${className}`} onClick={onClick}>
      <Icon size={24} className={iconClassName} />
      {totalNotifications > 0 && (
        <span className={`absolute -top-[2px] -right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center ${spanClassName}`}>
          {totalNotifications}
        </span>
      )}
    </div>
  );

NotificationBadge.propTypes = {
  icon: PropTypes.elementType.isRequired,
  totalNotifications: PropTypes.number.isRequired,
  className: PropTypes.string,
  spanClassName:PropTypes.string,
  iconClassName:PropTypes.string,
  onClick: PropTypes.func,
};

export const SpeakerIcon = ({ className }) => (
  <FcSpeaker className={`cursor-pointer ${className}`} />
);

SpeakerIcon.propTypes = {
  className: PropTypes.string,
};

const NotificationIcon = ({ notifications, onNotificationClick,BadgeClassName }) => (
  <NotificationBadge
    icon={IoNotifications}
    totalNotifications={notifications.length}
    className={`${BadgeClassName} text-primary dark:text-secondary cursor-pointer`}
    onClick={onNotificationClick}
  />
);

NotificationIcon.propTypes = {
  notifications: PropTypes.array.isRequired,
  onNotificationClick: PropTypes.func.isRequired,
  BadgeClassName: PropTypes.string,
};

export default NotificationIcon;
