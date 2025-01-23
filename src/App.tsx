import Editor from "./components/editor/Editor"
import ToolBar from "./components/ToolBar"

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-mono">
      <ToolBar />
      <Editor />
    </div>
  )
}

export default App
