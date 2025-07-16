import { useLocation } from "react-router-dom";

const useTargetUrl = () => {
    const location = useLocation(); 

    const getTargetUrl = (urlMapping) => {
        for (const [condition, targetUrl] of urlMapping) {
            if (condition(location.pathname)) {
                return targetUrl;
            }
        }
        return null; // Return null for unmatched conditions
    };

    return getTargetUrl; // Return the function for external use
};

export default useTargetUrl;
