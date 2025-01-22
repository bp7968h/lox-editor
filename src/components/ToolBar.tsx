import React from "react";
import Button from "./shared/Button";
import DropDown from "./shared/DropDown";

const ToolBar: React.FC = () => {
    return (
        <nav className="py-2 px-6 flex flex-wrap">
            <div className="pb-2 md:pb-0 w-full md:w-1/3 flex md:space-x-8 justify-between md:justify-normal">
                <h1 className="text-2xl font-bold">Lox Editor</h1>
                <Button onClick={() => console.log("help")} label="Help" bg_color="blue" />
            </div>
            <div className="w-1/2 md:w-1/3 flex items-center justify-start md:justify-center ">
                <DropDown />
            </div>
            <div className="w-1/2 md:w-1/3 md:text-right flex items-center justify-end space-x-4">
                <Button onClick={() => console.log("share")} label="Share" bg_color="destructive" />
                <Button onClick={() => console.log("run")} label="Run" bg_color="group" />
            </div>
        </nav>
    )
};

export default ToolBar;