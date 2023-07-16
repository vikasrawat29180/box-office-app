import ShowCard from './ShowCard';
import { useReducer, useEffect } from 'react';
import { useStarredShows } from '../../lib/useStarredShos';

const ShowGrid = ({ shows }) => {
  const [starredShows, dispacthStarred] = useStarredShows();

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
          isStarred={starredShows.includes(data.show.id)}
        />
      ))}
    </div>
  );
};
export default ShowGrid;
