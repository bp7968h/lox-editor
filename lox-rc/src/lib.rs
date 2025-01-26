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
    CompileError,
    RuntimeError,
}

use scanner::Scanner;
use token::Token;
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn tokenize_signle_char() {
        let charter: &str = "c";
        let res = tokenize(charter);

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
}
