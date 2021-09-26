import { useState } from "react";
import { Link } from "react-router-dom";
import * as LocalStorage from "./util/LocalStorage";
import AlertNotifier from "./AlertNotifier";

const AnimeCard = (props) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
    addAnimeToLocalStorage();
    addAnimeToUserList();
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const addAnimeToLocalStorage = () => {
    let oldArray = LocalStorage.getItem("animeIDs");
    if (oldArray) {
      oldArray.push(props.cardID);
      //LocalStorage.removeItem('animeIDs');
      LocalStorage.addItem("animeIDs", oldArray);
    } else {
      LocalStorage.addItem("animeIDs", [props.cardID]);
    }
  };

  const addAnimeToUserList = () => {
    props.addAnimeToUserList(props.info);
  };
  return (
    <div className="anime-preview">
      {showAlert && (
        <AlertNotifier
          type="success"
          title="Success!"
          message="Anime saved to your list."
        />
      )}
      <Link to={`/info/${props.cardID}`}>
        <img src={props.url} alt={`${props.title} anime poster`} />
        <h2>{props.title.slice(0, 45) + "..."}</h2>
      </Link>
      <div className="card-btns-container">
        <div className="card-btn card-save-btn" onClick={handleClick}>
          <p>Save</p>
        </div>
        <div>
          <Link to={`/info/${props.cardID}`} className="card-btn card-info-btn">
            More info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
