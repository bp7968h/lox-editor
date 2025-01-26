import Editor from "./components/editor/Editor"
import ToolBar from "./components/ToolBar"
import { useTokenize } from "./hooks/useTokenize"


function App() {
  const {tokenizeFn, tokenizeState} = useTokenize();

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-mono">
      <ToolBar />
      {!tokenizeState || !tokenizeFn 
        ? <div>Loading WASM...</div>
        : <Editor tokenizer={tokenizeFn} />
      }
    </div>
  )
}

export default App
