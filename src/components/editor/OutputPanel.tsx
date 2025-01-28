import React from "react";
import { motion } from "framer-motion";

type OutputPanelProps = {
    isVisible: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const OutputPanel: React.FC<OutputPanelProps> = ({ isVisible, onClose, children }) => {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isVisible ? "0%" : "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`absolute top-0 md:top-12 right-0 h-full bg-neutral-800 text-white shadow-lg lg:w-[45%] w-full sm:w-full z-10`}
        >
            <div className="w-full flex justify-between border-b-2 pt-1 px-2">
                <span>
                    Output Panel
                </span>
                <button
                    className="rounded-md p-1 text-red-500 hover:text-red-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
            <div className="whitespace-pre items-center px-2">
                {children ? children :
                <div className="flex flex-col items-center justify-center pt-4"> 
                    <p>Nothing to display!!!</p>
                    <p>Write some lox code and run it :)</p>
                    <p>Happy Coding 🚀</p>
                </div>
                }
            </div>
        </motion.div>
    );
};

export default OutputPanel;