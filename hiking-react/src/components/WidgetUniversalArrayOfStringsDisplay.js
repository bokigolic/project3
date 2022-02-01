const WidgetUniversalArrayOfStringsDisplay = (props) => {
  let arr = [];
  if (Array.isArray(props.data)) {
    arr = props.data;
  }

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let jsxArr = arr.map((item, index) => {
    return (
      <li key={index} className="uni-content-arr-item" >
        {item}
      </li>
    );
  });

  return (
    <ul className="array-of-strings">
      {jsxArr}
    </ul>
  );
};

export default WidgetUniversalArrayOfStringsDisplay;