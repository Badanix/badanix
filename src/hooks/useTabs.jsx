import { useState } from 'react';

const useTabs = (initialTab) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return { activeTab, toggleTab };
};

export default useTabs;
