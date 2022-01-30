import UniversalContentRouter from './UniversalContentRouter';
import { useExpandOnlyOneCollapsible } from '../hooks/useExpandOnlyOneCollapsible';
import Collapsible from './Collapsible';

const WidgetCollapsibleArr = (props) => {
  const [expandedKeys, handleExpandClick] = useExpandOnlyOneCollapsible();

  let jsxContentArr = [];
  let arr = [];
  if (Array.isArray(props.data)) {
    arr = props.data;
  }

  arr.forEach((item, index) => {
    const k = index;
    // const item = data[k];
    const apicrumbs = [...props.apicrumbs, 'ARRAY'];

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

export default WidgetCollapsibleArr;