import ApicrumbsDisplay from "./ApicrumbsDisplay";
import UniversalContentRouter from "./UniversalContentRouter";

const UniversalContentArr = (props) => {

  let arr = [];
  if (Array.isArray(props.arr)) {
    arr = props.arr;
  }

  const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let jsxArr = arr.map((item, index) => {
    return (
      <div key={index} className="uni-content-arr-item" >
        <UniversalContentRouter key={index} data={item} apicrumbs={apicrumbs} dev_mode={props.dev_mode} />
      </div>
    );
  });

  return (
    <div className="uni-content-arr">
      <ApicrumbsDisplay apicrumbs={props.apicrumbs} />
      {jsxArr}
    </div>
  );
};

export default UniversalContentArr;