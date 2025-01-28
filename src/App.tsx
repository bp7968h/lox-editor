import { useRef, useState } from "react";
import Editor, { EditorHandle } from "./components/editor/Editor"
import ToolBar from "./components/ToolBar"
import { useTokenize } from "./hooks/useTokenize"


function App() {
  const {tokenizeFn, tokenizeState, compileRunFn} = useTokenize();
  const editorRunRef = useRef<EditorHandle>(null);

  const [isOutputVisible, setIsOutputVisible] = useState(false);
  const [outputContent, setOutputContent] = useState<string>("");

  const handleCodeRun = () => {
    if (!editorRunRef.current || !compileRunFn) {
      return;
    }
    const code = editorRunRef.current.getCode();
    setOutputContent("Running...");
    setIsOutputVisible(true);

    const result = compileRunFn(code);
    setOutputContent(result || "No output produced.");
  }

  const handleLoadExample = (exampleCode: string) => {
    if (!editorRunRef.current) {
      return;
    }
    editorRunRef.current.loadCode(exampleCode);
  }

  const handleConsoleClick = () => {
    setIsOutputVisible(true);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white font-mono">
      <ToolBar onRun={handleCodeRun} onLoad={handleLoadExample} />
      {!tokenizeState || !tokenizeFn 
        ? <div>Loading WASM...</div>
        : <Editor 
            ref={editorRunRef} 
            tokenizer={tokenizeFn} 
            isOutputVisible={isOutputVisible}
            outputContent={outputContent}
            onCloseOutput={() => setIsOutputVisible(false)}
            onConsoleClick={handleConsoleClick}
          />
      }
    </div>
  )
}

export default App
