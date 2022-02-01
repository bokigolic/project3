const SLASH = '/';

export const api_url_prefix = "http://ist.rit.edu/api";

export const apicrumbs_string_make = (apikeys) => {
  let apicrumbs_string = '';
  if (Array.isArray(apikeys)) {
    apikeys.forEach(apikey => {
      apicrumbs_string += SLASH + apikey;
    });
  }
  return apicrumbs_string;
};

export const api_url_make = (apikeys) => {
  let url = api_url_prefix;
  url += apicrumbs_string_make(apikeys);
  return url;
};

export const api_url_course_make = (courseID) => {
  let url = api_url_prefix;
  url += SLASH + 'course/courseID=' + courseID; // example http://ist.rit.edu/api/course/courseID=CSEC-101
  return url;
};

//all api root keys
export const api_root_keys = [
  "about",
  "degrees",
  "minors",
  "employment",
  "people",
  "research",
  "resources",
  "news",
  "footer",
  "courses"
];

// keys for navigation menu
export const nav_keys = [
  "about",
  "degrees",
  "minors",
  "courses",
  "employment",
  "people",
  "research",
  "resources",
  "news"
];

// following instructions are used by UniversalContentRoutercomponent. Based on that instruction UniversalContentRouter made decisions how to displayparticular segments of API data...
const api_instructions = {
  //
  "/about": {
    _widget: "ONLY_ABOUT",
    type: "OBJECT"
  },

  //
  "/courses": {
    _widget: "ONLY_COURSES",
    type: "ARRAY"
  },
  "/courses/ARRAY/courses": {
    _widget: "COURSES",
    type: "ARRAY"
  },

  //
  "/degrees": {
    _widget: "ONLY_DEGREES",
    type: "OBJECT"
  },
  /*
  "/degrees/graduate/ARRAY/concentrations": {
    _widget: "ARRAY_OF_STRINGS",
    type: "ARRAY"
  },
  */

  // employment finished
  "/employment": {
    _widget: "ONLY_EMPLOYMENT",
    type: "OBJECT"
  },
  "/employment/introduction/content/ARRAY": {
    _widget: "UNI_ARTICLE",
    type: "ARRAY"
  },
  "/employment/degreeStatistics/statistics": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },
  "/employment/employers/employerNames": {
    _widget: "ARRAY_OF_STRINGS",
    type: "ARRAY"
  },
  "/employment/careers/careerNames": {
    _widget: "ARRAY_OF_STRINGS",
    type: "ARRAY"
  },

  "/employment/coopTable/coopInformation": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },
  "/employment/employmentTable/professionalEmploymentInformation": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },

  //
  "/minors": {
    _widget: "ONLY_MINORS",
    type: "OBJECT"
  },
  "/minors/UgMinors/ARRAY/courses": {
    _widget: "COURSES",
    type: "ARRAY"
  },

  // news finished
  "/news": {
    _widget: "ONLY_NEWS",
    type: "OBJECT"
  },
  /*
  "/news/year/ARRAY": {
    _widget: "UNI_ARTICLE",
    type: "OBJECT"
  },
  "/news/older/ARRAY": {
    _widget: "UNI_ARTICLE",
    type: "OBJECT"
  },
  */

  // people finished
  "/people": {
    _widget: "ONLY_PEOPLE",
    type: "OBJECT"
  },
  "/people/faculty": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },
  "/people/staff": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },

  //
  "/research": {
    _widget: "ONLY_RESEARCH",
    type: "OBJECT"
  },
  "/research/byInterestArea": {
    _widget: "COLLAPSIBLE_ARRAY",
    type: "ARRAY"
  },
  "/research/byInterestArea/ARRAY/citations": {
    _widget: "ARRAY_OF_STRINGS",
    type: "ARRAY"
  },

  //
  "/resources": {
    _widget: "ONLY_RESOURCES",
    type: "OBJECT"
  },
  "/resources/coopEnrollment/enrollmentInformationContent/ARRAY": {
    _widget: "UNI_ARTICLE",
    type: "OBJECT"
  },
  "/resources/studyAbroad/places/ARRAY": {
    _widget: "UNI_ARTICLE",
    type: "OBJECT"
  },
  "/resources/studentServices/professonalAdvisors/advisorInformation": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },
  "/resources/studentServices/istMinorAdvising/minorAdvisorInformation": {
    _widget: "AOO_TABLE",
    type: "ARRAY"
  },

};


export const _get_instruction = (apicrumbs) => {
  let _instructions = false;
  let k = '';
  if (Array.isArray(apicrumbs)) {
    apicrumbs.forEach(crumb => {
      // console.log(crumb);
      k += SLASH + crumb;
      // console.log(k);
    });
  }
  // return k;
  if (k && api_instructions[k] && api_instructions[k]._widget) {
    _instructions = {
      _widget: api_instructions[k]._widget
    }

  }
  // console.log(_instructions);
  return _instructions;
};

export const _get_my_apikey = (apicrumbs) => {
  return apicrumbs[apicrumbs.length - 1]; //getting last key inthe apipath
};
