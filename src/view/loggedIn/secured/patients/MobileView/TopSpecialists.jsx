import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopSpecialists = () => {
  return (
    <div className="px-3 py-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-primary dark:text-secondary">
        <p className="font-semibold text-lg">Top E-Specialists</p>

        <div className="flex items-center text-sm font-medium">
          <Link to="/doctors" className="hover:underline">
            See all
          </Link>
          <FaChevronRight className="ml-1 mt-[2px]" size={12} />
        </div>
      </div>
    </div>
  );
};

export default TopSpecialists;
