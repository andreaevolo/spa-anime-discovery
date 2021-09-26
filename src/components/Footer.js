const Footer = (props) => {
  return (
    <div className="footer">
      <p>
        This is a demo project by {props.fullName} - {props.year}
      </p>
    </div>
  );
};

export default Footer;
