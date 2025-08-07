import { useRef } from "react";

export const useRestartSetTimeout = () => {
  const ref = useRef<ReturnType<typeof setTimeout>>(null);
  return (timer: ReturnType<typeof setTimeout>) => {
    clearTimeout(ref.current!);
    ref.current = timer;
  };
};
