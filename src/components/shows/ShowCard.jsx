const ShowCard = ({ name, image, id, summary, onStarMeClick }) => {
  const summaryStriped = summary
    ? summary.split(' ').slice(0, 15).join(' ').replace(/<.+?/g, '')
    : 'No description';

  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h1>{name}</h1>
      <div>{summaryStriped}</div>
      <div>
        <a href={`/show/${id}`} target="_blank" rel="noreferrer">
          Read more
        </a>
        <button type="button" onClick={() => onStarMeClick(id)}>
          Star me
        </button>
      </div>
    </div>
  );
};
export default ShowCard;
