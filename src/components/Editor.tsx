import React, {useState, useRef} from "react";

const Editor: React.FC = () => {
    const [lines, setLines] = useState<string[]>([""]);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        console.log(key);
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