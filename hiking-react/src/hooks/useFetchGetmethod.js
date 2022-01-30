import { useEffect, useState } from 'react';
import { ajax_fetch } from '../utils/ajax-fetch-utils';

export const useFetchGetMethod = (url, freshness) => {
  const [state, setState] = useState({ fetching: true, failed: false, data: null }); // state for ajax data

  useEffect(() => {
    //
    // STEP 1 ?

    // STEP 2 set spinner
    setState({
      fetching: true,
      failed: false,
      data: null
    });

    ajax_fetch.getmethod_send(url)
      .then(response => {
        // log original response (before extract json)
        console.log('response from ', url);
        // console.log(response);
        return response;
        // return ajax_fetch.response_json_smart(response);
      })
      .then(response => response.json())
      .then((res_js) => {
        // console.log('res_js');
        // console.log(res_js);
        // STEP 3 when fetching done
        setState({
          fetching: false,
          failed: false,
          data: res_js
        });
      })
      .catch((error) => {
        console.log('hook catch ERROR GET ajax_fetch.getmethod_send() ');
        console.log(url);
        console.log(error);
        setState({
          fetching: false,
          failed: true,
          data: null
        });
      });

  }, [url, freshness]); // Only re-run the effect if url or freshness changes

  return [state.fetching, state.data, state.failed];
};