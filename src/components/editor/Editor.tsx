import React, {useState, useRef} from "react";
import LineNumber from "./LineNumber";
import LineCode from "./LineCode";

export interface Line {
    id: number,
    code: string,
}

export interface Cursor {
    line: number,
    column: number,
}

const Editor: React.FC = () => {
    const [lines, setLines] = useState<Line[]>([{id: 1, code: ''}]);
    const [cursorPosition, setCursorPosition] = useState<Cursor>({ line: 1, column: 0 });
    const editorRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const currentLineIndex = cursorPosition.line;
        const currentLine = lines[currentLineIndex - 1];

        switch(event.key) {
            case "Enter":
                setLines((prev) => {
                    const updatedLines = prev.map((line) => 
                        line.id === currentLineIndex
                            ? { ...line, code: line.code.concat("\n") }
                            : line
                    );
                    return [
                        ...updatedLines,
                        { id: currentLineIndex + 1, code: "" },
                    ];
                });

                setCursorPosition({
                    line: currentLineIndex + 1,
                    column: 0,
                });
                break;
            case "Backspace":
                if (currentLine.code.length === 0) {
                    if (currentLine.id === 1) {
                        return;
                    } else {
                        setLines((prev) => {
                            const updatedLines = prev.map((line) => 
                                line.id === currentLineIndex - 1
                                    ? { ...line, code: line.code.trimEnd() }
                                    : line
                            );
                            const newLines = updatedLines.slice(0, -1);
                            const updatedCol = newLines[newLines.length - 1].code.length;

                            setCursorPosition({
                                line: currentLineIndex - 1,
                                column: updatedCol
                            })
                            return newLines;
                        });
                        return;
                    }
                }
                const backedText = currentLine.code.slice(0, cursorPosition.column - 1);
                setLines((prev) =>
                    prev.map((line) =>
                      line.id === currentLineIndex ? { ...line, code: backedText } : line
                    )
                );
                setCursorPosition((prev) => ({
                    ...prev,
                    column: prev.column - 1,
                }));
                break;
            default:
                if (event.key.length === 1) {
                    const newText = currentLine.code.slice(0, cursorPosition.column) +
                                    event.key +
                                    currentLine.code.slice(cursorPosition.column);
                    
                    setLines((prev) =>
                        prev.map((line) =>
                          line.id === currentLineIndex ? { ...line, code: newText } : line
                        )
                    );

                    setCursorPosition((prev) => ({
                        ...prev,
                        column: prev.column + 1,
                    }));
                }
                break;
        }
    }

    return (
        <div className="my-2 mx-2 bg-code font-code_mono grow flex">
            <div
                ref={editorRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="bg-inherit text-white grow px-2 py-0 focus:outline-none"
            >
                {lines.map((line) => (
                    <div key={line.id} className="flex flex-row">
                        <LineNumber line={line.id} />
                        <div className="whitespace-pre text-white h-6 pl-2">
                            <LineCode 
                                code={line.code} 
                                cursorPosition={line.id === cursorPosition.line ? cursorPosition.column : undefined}
                            />
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
};

export default Editor;