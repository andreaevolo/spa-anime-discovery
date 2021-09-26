import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ActionButton from "./AddActionButton";
import AlertNotifier from "./AlertNotifier";
import ReviewsList from "./ReviewsList";
import * as LocalStorage from "./util/LocalStorage";

const InfoPage = (props) => {
  const [info, setInfo] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();

  // https://api.jikan.moe/v3/anime/

  // save the anime ID's in the localStorage
  const addIdToLocalStorage = (id) => {
    let animeIDs = LocalStorage.getItem("animeIDs");

    if (!animeIDs) {
      animeIDs = [];
    }
    animeIDs.push(id);
    console.log(animeIDs);
    LocalStorage.addItem("animeIDs", animeIDs);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    props.updateUserList(info);
  };

  const removeIdFromLocalStorage = (id) => {
    const animeIDs = LocalStorage.getItem("animeIDs");
    // if the id list it's not empty remove the id
    if (animeIDs) {
      // remove the current id
      animeIDs.splice(animeIDs.indexOf(id), 1);
      localStorage.setItem("animeIDs", animeIDs);
      props.removeFromUserList(id);
    }
  };

  // Aggiungere qui un metodo che viene triggherato dal click di animeButton ( salvataggio id localStorage )
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await fetch(`https://api.jikan.moe/v3/anime/${id}`);
        const res = await data.json();
        setInfo(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div id="info-container">
      {showAlert && (
        <AlertNotifier
          type="success"
          title="Success!"
          message="Anime saved to your list."
        />
      )}
      {info.trailer_url ? (
        <iframe
          src={info.trailer_url}
          id="info-iframe"
          title={info.title}
        ></iframe>
      ) : (
        <div id="info-banner">
          <h2>No Trailer available</h2>
        </div>
      )}
      <div id="info-text">
        <h1 style={{ marginTop: "1em" }}>{info.title}</h1>
        <div id="anime-btn-action">
          <h2>{info.duration}</h2>
          <ActionButton
            onAddAnimeToList={addIdToLocalStorage}
            onRemoveAnimeFromList={removeIdFromLocalStorage}
          />
        </div>
        <p>{info.synopsis} </p>
      </div>
      <ReviewsList animeID={info.mal_id} />
    </div>
  );
};

export default InfoPage;
