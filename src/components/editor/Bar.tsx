import React from "react";

const Bar: React.FC = () => {
    return (
        <div className="sticky top-0 flex flex-row justify-between items-center border-b-2 py-1 px-2 bg-neutral-900">
            <button className="hover:bg-code rounded-md p-1">Copy</button>
            <button className="hover:bg-code rounded-md p-1">Console</button>
        </div>
    );
}

export default Bar;