
const StatusCards = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Body Temperature</p>
        <h3 className="text-blue-500 text-2xl">36.2 c</h3>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Pulse</p>
        <h3 className="text-green-500 text-2xl">85 bpm</h3>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Blood Pressure</p>
        <h3 className="text-red-500 text-2xl">85/70 mm/Hg</h3>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Breathing Rate</p>
        <h3 className="text-yellow-500 text-2xl">15 breaths/min</h3>
      </div>
    </div>
  );
};

export default StatusCards;
