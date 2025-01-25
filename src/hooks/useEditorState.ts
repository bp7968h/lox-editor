import { useState } from "react";

export interface Line {
    id: number,
    code: string,
}

export interface Cursor {
    line: number,
    column: number,
}

const useEditorState = () => {
    const [lines, setLines] = useState<Line[]>([{
        id: 1, 
        code: ''
        }]);
    const [cursorPosition, setCursorPosition] = useState<Cursor>({ 
        line: 1, 
        column: 0 
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const currentLineIndex = cursorPosition.line;
        const currentLine = lines[currentLineIndex - 1];

        switch(event.key) {
            case "Enter":
                setLines((prev) => [
                    ...prev,
                    { id: currentLineIndex + 1, code: "" },
                ]);

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
                            const newLines = prev.slice(0, -1);
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
            case "ArrowLeft":
                if (currentLineIndex === 1 && cursorPosition.column === 0) {
                    return;
                }
                if (currentLineIndex > 1 && cursorPosition.column === 0) {
                    const prevLineLen = lines[currentLineIndex - 2].code.length;
                    setCursorPosition((prev) => ({
                        line: prev.line - 1,
                        column: prevLineLen,
                    }));
                    return;
                }
                setCursorPosition((prev) => ({
                    ...prev,
                    column: prev.column - 1,
                }));
                break;
            case "ArrowRight":
                if (cursorPosition.column === currentLine.code.length) {
                    if (currentLineIndex === lines.length) {
                        return;
                    }
                    if (currentLineIndex < lines.length) {
                        setCursorPosition((prev) => ({
                            line: prev.line + 1,
                            column: 0,
                        }));
                        return;
                    }
                }
                setCursorPosition((prev) => ({
                    ...prev,
                    column: prev.column + 1,
                }));
                break;
            case "ArrowUp":
                if (currentLineIndex === 1) {
                    return;
                }
                if (currentLineIndex > 1) {
                    const prevLineLen = lines[currentLineIndex - 2].code.length;
                    if ( cursorPosition.column > prevLineLen) {
                        setCursorPosition((prev) => ({
                            column: prevLineLen,
                            line: prev.line - 1,
                        }));
                        return
                    }
                }
                setCursorPosition((prev) => ({
                    ...prev,
                    line: prev.line - 1,
                }));
                break;
            case "ArrowDown":
                if (lines.length === currentLineIndex) {
                    return;
                }
                if (currentLineIndex < lines.length) {
                    const nextLineLen = lines[currentLineIndex].code.length;
                    if (cursorPosition.column > nextLineLen) {
                        setCursorPosition((prev) => ({
                            column: nextLineLen,
                            line: prev.line + 1,
                        }));
                        return
                    }
                }
                setCursorPosition((prev) => ({
                    ...prev,
                    line: prev.line + 1,
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

    return {
        lines,
        cursorPosition,
        handleKeyDown,
    };
}

export default useEditorState;