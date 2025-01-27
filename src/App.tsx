import { useRef } from "react";
import Editor, { EditorHandle } from "./components/editor/Editor"
import ToolBar from "./components/ToolBar"
import { useTokenize } from "./hooks/useTokenize"


function App() {
  const {tokenizeFn, tokenizeState} = useTokenize();
  const editorRunRef = useRef<EditorHandle>(null);

  const handleCodeRun = () => {
    if (!editorRunRef.current) {
      return;
    }
    const code = editorRunRef.current.getCode();
    console.log("Running code:\n", code);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-mono">
      <ToolBar onRun={handleCodeRun} />
      {!tokenizeState || !tokenizeFn 
        ? <div>Loading WASM...</div>
        : <Editor ref={editorRunRef} tokenizer={tokenizeFn} />
      }
    </div>
  )
}

export default App
