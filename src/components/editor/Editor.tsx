import React, {useState,useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import LineNumber from "./LineNumber";
import LineCode from "./LineCode";
import useEditorState from "../../hooks/useEditorState";
import { WasmToken } from "lox_rc";

type EditorProps = {
    tokenizer: (source: string) => WasmToken[];
};

export interface EditorHandle {
    getCode: () => string;
}

const Editor = forwardRef<EditorHandle, EditorProps>((props, ref) => {
    const { tokenizer } = props;

    const { lines, cursorPosition, handleKeyDown } = useEditorState(tokenizer);
    const [isActive, setIsActive] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
            setIsActive(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        getCode() {
          return lines.map(line => line.code).join("\n");
        },
        getToken() {
            return lines.flatMap(line => line.tokens);
        }
    }));

    return (
        <div 
            className={`my-2 mx-2 p-1 bg-code font-code_mono grow flex rounded-md ${isActive ? "border" : ""}`}
            onClick={() => setIsActive(true)}
        >
            <div
                ref={editorRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="bg-inherit text-white grow px-2 py-0 focus:outline-none"
            >
                {lines.map((line) => {
                    return (
                        <div key={line.id} className="flex flex-row">
                        <LineNumber line={line.id} />
                        <div className="whitespace-pre text-white h-6 pl-2">
                            <LineCode 
                                code={line.code}
                                tokens={line.tokens}
                                status={isActive}
                                cursorCol={
                                    line.id === cursorPosition.line 
                                    ? cursorPosition.column 
                                    : undefined
                                }
                            />
                        </div>
                    </div> 
                    )
                })}
            </div>
        </div>
    )
});

export default Editor;