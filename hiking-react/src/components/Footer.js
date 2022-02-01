import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useFetchGetMethod } from "../hooks/useFetchGetmethod";
import { api_url_make } from "../utils/ischool-utils";
import { js_utils } from "../utils/js-utils";
import SpinnerInline from "./SpinnerInline";
import Link from './Link';

const Footer = () => {
  const apikey = 'footer';
  const api_url = api_url_make([apikey]);

  const [fetching, data, failed] = useFetchGetMethod(api_url, 0); // custom hook

  let footer_data_ready = false;

  let jsxSpinner = (
    <SpinnerInline />
  );
  let jsxContent = null;
  let jsxSocial = null;
  let jsxNews = null;
  if (fetching === false) {
    jsxSpinner = null;
    if (failed === true) {
      jsxContent = (
        <FontAwesomeIcon icon={faExclamationTriangle} />
      );
    } else {
      if (data !== null) {
        footer_data_ready = true;
      }
    }
  }


  if (footer_data_ready) {
    // display data
    let quicklinks_arr = [];
    if (js_utils.is_object(data)) {
      quicklinks_arr = data.quickLinks;
      /*
      title	"Our Social Presence"
      tweet	"WE'RE READY! ARE YOU? #RIT https://t.co/NXHaXKjBWu"
      by	"@ISTatRIT via Twitter"
      twitter	"https://twitter.com/istatrit"
      facebook	"https://www.facebook.com/ISTatRIT"
      */
      let social = {};
      if (js_utils.is_object(data.social)) {
        social = data.social;
      }
      jsxSocial = (
        <>
          <div><b>{social.title}</b></div>
          <div>{social.tweet}</div>
          <div>{social.by}</div>
          <div><Link href={social.twitter} title={'Twitter'} /></div>
          <div><Link href={social.facebook} title={'Facebook'} /></div>
        </>
      );
      jsxNews = (
        <>
          <Link href={data.news} title={'News'} />
        </>
      );
    }

    let jsxQuickLinksArr = quicklinks_arr.map((item, index) => {
      return (
        <div key={index}>
          <Link href={item.href} title={item.title} />
        </div>

      );
    });

    /*
    http://ist.rit.edu/api/footer/copyright

    {
      "title": "Copyright",
      "html": "<p>Copyright \u00a9 <a href=\"http://www.rit.edu/\">Rochester Institute of Technology</a>. All Rights Reserved .<br><a href=\"http://www.rit.edu/copyright.html\">Copyright Infringement</a>&nbsp;|&nbsp;<a href=\"http://www.rit.edu/privacystatement.html\">Privacy Statement</a>&nbsp;|&nbsp;<a href=\"http://www.rit.edu/disclaimer.html\">Disclaimer</a>&nbsp;|&nbsp;<a href=\"http://www.rit.edu/nondiscrimination.html\">Nondiscrimination</a></p>"
    }
    */
    let jsxCopyright = (
      <div className="copyright">
        <p>Copyright © <a href="http://www.rit.edu/">Rochester Institute of Technology</a>. All Rights Reserved .<br /><a href="http://www.rit.edu/copyright.html">Copyright Infringement</a>&nbsp;|&nbsp;<a href="http://www.rit.edu/privacystatement.html">Privacy Statement</a>&nbsp;|&nbsp;<a href="http://www.rit.edu/disclaimer.html">Disclaimer</a>&nbsp;|&nbsp;<a href="http://www.rit.edu/nondiscrimination.html">Nondiscrimination</a></p>
      </div>
    );

    jsxContent = (
      <>
        <div className="footer-columns">
          <div className="col">
            {jsxSocial}
          </div>
          <div className="col bold">
            {jsxQuickLinksArr}
          </div>
          <div className="col bold">
            {jsxNews}
          </div>
        </div>
        <p />
        {jsxCopyright}
        {jsxSpinner}
      </>
    );
  }


  return (
    <footer>
      {jsxContent}
    </footer>
  );
}

export default Footer;