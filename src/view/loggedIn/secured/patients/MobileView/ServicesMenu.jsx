import { Link } from "react-router-dom";
import { SERVICES } from "../../../../../components/Constants";

const ServicesMenu = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between mt-3 px-3 text-primary dark:text-secondary">
        <p className="font-semibold text-lg">Services</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 px-3">
        {SERVICES.map((service, index) => (
          <Link
            key={index}
            to={service.link}
            className="text-center flex flex-col items-center mb-4"
          >
            <div
              className={`p-2 rounded-full shadow-xl flex justify-center items-center text-white dark:text-white border border-gray-200 dark:bg-secondary bg-primary ${service.pt}`}
            >
              {service.icon}
            </div>
            <p className="text-sm text-primary dark:text-secondary text-center font-bold mt-2">
              {service.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesMenu;
