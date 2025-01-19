import React from "react";
import Button from "./shared/Button";

const ToolBar: React.FC = () => {
    return (
        <nav className="bg-gray-400 flex flex-col md:flex-row md:justify-between md:items-center p-4 space-y-4 md:space-y-0">
            <div className="w-full md:w-fit flex flex-row justify-between items-center md:space-x-8">
                <h1 className="text-2xl font-bold">Lox Editor</h1>
                <Button onClick={() => console.log("help")} label="Help" bg_color="blue" />
            </div>
            <div className="w-full md:w-fit flex justify-between items-center md:space-x-32 lg:space-x-96">
                <select
                    name="load-example"
                    id="load-example"
                    className="border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => console.log(e.target.value)}
                >
                    <option value="hello_world">Hello World</option>
                    <option value="palindrome">Palindrome</option>
                </select>
                <div className="flex space-x-4 items-center">
                    <Button onClick={() => console.log("share")} label="Share" bg_color="blue" />
                    <Button onClick={() => console.log("run")} label="Run" bg_color="blue" />
                </div>
            </div>
        </nav>
    )
};

export default ToolBar;