import { useState } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
const AddActionButton = (props) => {
  const [saved, setBtnStatus] = useState(false);
  const { id } = useParams();
  const handleClick = (id) => {
    setBtnStatus(!saved);

    if (!saved) {
      props.onAddAnimeToList(id);
      return;
    }
    props.onRemoveAnimeFromList(id);
  };
  return (
    // ricordati di aggiungere anche la funzione per eliminare un elemento appena aggiunto dalla lista

    <div id="add-anime-btn" onClick={() => handleClick(id)}>
      <FontAwesomeIcon icon={!saved ? faPlus : faCheck} />
    </div>
  );
};

export default AddActionButton;
