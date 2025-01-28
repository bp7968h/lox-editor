const ModalData = {
    title: "What The Hell is This Thing!!",
    descsriptin: (<>I was working through the{" "}
                <a
                  href="https://craftinginterpreters.com/"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crafting Interpreters
                </a>{" "}
                book by Robert Nystrom, which is an excellent resource for
                understanding interpreters. While implementing the Tree-Walk
                Interpreter in Java, I was also learning Rust. This led me to build
                the Bytecode Virtual Machine (that compiles and executes bytecode)
                in Rust. At the same time, I wanted to understand browser-based
                text editors and improve my React & TypeScript skills—so I built a
                browser-based text editor from scratch.</>),
    details: [
      {
        title: "🔧 How does this work?",
        content: (
          <>
            <p>
              The core implementation of the language, **Lox**, is written in Rust. Two
              primary functions are exposed using **WebAssembly (WASM)**:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2">
              <li>
                <strong>tokenize</strong>: Used for syntax highlighting by breaking down
                the input code into tokens.
              </li>
              <li>
                <strong>compile_and_run</strong>: Compiles and executes the current code,
                returning the result or errors.
              </li>
            </ul>
            <p className="mt-2">
              When the user types in the editor, the code is passed through the{" "}
              <strong>tokenize</strong> function to generate syntax tokens, which are
              then rendered on the screen. When the user clicks **Run**, the{" "}
              <strong>compile_and_run</strong> function is invoked with the current code.
              The output from this execution is rendered in the output panel.
            </p>
            <p className="mt-2">
              All interactions, including syntax highlighting, code execution, and UI
              updates, are handled manually without any external libraries.
            </p>
          </>
        ),
      },
        {
          title: "🚀 What are the supported features?",
          content: (
            <>
              <strong>Language Features:</strong>
              <ul className="list-disc list-inside text-gray-300">
                <li>Strings, Numbers, Variables</li>
                <li>Conditions, Logical Operators</li>
                <li>Loops</li>
              </ul>
              <strong>Editor Features:</strong>
              <ul className="list-disc list-inside text-gray-300">
                <li>Normal Typing</li>
                <li>Load Example Code</li>
                <li>Run Custom Code</li>
                <li>View Execution Output</li>
                <li>Code Highlighting (not real-time)</li>
                <li>Keyboard Navigation (Arrow Keys)</li>
                <li>Copy Code to Clipboard</li>
              </ul>
            </>
          ),
        },
        {
          title: "❌ What is not supported yet?",
          content: (
            <>
              <strong>Language Features:</strong>
              <ul className="list-disc list-inside text-gray-300">
                <li>Functions</li>
                <li>Classes</li>
                <li>Closures</li>
                <li>Methods</li>
              </ul>
              <strong>Editor Features:</strong>
              <ul className="list-disc list-inside text-gray-300">
                <li>Cursor movement with Mouse</li>
                <li>Keyboard Shortcuts (Ctrl+A, Shift+Arrow)</li>
                <li>Code Sharing</li>
              </ul>
              <p className="text-gray-400 mt-2">
                🔥 **Planned Future Features**:
                <br />– Real-time Syntax Highlighting (*like TreeSitter, built from scratch*)  
                <br />– More helpful error messages
                <br />– Improved CI/CD pipeline (*after language is fully implemented*)
              </p>
            </>
          ),
        },
        {
          title: "🌍 Why is this an SSR site?",
          content: (
            <p className="text-gray-300">
              I don’t have a backend server, so this is a general
              server-side rendered (SSR) site hosted on **GitHub Pages**.
            </p>
          ),
        },
        {
          title: "📂 Where is the code?",
          content: (
            <ul className="list-disc list-inside text-gray-300">
              <li>
                <a
                  href="https://github.com/bp7968h/lox-rc"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bytecode VM in Rust
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bp7968h/lox-editor"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Editor Implementation
                </a>
              </li>
            </ul>
          ),
        },
        {
          title: "🙏 Acknowledgements",
          content: (
            <ul className="list-disc list-inside text-gray-300">
              <li>
                📖{" "}
                <a
                  href="https://craftinginterpreters.com/"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crafting Interpreters
                </a>{" "}
                by Robert Nystrom
              </li>
              <li>🦀 Rust Playground</li>
              <li>📝 Some random Reddit post that inspired me</li>
            </ul>
          ),
        },
      ],
};

export default ModalData;