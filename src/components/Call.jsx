// components/CallComponent.js
// import React from 'react';

const CallComponent = () => {
  const startCall = () => {
    // Logic to initiate a live call using WebRTC or third-party services
    console.log('Starting live call...');
  };

  return (
    <div className="call-container">
      <h2>Live Call</h2>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default CallComponent;
