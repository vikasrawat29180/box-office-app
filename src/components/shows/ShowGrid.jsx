import ShowCard from './ShowCard';
import { useReducer,useEffect } from 'react';

const usePersistedReducer=(reducer,initialState,localStorageKey)=>{

const[state,dispatch]=useReducer(reducer,initialState,(initial)=>{
  const persistedValue=localStorage.getItem(localStorageKey);
  return persistedValue ? JSON.parse(persistedValue):initialState;
})

useEffect(()=>{
  localStorage.setItem(localStorageKey,JSON.stringify(state))
},[state,localStorageKey])

return[state,dispatch]

}

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

const ShowGrid = ({ shows }) => {
  const [starredShows, dispacthStarred] = usePersistedReducer(starredShowReducer, [],'starredShows');


  
  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId);
    if (isStarred) {
      dispacthStarred({ type: 'UNSTAR', showId });
    } else {
      dispacthStarred({ type: 'STAR', showId });
    }
  };

  return (
    <div>
      {shows.map(data => (
        <ShowCard
          key={data.show.id}
          id={data.show.id}
          name={data.show.name}
          image={
            data.show.image ? data.show.image.medium : '/not-found-image.png'
          }
          summary={data.show.summary}
          onStarMeClick={onStarMeClick}
        />
      ))}
    </div>
  );
};
export default ShowGrid;
