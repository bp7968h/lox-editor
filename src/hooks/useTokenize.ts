import { useEffect, useState } from "react";
import init, {tokenize, WasmToken, compile_and_run} from "lox_rc";

export function useTokenize() {
  const [tokenizeFn, setTokenizeFn] = useState<null | ((source: string) => WasmToken[])>(null);
  const [compileRunFn, setCompileRunFn] = useState<null | ((source: string) => string)>(null);
  const [tokenizeState, setTokenizeState] = useState(false);

  useEffect(() => {
    (async () => {
      await init();
      setTokenizeFn(() => tokenize);
      setCompileRunFn(() => compile_and_run);
      setTokenizeState(true);
    })();
  }, []);

  return { tokenizeFn, tokenizeState, compileRunFn };
}
