import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = (props) => {
  return (
    <div>
      <FontAwesomeIcon
        style={{ color: props.color }}
        icon={faSpinner}
        size={props.size}
        className="spinner"
      />
    </div>
  );
};

export default Spinner;
