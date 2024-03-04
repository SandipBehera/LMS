import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

const useDateConverter = (initialDate) => {
  const [convertedDate, setConvertedDate] = useState(null);

  useEffect(() => {
    const convertDate = () => {
      if (initialDate) {
        try {
          const parsedDate = parseISO(initialDate);
          const formattedDate = format(parsedDate, "dd-MM-yyyy");
          setConvertedDate(formattedDate);
        } catch (error) {
          console.error("Invalid date format:", error.message);
          setConvertedDate(null);
        }
      } else {
        setConvertedDate(null);
      }
    };

    convertDate();
  }, [initialDate]);

  return convertedDate;
};

export default useDateConverter;
