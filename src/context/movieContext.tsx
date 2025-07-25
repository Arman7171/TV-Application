import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface MovieContextType {
  id: string;
  updateId: (newId: string) => void;
}

const movieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<string>(sessionStorage.getItem("movieId") || "");

  const updateId = (newId: string) => {
    sessionStorage.setItem("movieId", newId);
    setId(newId);
  };
  useEffect(() => {
    const storedId = sessionStorage.getItem("movieId");
    if (storedId) {
      setId(storedId);
    }
  });
  return (
    <movieContext.Provider value={{ id, updateId }}>
      {children}
    </movieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(movieContext);
  if (!context) {
    throw new Error("provider error");
  }
  return context;
};
