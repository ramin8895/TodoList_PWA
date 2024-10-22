"use client";
import AppContext from "./AppContext";
import { useContext } from "react";
const useAppContext = () => {
    return useContext(AppContext)
};
export default useAppContext