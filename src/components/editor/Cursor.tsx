import React, { ReactNode } from "react";

const Cursor: React.FC<{children?: ReactNode}> = ({children}) => {
    return (
        <span className="absolute w-0.5 h-full bg-white animate-pulse">
            {children}
        </span>
    );
};

export default Cursor;