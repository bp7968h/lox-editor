import React from "react";
import Button from "./shared/Button";
import DropDown from "./shared/DropDown";

interface ToolBarProps {
    onRun: () => void, 
    onLoad: (exampleCode: string) => void
    showModal: () => void, 
}

const ToolBar: React.FC<ToolBarProps> = ({onRun, onLoad, showModal}) => {
    return (
        <nav className="py-2 px-6 flex flex-wrap">
            <div className="pb-2 md:pb-0 w-full md:w-1/3 flex md:space-x-8 justify-between md:justify-normal">
                <h1 className="text-2xl font-bold">Lox Editor</h1>
                <Button 
                    onClick={() => showModal()} 
                    label="Help" 
                    bg_color="blue" 
                />
            </div>
            <div className="w-1/2 md:w-1/3 flex items-center justify-start md:justify-center ">
                <DropDown loadExample={onLoad} />
            </div>
            <div className="w-1/2 md:w-1/3 md:text-right flex items-center justify-end space-x-4">
                <Button 
                    onClick={() => console.error("Not Yet Implemented")} 
                    label="Share" 
                    bg_color="destructive" 
                    disabled={true} 
                />
                <Button 
                    onClick={() => onRun()} 
                    label="Run" 
                    bg_color="group" 
                />
            </div>
        </nav>
    )
};

export default ToolBar;