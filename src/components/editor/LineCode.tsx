import React from "react";
import { Line } from "../../hooks/useEditorState";

type LineCodeProps = {
    code: Line['code'],
    cursorCol: number | undefined,
    status: boolean,
}

const LineCode: React.FC<LineCodeProps> = ({ code, cursorCol, status }) => {
    if (cursorCol === undefined) {
        return (
            <span>
                {code}
            </span>
        );
    }

    if (code === '' && cursorCol === 0) {
        return (
          <div className="relative">
            { status && <span className="absolute w-0.8 h-full bg-white animate-pulse">|</span>}
          </div>
        );
    }

    const beforeCursor = code.slice(0, cursorCol);
    const afterCursor = code.slice(cursorCol);
    
    return (
        <div className="relative">
          <span>{beforeCursor}</span>
          {status && 
            cursorCol !== undefined && (
              <span className="absolute w-0.5 h-full bg-white animate-pulse"></span>
            )
          }
          <span>{afterCursor}</span>
        </div>
    );
};

export default LineCode;