import React, {useState, useRef} from "react";

const Editor: React.FC = () => {
    const [lines, setLines] = useState<string[]>([""]);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        console.log(key);
        switch(key) {
            case "Enter":
                setLines((prev) => [...prev, ""]);
                break;
            case "Backspace":
                e.preventDefault();
                handleBackspace();
                break;
            default:
                console.log(e);
                break;
        }
    }

    const handleBackspace = () => {
        const newLines = [...lines];
        if (newLines.length == 1) {
            if (newLines[0].length == 0) {
                return;
            } else {
                const currentLine = newLines[newLines.length - 1];
                newLines[newLines.length - 1] = currentLine.substring(0, currentLine.length -1);
                setLines(newLines);
                return;
            }
        } else {
            const currentLine = newLines[newLines.length - 1];
            if (currentLine.length == 0) {
                newLines.pop();
                return;
            } else {
                newLines[newLines.length - 1] = currentLine.substring(0, currentLine.length -1);
                console.log(newLines[newLines.length - 1]);
                setLines(newLines);
            }
            return;
        }
    }

    return (
        <div className="my-2 mx-2 bg-code font-code_mono grow flex">
            <div className="bg-inherit w-auto text-right px-1 border-r-4 border-neutral-900">
                {lines.map((_, idx) => (
                  <div key={idx} className="h-6">
                    {idx + 1}
                  </div>
                ))}
            </div>
            <div
                ref={editorRef}
                className="bg-inherit text-white grow px-2 py-0 focus:outline-none"
                contentEditable={true}
                spellCheck={false}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
            >
                {lines.map((line, idx) => (
                    <div
                        key={idx}
                        className="whitespace-pre text-white h-6"
                    >
                        <span>
                            {line}
                        </span>
                    </div>   
                ))}
            </div>
        </div>
    )
};

export default Editor;