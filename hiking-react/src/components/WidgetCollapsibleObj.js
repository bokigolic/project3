import UniversalContentRouter from './UniversalContentRouter';
import { useExpandOnlyOneCollapsible } from '../hooks/useExpandOnlyOneCollapsible';
import Collapsible from './Collapsible';

const WidgetCollapsibleObj = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();

  const data = props.data;

  let jsxContentArr = [];
  Object.keys(data).forEach((k) => {
    const item = data[k];
    const apicrumbs = [...props.apicrumbs, k];

    let jsxItem = null;

    jsxItem = (
      <UniversalContentRouter key={k} data={item} apicrumbs={apicrumbs} />
    );

    jsxContentArr.push(
      <Collapsible key={k} title={k} expanded={expandedKeys[k]} handleClick={(e) => { handleExpandClick(k) }} >
        {jsxItem}
      </Collapsible>
    );
  });

  return (
    <>
      <div className="widget-collapsible-wrapper">
        <div className="indent">
          {jsxContentArr}
        </div>
      </div>
    </>
  );
};

export default WidgetCollapsibleObj;