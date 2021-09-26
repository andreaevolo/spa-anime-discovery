import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListItem = (props) => {
  const removeItem = (animeID) => {
    //console.log(animeID);
    props.onRemoveListItem(animeID);
  };

  const { title, image_url } = props.info;
  return (
    <div className="list-item">
      <div className="left-item-container">
        <div className="list-item-img">
          <img src={image_url} alt={`preview ${title}`} />
        </div>
        <Link to={`/info/${props.info.mal_id}`}>
          <h2>{title}</h2>
        </Link>
      </div>

      <FontAwesomeIcon
        icon={faTrashAlt}
        size="lg"
        className="list-item-icon"
        onClick={() => removeItem(props.info.mal_id)}
      />
    </div>
  );
};

export default ListItem;
