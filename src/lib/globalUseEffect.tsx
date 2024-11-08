import useAppState from "@/hooks/useAppState";
import React, { createContext, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Define the context type
interface UseEffectContextType {}

// Create the context with the defined type
const UseEffectContext = createContext<UseEffectContextType | undefined>(
  undefined
);

// Define the props type for the provider component
interface UseEffectStateProps {
  children: ReactNode;
}

// Define the provider component with typed props
const UseEffectState: React.FC<UseEffectStateProps> = (props) => {
  const { setProgress } = useAppState();
  const location = useLocation();

  useEffect(() => {
    setProgress(10);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
    // eslint-disable-next-line
  }, [location]);

  return (
    <UseEffectContext.Provider value={{}}>
      {props.children}
    </UseEffectContext.Provider>
  );
};

export { UseEffectState as default, UseEffectContext };
