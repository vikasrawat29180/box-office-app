import { useState } from 'react';
import { searchForShows, searchForActors } from '../api/tvmaze';
import SearchForm from '../components/SearchFrom';
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
    if (apiData) {
      {
        return apiData[0].show
          ? apiData.map(data => {
              return <div key={data.show.id}>{data.show.name}</div>;
            })
          : apiData.map(data => {
              return <div key={data.person.id}>{data.person.name}</div>;
            });
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
