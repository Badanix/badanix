import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VideoCall() {
  const [userType, setUserType] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [jitsiLink, setJitsiLink] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get `link` and `userType` from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const link = params.get("link");
    const type = params.get("userType");

    if (link) {
      setJitsiLink(link);
    } else {
      alert("No video link found.");
      navigate("/");
    }

    if (type === "doctor" || type === "patient") {
      setUserType(type);
    } else {
      alert("Invalid user type. Redirecting to dashboard.");
      if (type === "doctor") {
        navigate("/doctor/dashboard");
      } else if (type === "patient") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [location, navigate]);

  // Handle start call
  const handleStartCall = () => {
    setShowInstructions(false);

    if (jitsiLink) {
      const jitsiUrl = `${jitsiLink}#config.prejoinPageEnabled=false&config.disableChat=true&config.disableInviteFunctions=true&config.filmStripOnly=true&config.toolbarButtons=%5B%22microphone%22%2C%22camera%22%2C%22desktop%22%2C%22raisehand%22%2C%22hangup%22%5D`;
      window.open(jitsiUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Invalid video link.");
    }
  };

  // Auto-end logic
  useEffect(() => {
    if (!userType) return;

    const warningTimer = setTimeout(() => {
      alert(
        "This meeting will end in 10 minutes. Please wrap up your discussion."
      );
    }, 20 * 60 * 1000); // 20 minutes

    const endMeetingTimer = setTimeout(() => {
      alert("The consultation has ended. You will be redirected.");
      if (userType === "patient") {
        navigate("/DoctorRate");
      } else {
        navigate("/doctor/dashboard");
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(endMeetingTimer);
    };
  }, [userType, navigate]);

  // Show loading if not ready
  if (!userType || !jitsiLink) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-gray-100">
      {/* Modal Instructions */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Video Call Instructions
            </h2>
            <p className="text-sm whitespace-pre-line mb-6 leading-6 text-gray-700">
              {userType === "doctor"
                ? `1. Ensure you have a stable internet connection.\n2. Use this time to assess the patient’s condition.\n3. Minimize video call to take notes.\n4. Direct the patient to hospital/lab/pharmacy as needed.\n5. You can use the Jitsi app or browser.\n6. End the call by closing the tab.`
                : `1. Find a quiet place for the call.\n2. Ensure your camera and mic are working.\n3. Clearly describe symptoms to the doctor.\n4. After the call, check for your prescription.\n5. You can use the Jitsi app or browser.`}
            </p>
            <button
              onClick={handleStartCall}
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
            >
              Start Video Call
            </button>
          </div>
        </div>
      )}

      {/* Main Info */}
      <p className="text-lg text-blue-700 mb-6 text-center">
        Jitsi Meeting is Open in a New Tab
      </p>

      {/* Floating Buttons */}
      <div className="absolute bottom-8 flex gap-4">
        {userType === "doctor" && (
          <button
            onClick={() => navigate("/doctor/PatientNote")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Take Notes
          </button>
        )}
        {userType === "patient" && (
          <button
            onClick={() => navigate("/DoctorRate")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoCall;
