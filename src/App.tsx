import Editor from "./components/Editor"
import ToolBar from "./components/ToolBar"

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <ToolBar />
      <Editor />
    </div>
  )
}

export default App
