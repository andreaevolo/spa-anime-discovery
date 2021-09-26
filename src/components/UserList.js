import * as LocalStorage from "./util/LocalStorage";

import ListItem from "./ListItem";
const UserList = (props) => {
  
  const deleteAnime = (id) => {
    
    const animeListStorage = LocalStorage.getItem("animeIDs");
    if (LocalStorage.getItem("animeIDs")) {
      let listAnime = animeListStorage.filter((animeID) =>animeID !== id);
      LocalStorage.addItem("animeIDs", listAnime);
      props.onUpdateList(id);
    }
  };

  const resetAnimeList = () => {
    LocalStorage.addItem("animeIDs", []);
    props.onResetList();
  };

  return (
    <div>
      <div id="list-container">
        <h1 id="user-list-title">{props.title}</h1>
        {!props.animeList.length ? (
          <p>You don't have anime saved to your list yet.</p>
        ) : (
          props.animeList.map((info) => (
            <ListItem
              key={info.mal_id}
              info={info}
              onRemoveListItem={deleteAnime}
            />
          ))
        )}
        <div id="reset-list-btn" onClick={resetAnimeList}>
          <p>Reset list</p>
        </div>
      </div>
    </div>
  );
};

export default UserList;
