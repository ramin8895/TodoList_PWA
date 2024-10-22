"use client";
import React, { useState } from "react";
import AppContext from "./AppContext";

const GlobalState = ({ children }: { children: React.ReactNode }) => {
  const [newTask, setNewTask] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={{
        newTask: newTask,
        setNewTask: setNewTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default GlobalState;
