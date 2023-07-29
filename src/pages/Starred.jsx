import { getShowByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShos';
import { useQuery } from '@tanstack/react-query';
import ShowGrid from '../components/shows/ShowGrid';
import {TextCenter} from '../components/common/TextCenter'
const Starred = () => {
  const [starredShowsIds] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn: async () =>
      getShowByIds(starredShowsIds).then(result =>
        result.map(show => {
          return {
            show,
          };
        })
      ),
    refetchOnWindowFocus: false,
  });
  if (starredShows?.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }
  if (starredShows?.length === 0) {
    return <TextCenter>No shows were starred</TextCenter>;
  }
  if (starredShowsError) {
    return <TextCenter>Error occured :{starredShowsError.message} </TextCenter>;
  }
  return <TextCenter>Shows are Loading</TextCenter>;
};
export default Starred;
