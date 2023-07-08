import { useState } from 'react';
import { searchForShows, searchForActors } from '../api/tvmaze';
import SearchForm from '../components/SearchFrom';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    try {
      setApiDataError(null);
      let result;

      if (searchOption === 'shows') {
        result = await searchForShows(q);
      } else {
        result = await searchForActors(q);
      }
      setApiData(result);
    } catch (error) {
      setApiDataError(error);
    }
  };
  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occureed:{apiDataError.message}</div>;
    }
    if(apiData?.length===0){
      return<div>No results</div>
    }
    if (apiData) {
      {
        return apiData[0].show
          ? <ShowGrid shows={apiData}/>
          : <ActorsGrid actors={apiData}/>
      }
    }
    return null;
  };
  return (
    <div>
      <SearchForm onSearch={onSearch} />

      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
