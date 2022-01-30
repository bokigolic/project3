import { useState } from 'react';

export const useExpandOnlyOneCollapsible = (url, freshness) => {
  const [expandedKeys, setExpandedKeys] = useState({});

  const handleExpandClick = (k) => {
    let _opened = false;
    if (expandedKeys[k] === true) {
      _opened = false;
    } else {
      _opened = true;
    }
    setExpandedKeys({
      [k]: _opened
    });
  };

  return [expandedKeys, handleExpandClick];
};