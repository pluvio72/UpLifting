import React, {useEffect} from 'react';

function useStartup(func: () => void): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(func, []);
}

export default useStartup;
