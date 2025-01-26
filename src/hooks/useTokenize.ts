import { useEffect, useState } from "react";
import init, {tokenize, WasmToken} from "lox_rc";

export function useTokenize() {
  const [tokenizeFn, setTokenizeFn] = useState<null | ((source: string) => WasmToken[])>(null);
  const [tokenizeState, setTokenizeState] = useState(false);

  useEffect(() => {
    (async () => {
      await init();
      setTokenizeFn(() => tokenize);
      setTokenizeState(true);
    })();
  }, []);

  return { tokenizeFn, tokenizeState };
}
