import useColor from "../hooks/useColor";
import { FaSun, FaMoon } from "react-icons/fa"; // Import both icons

const ToggleTheme = () => {
    const [toggleMode, darkMode] = useColor();

    return (
        <div>
            {/* Render Moon Icon for Dark Mode, and Sun Icon for Light Mode */}
            {darkMode ? (
                <FaSun
                    size={20}
                    className="cursor-pointer text-secondary" // Adjust your Tailwind classes as needed
                    onClick={toggleMode}
                />
            ) : (
                <FaMoon
                    size={20}
                    className="cursor-pointer text-primary" // Adjust your Tailwind classes as needed
                    onClick={toggleMode}
                />
            )}
        </div>
    );
};

export default ToggleTheme;
