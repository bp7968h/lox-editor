import React, { ReactNode } from "react";
import { Line } from "../../hooks/useEditorState";
import { WasmToken } from "lox_rc";
import Cursor from "./Cursor";

type LineCodeProps = {
    code: Line['code'],
    tokens: WasmToken[] | null,
    cursorCol: number | undefined,
    status: boolean,
}

const ElementFromToken = (token: WasmToken, index: number): ReactNode | null => {
  switch(token.token_type.toLowerCase()) {
    case 'whitespace': {
      return (
      <span key={`whitespace-${index}`}>
        {token.lexeme}
      </span>
      );
    }
    case 'newline':
      return null;
    case 'identifier': {
      return (
        <span key={`${token.lexeme}-${index}`} className="text-code_blue">
          {token.lexeme}
        </span>
      );
    }
    case 'string': {
      return (
        <span className="text-code_green">
          "{token.lexeme}"
        </span>
      );
    }
    case "true":
    case "false":
    case 'number': {
      return (
        <span key={`${token.lexeme}-${index}`} className="text-code_red">
          {token.lexeme}
        </span>
      );
    }
    case "and":
    case "class":
    case "else":
    case "for":
    case "fun":
    case "if":
    case "nil":
    case "or":
    case "print":
    case "return":
    case "super":
    case "this":
    case "var":
    case "while": {
      return <span className="text-code_purple">{token.lexeme}</span>;
    }
    default: {
      return (
        <span className="text-white">
          {token.lexeme}
        </span>
      );
    }
  }
}

const LineCode: React.FC<LineCodeProps> = ({ code, tokens, cursorCol, status }) => {
    if (cursorCol === undefined) {
        return (
          <div>
            {tokens?.map((token, index) => ElementFromToken(token, index) )}
          </div>
        );
    }

    if (code === '' && cursorCol === 0) {
        return (
          <div className="relative">
            { status && <Cursor>|</Cursor>}
          </div>
        );
    }

    const beforeCursor = code.slice(0, cursorCol);
    const afterCursor = code.slice(cursorCol);
    
    return (
        <div className="relative">
          <span>{beforeCursor}</span>
          {status && 
            cursorCol !== undefined && (
              <Cursor />
            )
          }
          <span>{afterCursor}</span>
        </div>
    );
};

export default LineCode;