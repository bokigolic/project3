// Please describe here if you customized this file

export const responsive_utils = {};

responsive_utils.on_event_scroll = function (e) {
  // console.log("event_scroll(e) ");
  // console.log(e);
  let window_scrolled_px = document.documentElement.scrollTop;
  // console.log(window_scrolled_px);

  // mark page with css class when scrolling is detected
  if (window_scrolled_px >= 2) {
    // document.documentElement.classList.add('scrolled'); // html element
    document.body.classList.add('scrolled'); // body
  } else {
    // document.documentElement.classList.remove('scrolled'); // html element
    document.body.classList.remove('scrolled'); // body
  }

  // mark page with css class when scrolled enough to show scroll to top button
  if (window_scrolled_px > 1080) {
    // document.documentElement.classList.add('scrolled'); // html element
    document.body.classList.add('scrolled-bellow-sidebar'); // body
  } else {
    // document.documentElement.classList.remove('scrolled'); // html element
    document.body.classList.remove('scrolled-bellow-sidebar'); // body
  }
}

responsive_utils.init = function () {
  window.onscroll = responsive_utils.on_event_scroll;
}
