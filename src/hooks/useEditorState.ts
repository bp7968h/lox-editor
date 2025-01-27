import { useState } from "react";
import { WasmToken } from "lox_rc";
// import { tokenizeFn } from "../components/editor/Editor";

export interface Line {
    id: number,
    code: string,
    tokens: WasmToken[] | null,
}

export interface Cursor {
    line: number,
    column: number,
}

const updateLineContent = (
    lines: Line[],
    lineId: number,
    newCode: string,
    tokenizer: (source: string) => WasmToken[]
  ): Line[] => {
    const newTokens = tokenizer(newCode);
    // newTokens.forEach((t) => {
    //     console.log(t.token_type);
    //     console.log(t.lexeme);
    //     console.log(t.line);    
    // })
    return lines.map((l) =>
      l.id === lineId ? { ...l, code: newCode, tokens: newTokens } : l
    );
}

const handleEnterKey = (
    lines: Line[],
    cursor: Cursor
): { lines: Line[]; cursor: Cursor } =>  {
    const currentLineIndex = cursor.line;
    return {
      lines: [
        ...lines,
        { id: currentLineIndex + 1, code: "", tokens: null },
      ],
      cursor: {
        line: currentLineIndex + 1,
        column: 0,
      },
    };
}

const handleBackspaceKey = (
    lines: Line[],
    cursor: Cursor,
    tokenizer: (source: string) => WasmToken[]
): { lines: Line[]; cursor: Cursor } => {
    const currentLineIndex = cursor.line;
    const currentLine = lines[currentLineIndex - 1];

    if (currentLine.code.length === 0) {
        if (currentLine.id === 1) {
            // If the very first line is empty, do nothing
            return { lines, cursor };
        } else {
            // Remove the last line
            const newLines = lines.slice(0, -1);
            const updatedCol = newLines[newLines.length - 1].code.length;
            return {
              lines: newLines,
              cursor: {
                line: currentLineIndex - 1,
                column: updatedCol,
                },
            }
        }
    }
    // Normal backspace: remove one character
    const backedText = currentLine.code.slice(0, cursor.column - 1);
    const newLines = updateLineContent(lines, currentLineIndex, backedText, tokenizer);
    return {
        lines: newLines,
        cursor: {
          ...cursor,
          column: cursor.column - 1,
        },
    };
}

const handleArrowLeft = (
    lines: Line[],
    cursor: Cursor,
): {cursor: Cursor} => {
    const currentLineIndex = cursor.line;

    // If at start of line, maybe move up one line if possible
    if (cursor.column === 0) {
      if (currentLineIndex === 1) {
        // Already at the first line, do nothing
        return { cursor };
      }
      // Move up
      const prevLine = lines[currentLineIndex - 2];
      return {
        cursor: {
          line: currentLineIndex - 1,
          column: prevLine.code.length,
        },
      };
    }

    // Otherwise, move left within this line
    return {
        cursor: {
            ...cursor,
            column: cursor.column - 1,
        }
    };
}

const handleArrowRight = (
    lines: Line[],
    cursor: Cursor,
): { cursor: Cursor } => {
    const currentLineIndex = cursor.line;
    const currentLine = lines[currentLineIndex - 1];
  
    // If cursor is at the end of the current line
    if (cursor.column === currentLine.code.length) {
      // If it's also the last line, do nothing
      if (currentLineIndex === lines.length) {
        return { cursor };
      }
      // Otherwise, move to the next line, column 0
      return {
        cursor: {
          line: currentLineIndex + 1,
          column: 0,
        },
      };
    }
  
    // Otherwise, just move right one character
    return {
      cursor: {
        ...cursor,
        column: cursor.column + 1,
      },
    };
}

const handleArrowUp = (lines: Line[], cursor: Cursor): { cursor: Cursor } => {
    const currentLineIndex = cursor.line;
  
    // If we’re already on the first line, do nothing
    if (currentLineIndex === 1) {
      return { cursor };
    }
  
    // Otherwise, see if we need to clamp the column
    // to the previous line’s length
    const prevLineLen = lines[currentLineIndex - 2].code.length;
    if (cursor.column > prevLineLen) {
      return {
        cursor: {
          line: currentLineIndex - 1,
          column: prevLineLen,
        },
      };
    }
  
    // Move up one line, same column
    return {
      cursor: {
        ...cursor,
        line: currentLineIndex - 1,
      },
    };
  }
  
const handleArrowDown = (lines: Line[], cursor: Cursor): { cursor: Cursor } => {
    const currentLineIndex = cursor.line;
  
    // If we’re on the last line, do nothing
    if (currentLineIndex === lines.length) {
      return { cursor };
    }
  
    // Otherwise, check if we need to clamp the column
    // to the next line’s length
    const nextLineLen = lines[currentLineIndex].code.length;
    if (cursor.column > nextLineLen) {
      return {
        cursor: {
          line: currentLineIndex + 1,
          column: nextLineLen,
        },
      };
    }
  
    // Move down one line, same column
    return {
      cursor: {
        ...cursor,
        line: currentLineIndex + 1,
      },
    };
  }  

const handleCharacterInput = (
    lines: Line[],
    cursor: Cursor,
    key: string,
    tokenizer: (source: string) => WasmToken[]
): { lines: Line[]; cursor: Cursor } => {
    const currentLineIndex = cursor.line;
    const currentLine = lines[currentLineIndex - 1];

    const newText =
    currentLine.code.slice(0, cursor.column) +
    key +
    currentLine.code.slice(cursor.column);

    const newLines = updateLineContent(lines, currentLineIndex, newText, tokenizer);

    return {
        lines: newLines,
        cursor: {
          ...cursor,
          column: cursor.column + 1,
        },
    };

}

const useEditorState = (tokenizer: (source: string) => WasmToken[] ) => {
    const [lines, setLines] = useState<Line[]>([{ id: 1, code: '', tokens: null}]);
    const [cursorPosition, setCursorPosition] = useState<Cursor>({ 
        line: 1, 
        column: 0 
    });

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        switch(event.key) {
            case "Enter": {
                let { lines: updatedLines, cursor: updatedCursor } = handleEnterKey(lines, cursorPosition);
                setLines(updatedLines);
                setCursorPosition(updatedCursor);
                break;
            }
            case "Backspace": {
                let { lines: updatedLines, cursor: updatedCursor } =  handleBackspaceKey(lines, cursorPosition, tokenizer);
                setLines(updatedLines);
                setCursorPosition(updatedCursor);
                break;
            }
            case "ArrowLeft": {
                const { cursor: updatedCursor } = handleArrowLeft(lines, cursorPosition);
                setCursorPosition(updatedCursor);
                break;
            }
            case "ArrowRight": {
                const { cursor: updatedCursor } = handleArrowRight(lines, cursorPosition);
                setCursorPosition(updatedCursor);
                break;
            }
            case "ArrowUp": {
                const { cursor: updatedCursor } = handleArrowUp(lines, cursorPosition);
                setCursorPosition(updatedCursor);
                break;
            }
            case "ArrowDown": {
                const { cursor: updatedCursor } = handleArrowDown(lines, cursorPosition);
                setCursorPosition(updatedCursor);
                break;
            }
            default: {
                if (event.key.length === 1) {
                    const { lines: updatedLines, cursor: updatedCursor } = handleCharacterInput(lines, cursorPosition, event.key, tokenizer);
                    setLines(updatedLines);
                    setCursorPosition(updatedCursor);
                }
                break;
            }
        }
    }

    return {
        lines,
        cursorPosition,
        handleKeyDown,
    };
}

export default useEditorState;