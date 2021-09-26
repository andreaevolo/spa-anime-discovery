import AnimeCard from "./AnimeCard";

const AnimeCardBoard = (props) => {
  if (!props.cardsList.length) {
    return (
      <div id="previews-container">
        <p>It seems like we have not found any anime/manga with that name...</p>
      </div>
    );
  }
  return (
    <div id="previews-container">
      {props.cardsList.map((anime) => {
        const { mal_id, image_url, title } = anime;
        return (
          <AnimeCard
            key={mal_id}
            cardID={mal_id}
            url={image_url}
            title={title}
            addAnimeToUserList={props.onAddElementToUserList}
            info={anime}
          />
        );
      })}
    </div>
  );
};

export default AnimeCardBoard;
