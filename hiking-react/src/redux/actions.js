export const actionRouteSet = (route_key)=>{
  return {
    type: 'ROUTE_SET',
    payload: route_key
  }
};

export const actionDrawerOpen = ()=>{
  return {
    type: 'DRAWER_OPEN'
  }
};
export const actionDrawerClose = ()=>{
  return {
    type: 'DRAWER_CLOSE'
  }
};
export const actionDrawerToggle = ()=>{
  return {
    type: 'DRAWER_TOGGLE'
  }
};

export const actionDevModeToggle = ()=>{
  return {
    type: 'DEV_MODE_TOGGLE'
  }
};