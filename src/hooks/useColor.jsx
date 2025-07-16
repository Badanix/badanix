import { useState } from "react";

const useColor = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode((prevMode) => {
            const nextMode = !prevMode;
            // Update body class based on the nextMode value
            document.body.classList.toggle('dark', nextMode);
            return nextMode;
        });
    };

    return [toggleMode, darkMode];
};

export default useColor;
