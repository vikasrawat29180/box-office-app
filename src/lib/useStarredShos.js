import { useReducer, useEffect } from 'react';
const usePersistedReducer = (reducer, initialState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistedValue = localStorage.getItem(localStorageKey);
    return persistedValue ? JSON.parse(persistedValue) : initial;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispatch];
};

const starredShowReducer = (currentStrarred, action) => {
  switch (action.type) {
    case 'STAR':
      return currentStrarred.concat(action.showId);
    case 'UNSTAR':
      return currentStrarred.filter(showId => showId !== action.showId);
    default:
      return currentStrarred;
  }
};
export const useStarredShows = () => {
  return usePersistedReducer(starredShowReducer, [], 'starredShows');
};
