import React, {useState} from "react";

interface Options {
    value: string,
    label: string,
}

const DropDown: React.FC = () => {
    const options: Options[] = [
        { value: "", label: "Select an option:" },
        { value: "hello_world", label: "Hello World" },
        { value: "palindrome", label: "Palindrome" },
        { value: "fibonacci", label: "Fibonacci" },
    ];

    const [selectedOption, setSelectedOption] = useState("");

    return (
        <div className="w-64">
            <label htmlFor="load-example" className="sr-only">Select an option to load code</label>
            <select
                name="load-example"
                id="load-example"
                className="bg-inherit border rounded cursor-pointer px-3 py-2 text-sm font-medium sm:px-4 sm:py-2 sm:text-base md:h-9 md:px-4 md:py-2 md:text-lg"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-inherit"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="sr-only" aria-live="polite">
                {selectedOption && `You selected ${selectedOption} example code`}
            </div>
    </div>
    )
}

export default DropDown;