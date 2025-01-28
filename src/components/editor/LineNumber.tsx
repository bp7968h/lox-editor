import React from "react";
import { Line } from "../../hooks/useEditorState";

type LineNumberProp = {line: Line['id']};

const LineNumber: React.FC<LineNumberProp> = ({line}) => {
    return (
        <div className="bg-inherit w-10 text-right px-1 border-r-4 border-neutral-900">
              <div key={line} className="h-6">
                {line.toString()}
              </div>
        </div>
    )
};

export default LineNumber;