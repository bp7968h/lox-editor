import {useState,useEffect, useRef, forwardRef, useImperativeHandle} from "react";
import LineNumber from "./LineNumber";
import LineCode from "./LineCode";
import useEditorState from "../../hooks/useEditorState";
import { WasmToken } from "lox_rc";
import Bar from "./Bar";
import OutputPanel from "./OutputPanel";

type EditorProps = {
    tokenizer: (source: string) => WasmToken[];
    isOutputVisible: boolean;
    outputContent: string;
    onCloseOutput: () => void;
    onConsoleClick: () => void;
};

export interface EditorHandle {
    getCode: () => string;
    loadCode: (newCode: string) => void;
}

const Editor = forwardRef<EditorHandle, EditorProps>((props, ref) => {
    const { tokenizer, isOutputVisible, outputContent, onCloseOutput, onConsoleClick } = props;
    
    const { lines, cursorPosition, handleKeyDown, setLines, setCursorPosition } = useEditorState(tokenizer);
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

    const handleCopy = async () => {
        try {
          const code = lines.map((line) => line.code).join("\n");
          await navigator.clipboard.writeText(code);
        } catch (error) {
          console.error("Failed to copy text: ", error);
        }
    };

    useImperativeHandle(ref, () => ({
        getCode() {
          return lines.map(line => line.code).join("\n");
        },
        loadCode(exampleCode: string) {
            const rawLines = exampleCode.split("\n");
            const newLines = rawLines.map((text, idx) => {
                const tokens = tokenizer(text);
                return {
                    id: idx + 1,
                    code: text,
                    tokens
                  };
            });

            setLines(newLines);
            const lastLineIndex = newLines.length;
            const lastLineCol = newLines[lastLineIndex - 1].code.length
            console.log('loaded code ', 'length: ', lastLineIndex, 'Col: ', lastLineCol);
            setCursorPosition({
                line: lastLineIndex,
                column: lastLineCol,
            });
        }
    }));

    return (
        <div 
            className={`relative flex-1 flex flex-col overflow-y-auto my-2 mx-2 bg-code font-code_mono h-screen rounded-md ${isActive ? "border" : ""}`}
            onClick={() => setIsActive(true)}
        >
            <Bar onConsoleClick={onConsoleClick} isOutputVisible={isOutputVisible} onCopy={handleCopy} />
            <div
                ref={editorRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="h-full bg-inherit text-white px-2 py-0 focus:outline-none text-sm sm:text-md md:text-lg"
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
            <OutputPanel isVisible={isOutputVisible} onClose={onCloseOutput} >
                {outputContent ? outputContent : undefined}
            </OutputPanel>
        </div>
    )
});

export default Editor;