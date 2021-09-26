const AlertNotifier = (props) => {
  return (
    <div className={`alert alert-${props.type} alert-slide-in-l`}>
      <h3 className="alert-title">{props.title}</h3>
      <p className="alert-message">{props.message}</p>
    </div>
  );
};

export default AlertNotifier;
