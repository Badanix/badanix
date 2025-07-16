
const Reports = () => {
  const reports = [
    { report: 'Eye Sight', date: '24/3/24' },
    { report: 'Cardiology', date: '14/4/24' },
    { report: 'Brain Test', date: '23/5/24' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold mb-4">My Reports</h3>
      <ul>
        {reports.map((report, idx) => (
          <li key={idx} className="flex justify-between mb-2">
            <span>{report.report}</span>
            <span>{report.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
