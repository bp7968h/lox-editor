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

  const handleLoadExample = (exampleCode: string) => {
    if (!editorRunRef.current) {
      return;
    }
    editorRunRef.current.loadCode(exampleCode);
  }

  return (
    <div className="h-screen flex flex-col bg-neutral-900 text-white font-mono">
      <ToolBar onRun={handleCodeRun} onLoad={handleLoadExample} />
      {!tokenizeState || !tokenizeFn 
        ? <div>Loading WASM...</div>
        : <Editor ref={editorRunRef} tokenizer={tokenizeFn} />
      }
    </div>
  )
}

export default App
