import React from "react";
import { Line } from "../../hooks/useEditorState";

type LineCodeProps = {
    code: Line['code'],
    cursorPosition: number | undefined,
}

const LineCode: React.FC<LineCodeProps> = ({ code, cursorPosition }) => {
    if (cursorPosition === undefined) {
        return (
            <span>
                {code}
            </span>
        );
    }

    if (code === '' || cursorPosition === 0) {
        return (
          <div className="relative">
            <span className="absolute w-0.8 h-full bg-white animate-pulse">|</span>
          </div>
        );
    }

    const beforeCursor = code.slice(0, cursorPosition);
    const afterCursor = code.slice(cursorPosition);
    
    return (
        <div className="relative">
          <span>{beforeCursor}</span>
          {cursorPosition !== undefined && (
            <span className="absolute w-0.5 h-full bg-white animate-pulse"></span>
          )}
          <span>{afterCursor}</span>
        </div>
    );
};

export default LineCode;