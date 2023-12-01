import { useState, useCallback, useEffect } from "react";

const useSmartContract = (
  contractInstance,
  { functionName, params = [], onResponse = () => {}, prefetch = true }
) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const call = useCallback(async () => {
    if (!contractInstance) return;
    try {
      setLoading(true);
      const tx = await contractInstance[functionName](...params);
      setResult(tx);
      setError(null);
      onResponse({ result: tx });
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [contractInstance, functionName, params, onResponse]);

  useEffect(() => {
    if (prefetch) {
      call();
    }
  }, [call, prefetch]);

  return { loading, result, error };
};

export default useSmartContract;
