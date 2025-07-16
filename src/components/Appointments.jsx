
const Appointments = () => {
  const appointments = [
    { doctor: 'Dr. Cody Fisher', specialization: 'Diabetes', date: '10-June-2024', time: '9:30AM', status: 'Active' },
    { doctor: 'Dr. Eleanor Pena', specialization: 'Cardiologist', date: '16-July-2024', time: '10:00AM', status: 'Completed' },
    { doctor: 'Dr. Bessie Cooper', specialization: 'Brain Specialist', date: '20-May-2024', time: '11:00AM', status: 'Cancelled' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4">Appointments</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Doctor</th>
            <th className="pb-2">Specialization</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Time</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{appointment.doctor}</td>
              <td className="py-2">{appointment.specialization}</td>
              <td className="py-2">{appointment.date}</td>
              <td className="py-2">{appointment.time}</td>
              <td className={`py-2 ${appointment.status === 'Active' ? 'text-green-500' : appointment.status === 'Cancelled' ? 'text-red-500' : 'text-yellow-500'}`}>
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
