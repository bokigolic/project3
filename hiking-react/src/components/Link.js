const Link = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >{props.title}</a>
  );
};

export default Link;