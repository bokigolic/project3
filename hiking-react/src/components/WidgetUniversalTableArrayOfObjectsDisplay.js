
import { js_utils } from '../utils/js-utils';
import { _to_human_readable_string } from '../utils/web-design-utils';
import ApicrumbsDisplay from './ApicrumbsDisplay';

// ARRAY OF OBJECTS TABLE DISPLAY

const WidgetUniversalTableArrayOfObjectsDisplay = (props) => {
  const data = props.data;

  let arr = [];
  if (Array.isArray(data)) {
    arr = data;
  }

  // get keys from cells of the first row
  let cell_keys = []
  if (arr[0]) {
    if (js_utils.is_object(arr[0])) {
      Object.keys(arr[0]).forEach(k => {
        cell_keys.push(k);
      });
    }
  }

  let jsxTableHeaderRowCells = cell_keys.map(k => {
    if (k === 'imagePath') {
      return (
        <th key={k}></th>
      );
    } else {
      return (
        <th key={k} className="text-left"><b>{_to_human_readable_string(k)}</b></th>
      );
    }
  });

  let jsxTableRows = arr.map((row, index) => {
    let jsxCells = cell_keys.map(k => {
      let item = row[k];
      let alt = '';
      if (row.name) {
        alt = row.name;
      }
      if (k === 'imagePath') {
        return (
          <td key={k} className="text-left">
            <div className="avatar" >
              <img
                src={item}
                alt={alt}
              />
            </div>
          </td>
        );
      } else if (k === 'ambassadorsImageSource') {
        return (
          <td key={k} className="text-left">
            <div className="avatar" >
              <img
                src={item}
                alt={alt}
              />
            </div>
          </td>
        );
      } else if (k === 'href') {
        return (
          <td key={k} className="text-left">
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
            >{item}</a>
          </td>
        );
      } else if (k === 'website') {
        return (
          <td key={k} className="text-left">
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
            >{item}</a>
          </td>
        );
      } else if (k === 'email') {
        return (
          <td key={k} className="text-left">
            <a
              href={"mailto:" + item}
            >{item}</a>
          </td>
        );
      } else {
        return (
          <td key={k} className="text-left">{item}</td>
        );
      }
    });
    return (
      <tr key={index}>
        {jsxCells}
      </tr>
    );
  });

  let jsxTable = (
    <table className="table-aoo">
      <thead>
        <tr>
          {jsxTableHeaderRowCells}
        </tr>
      </thead>
      <tbody>
        {jsxTableRows}
      </tbody>
    </table>
  );

  return (
    <div className="aoa-table">
      <h4 className="dev-info">AOO TABLE</h4>
      <ApicrumbsDisplay apicrumbs={props.apicrumbs} />
      {jsxTable}
    </div>
  );
};

export default WidgetUniversalTableArrayOfObjectsDisplay;