import { useState } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "./Spinner";

const Banner = (props) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const fetchRandomAnime = async () => {
    try {
      setRequestLoading(true);
      const randomID = Math.floor(Math.random() * 20000) + 1;
      const res = await fetch(`https://api.jikan.moe/v3/anime/${randomID}`);
      // if the resource is not found try again;
      if (res.status === 404) {
        setTimeout(() => {
          fetchRandomAnime();
        }, 2000);
        return;
      }

      if(res.status === 503) {
         throw Error("The service is currently unavailable");
      }

      if (res.ok) {
        setRequestLoading(false);
        props.history.push(`/info/${randomID}`);
      }
    } catch (err) {
      setRequestLoading(false);
      alert(err + " try again in a few minutes!");
    }
  };
  return (
    <div className="banner">
      <h1>{props.title}</h1>
      {requestLoading ? (
        <Spinner color="#fff" size="3x" />
      ) : (
        <p className="random-anime-cta" onClick={fetchRandomAnime}>
          Random Anime
        </p>
      )}
    </div>
  );
};

export default withRouter(Banner);
