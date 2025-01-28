import React, {useState} from "react";

interface Options {
    value: string,
    label: string,
}

const DropDown: React.FC<{loadExample: (src: string) => void}> = ({loadExample}) => {
    const options: Options[] = [
        { value: "", label: "Select an option:" },
        { value: "hello_world", label: "Hello World" },
        { value: "logical", label: "Logical Expression"},
        { value: "block_var_string", label: "Block Var String" },
        { value: "conditional", label: "Conditions"},
        { value: "loops", label: "Loops"},
        // { value: "fibonacci", label: "Fibonacci" },
    ];

    const [selectedOption, setSelectedOption] = useState("");

    const exampleCodeMap: Record<string, string> = {
        hello_world: `print "Hello, world!";`,
        logical: `// Demonstrates logical operators\nvar a = true;\nvar b = false;\n\nif (a or b and true) {\n\tprint "true and false";\n} `,
        block_var_string: `// Demonstrates block scoping,\n// variable declearation,\n// string concatination\n{\n\tvar a = "outer";\n\t{\n\t\tvar a = "inner";\n\t\ta = a + " " + "hello";\n\t\tprint a;\n\t}\n\tprint a;\n}`,
        conditional: `// Demonstrates if, and else.\n// No support for else-if\nvar number = -10;\n\nif (number >= 0) {\n\tprint "number is positive";\n} else {\n\tprint "number is negative";\n}`,
        loops: `// Using a 'while' loop to\n// calculate the sum of numbers 1 to 5\nvar sum = 0;\nvar i = 1;\nwhile (i <= 5) {\n\tsum = sum + i;\n\ti = i + 1;\n}\n\n// Print the result of the summation\nprint "Sum from 1-5 is: " + sum;\n\nprint ""; // Blank line for clarity\n\n// Using a 'for' loop to print\n// multiplication table (e.g., for 3)\nprint "Multiplication table for 3:";\nfor (var j = 1; j <= 10; j = j + 1) {\n\tprint "3 * " + j + " = " + (3 * j);\n}`,
        // fibonacci: `fun fib(n) {\n\tif (n < 2) return n;\n\treturn fib(n - 1) + fib(n - 2);\n}\nprint fib(10); // 55`,
      };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setSelectedOption(newValue);

      if (exampleCodeMap[newValue]) {
        loadExample(exampleCodeMap[newValue]);
      }
    };

    return (
        <div className="w-64">
            <label htmlFor="load-example" className="sr-only">Select an option to load code</label>
            <select
                name="load-example"
                id="load-example"
                className="bg-inherit border rounded cursor-pointer px-3 py-2 text-sm font-medium sm:px-4 sm:py-2 sm:text-base md:h-9 md:px-4 md:py-2 md:text-lg"
                value={selectedOption}
                onChange={handleSelectChange}
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