import { useState, useEffect } from 'react';

const useInitials = (name) => {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    const getInitials = (name) => {
 
      if (name.includes(" ")) {
        const words = name.split(" ");
        return words
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
      } else {

        return name.slice(0, 2).toUpperCase();
      }
    };

    setInitials(getInitials(name));
  }, [name]);

  return initials;
};

export default useInitials;
