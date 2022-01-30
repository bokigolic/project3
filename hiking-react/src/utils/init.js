import { responsive_utils } from '../utils/responsive-utils';

// INIT

export const init = () => {
  // INIT RESPONSIVE
  responsive_utils.init();
  console.log('init() completed');
  return Promise.resolve(true);
};
