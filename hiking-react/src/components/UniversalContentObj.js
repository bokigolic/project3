import ApicrumbsDisplay from "./ApicrumbsDisplay";
import UniversalContentRouter from "./UniversalContentRouter";

const UniversalContentObj = (props) => {
  const data = props.data;

  let jsxContentArr = [];
  Object.keys(data).forEach(k => {
    const item = data[k];
    const apicrumbs = [...props.apicrumbs, k];
    jsxContentArr.push(
      <UniversalContentRouter key={k} data={item} apicrumbs={apicrumbs} dev_mode={props.dev_mode} />
    );
  });

  return (
    <div className="uni-content-obj">
      <ApicrumbsDisplay apicrumbs={props.apicrumbs} />
      {jsxContentArr}
    </div>
  );
}

export default UniversalContentObj;