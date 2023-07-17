import {  useEffect, useState } from 'react';


const usePersistedState = (initalState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const persistedValue = sessionStorage.getItem(sessionStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : initalState;
  });
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return[state, setState]
}

/* From previous file DO NOT USE - it is a guidline for this new usecase
const usePersistedStateReducer = (reducer, initalState, sessionStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initalState, inital => {
    const persistedValue = sessionStorage.getItem(sessionStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : inital;
  });
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, dispatch];
};

*/


export const useSearchString = () => {
    return usePersistedState('','searchString');
}
