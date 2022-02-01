const SPACE = ' ';

export const scroll_to_top = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const _to_human_readable_string = (str) => {
  // convert camelCase to normal human readablestring
  let str1 = '';
  if (typeof str === 'string') {
    str1 = str;
  }
  const str2 = str1.split(/(?=[A-Z])/).join(SPACE).toLowerCase(); // add spaces between words
  const str3 = str2.charAt(0).toUpperCase() + str2.slice(1); // Uppercase first character
  return str3;
};