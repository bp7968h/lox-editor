pub mod chunk;
pub mod compiler;
pub mod debug;
pub mod object;
pub mod opcode;
pub mod scanner;
pub mod token;
pub mod value;
pub mod vm;

pub type InterpretResult = Result<(), InterpretError>;
pub enum InterpretError {
    CompileError(String),
    RuntimeError(String),
}

use scanner::Scanner;
use token::Token;
use vm::VM;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq)]
pub struct WasmToken {
    token_type: String,
    lexeme: String,
    line: usize,
}

#[wasm_bindgen]
impl WasmToken {
    fn new(token: Token) -> WasmToken {
        WasmToken {
            token_type: format!("{:?}", token.token_type),
            lexeme: token.lexeme,
            line: token.line,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn token_type(&self) -> String {
        self.token_type.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn lexeme(&self) -> String {
        self.lexeme.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn line(&self) -> usize {
        self.line
    }
}

#[wasm_bindgen]
pub fn tokenize(source: &str) -> Vec<WasmToken> {
    let mut scanner = Scanner::new(source);
    let mut tokens = Vec::new();

    loop {
        let token = scanner.scan_token();

        if token.token_type == token::TokenType::EOF {
            break;
        }

        let wasm_token = WasmToken::new(token);
        tokens.push(wasm_token);
    }
    tokens
}

#[wasm_bindgen]
pub fn compile_and_run(src: &str) -> String {
    let mut virtual_machine = VM::new();
    virtual_machine.set_wasm_mode(true);

    let start_time = web_sys::window()
        .and_then(|win| win.performance())
        .map(|performance| performance.now())
        .unwrap_or(0.0);

    match virtual_machine.interpret(src) {
        Ok(_) => {
            let elapsed_time = web_sys::window()
                .and_then(|win| win.performance())
                .map(|performance| performance.now() - start_time)
                .unwrap_or(0.0);

            let outputs = virtual_machine.get_output().join("\n");

            let resp = format!(
                r#"
Compilation and Execution Completed Successfully!!!
Took {:.2}ms
----------------------------------------------------
{}"#,
                elapsed_time, outputs
            );

            resp
        }
        Err(e) => match e {
            InterpretError::CompileError(c_err_str) => c_err_str,
            InterpretError::RuntimeError(r_err_str) => {
                let mut outputs: String = virtual_machine.get_output().join("\n");

                if outputs.is_empty() {
                    return r_err_str;
                }
                outputs.push_str("\nRuntime Error Occured:\n\t");
                outputs.push_str(&r_err_str);
                outputs
            }
        },
    }
}

#[cfg(test)]
mod vm_tests {
    use super::compile_and_run;

    #[test]
    fn compile_and_run_simple_print() {
        let code = r#"print "Hello World!";"#;
        let result = compile_and_run(&code);

        assert_eq!(
            &result,
            "Compilation and Execution Completed Successfully\nTook 0.00s\n\nHello World!"
        );
    }
}

#[cfg(test)]
mod token_tests {
    use super::{tokenize, WasmToken};

    #[test]
    fn tokenize_signle_char() {
        let code: &str = "c";
        let res = tokenize(code);

        assert_eq!(res.len(), 1);
        assert_eq!(
            res[0],
            WasmToken {
                token_type: "IDENTIFIER".to_string(),
                lexeme: "c".to_string(),
                line: 1
            }
        )
    }

    #[test]
    fn tokenize_signle_slash() {
        let code: &str = "/";
        let res = tokenize(code);

        assert_eq!(res.len(), 1);
        assert_eq!(
            res[0],
            WasmToken {
                token_type: "SLASH".to_string(),
                lexeme: "/".to_string(),
                line: 1
            }
        )
    }

    #[test]
    fn tokenize_print_whitespace_identifier() {
        let code: &str = "print a";
        let res = tokenize(code);

        assert_eq!(res.len(), 3);
        assert_eq!(
            res[0],
            WasmToken {
                token_type: "PRINT".to_string(),
                lexeme: "print".to_string(),
                line: 1
            }
        );
        assert_eq!(
            res[1],
            WasmToken {
                token_type: "WHITESPACE".to_string(),
                lexeme: " ".to_string(),
                line: 1
            }
        );
        assert_eq!(
            res[2],
            WasmToken {
                token_type: "IDENTIFIER".to_string(),
                lexeme: "a".to_string(),
                line: 1
            }
        );
    }

    #[test]
    fn tokenize_comment() {
        let code: &str = "a //this is comment";
        let res = tokenize(code);

        assert_eq!(res.len(), 3);
        assert_eq!(
            res[2],
            WasmToken {
                token_type: "COMMENT".to_string(),
                lexeme: "//this is comment".to_string(),
                line: 1
            }
        );
    }

    #[test]
    fn tokenize_print_whitespace_identifier_comment() {
        let code: &str = "print a; //this is comment";
        let res = tokenize(code);

        assert_eq!(res.len(), 6);
        assert_eq!(
            res[5],
            WasmToken {
                token_type: "COMMENT".to_string(),
                lexeme: "//this is comment".to_string(),
                line: 1
            }
        );
    }
}
