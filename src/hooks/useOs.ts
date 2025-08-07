import { useEffect, useState } from "react";

// how to use
// const macOS = useOs()
// returns true/false

const useOs = () => {
  // get Os
  const [os, setOs] = useState(false);
  useEffect(() => {
    setOs(navigator.userAgent.includes("Mac"));
  }, []);

  return os;
};

export default useOs;
