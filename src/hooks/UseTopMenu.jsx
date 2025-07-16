import { useState } from 'react'

const UseTopMenu = () => {

    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const toggleTopbar=()=>{
      setProfileDropdownOpen(prev => !prev)
    }
    return { profileDropdownOpen, toggleTopbar };

}

export default UseTopMenu