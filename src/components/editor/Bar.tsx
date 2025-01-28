import React, { useState, useRef, useEffect } from "react";

type BarProps = {
    onConsoleClick: () => void;
    onCopy: () => void;
    isOutputVisible: boolean
  };

const Bar: React.FC<BarProps> = ({ onConsoleClick, isOutputVisible, onCopy }) => {
    const [copyText, setCopyText] = useState<"Copy" | "Copied ✔✔">("Copy");
    const timeoutRef = useRef<number | null>(null);

    const handleCopyClick = () => {
        onCopy();
        setCopyText("Copied ✔✔");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    
        timeoutRef.current = window.setTimeout(() => {
            setCopyText("Copy");
            timeoutRef.current = null;
        }, 2000);
    };

    useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
    }, []);

    return (
        <div className="sticky top-0 flex flex-row justify-between items-center border-b-2 py-1 px-2 bg-neutral-900">
            <button 
                className="hover:bg-code rounded-md p-1"
                onClick={handleCopyClick}
            >
                {copyText}
            </button>
            {!isOutputVisible && 
                <button 
                    className="hover:bg-code rounded-md p-1"
                    onClick={onConsoleClick}
                >
                    Console
                </button>
            }
        </div>
    );
}

export default Bar;