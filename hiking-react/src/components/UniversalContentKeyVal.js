const UniversalContentKeyVal = (props) => {
  const k = props.k;
  const v = props.v;
  return (
    <div className="uni-content-key-val"><b>{k}</b> {v}</div>
  );
}

export default UniversalContentKeyVal;