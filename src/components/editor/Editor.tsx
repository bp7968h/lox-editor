import React, {useRef} from "react";
import LineNumber from "./LineNumber";
import LineCode from "./LineCode";
import useEditorState from "../../hooks/useEditorState";

const Editor: React.FC = () => {
    const { lines, cursorPosition, handleKeyDown } = useEditorState();
    const editorRef = useRef<HTMLDivElement>(null);

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
                                cursorPosition={
                                    line.id === cursorPosition.line 
                                    ? cursorPosition.column 
                                    : undefined
                                }
                            />
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
};

export default Editor;