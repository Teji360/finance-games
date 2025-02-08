"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface GameContextType {
  pointsNeeded: number;
  setPointsNeeded: (points: number) => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [pointsNeeded, setPointsNeededState] = useState<number>(0);

  // Function to update state and local storage
  const setPointsNeeded = (points: number) => {
    setPointsNeededState(points);
    localStorage.setItem("pointsNeeded", points.toString()); // Persist value
  };

  // Load saved value on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem("pointsNeeded");
    if (savedPoints) {
      setPointsNeededState(parseInt(savedPoints, 10));
    }
  }, []);

  return (
    <GameContext.Provider value={{ pointsNeeded, setPointsNeeded }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
