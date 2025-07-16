import PropTypes from 'prop-types';
import { isAfter,} from 'date-fns';

const UpcomingItems = ({ ScheduleLists, MedicationLists }) => {
  // Get current time
  const now = new Date();

  // Function to get the upcoming item
  const getUpcomingItem = (items) => {
    return items.find(item => {
      const itemDateTime = new Date(`${item.date}T${item.time || ''}`);
      return isAfter(itemDateTime, now) || itemDateTime.getTime() === now.getTime(); // Include current time
    });
  };

  // Determine upcoming items
  const upcomingSchedule = getUpcomingItem(ScheduleLists);
  const upcomingMedication = getUpcomingItem(MedicationLists);

  return { upcomingSchedule, upcomingMedication };
};

UpcomingItems.propTypes = {
  ScheduleLists: PropTypes.array.isRequired,
  MedicationLists: PropTypes.array.isRequired,
};

export default UpcomingItems;
