// mockApi.js
export const transactions = [
    {
      id: 1,
      img: "path/to/image1.jpg", 
      customer: "John C.",
      order: 584512,
      cost: 97.5,
      dueDate: "7 Feb, 2023",
      rating: 5,
      status: "Completed",
      statusColor: "text-green-500",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      img: "path/to/image2.jpg",
      customer: "Matthew K.",
      order: 473401,
      cost: 79.8,
      dueDate: "6 Feb, 2023",
      rating: 4,
      status: "Pending",
      statusColor: "text-yellow-500",
      statusBg: "bg-yellow-100",
    },
    {
      id: 3,
      img: "path/to/image3.jpg",
      customer: "Dontai G.",
      order: 696523,
      cost: 80.4,
      dueDate: "5 Feb, 2023",
      rating: 3,
      status: "Cancelled",
      statusColor: "text-red-500",
      statusBg: "bg-red-100",
    },
  ];
  
  // Mock GET function
  export const getTransactions = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transactions);
      }, 500); 
    });
  };
  