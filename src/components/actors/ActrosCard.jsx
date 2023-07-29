import {SearchCard, SearchImgWrapper} from '../common/SearchCard'
const ActorsCard = ({ name, image, gender, country, birthday, deathday }) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name} />
      </SearchImgWrapper>
      <h1>
        {name}
        {!!gender && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No country known'}</p>
      {!!birthday && <p>Born {birthday}</p>}
      <p>{deathday ? `died ${deathday}` : 'Alive'}</p>
    </SearchCard>
  );
};
export default ActorsCard;
