import { js_utils } from '../utils/js-utils';
import Link from './Link';
import WidgetOnlyQuoteDisplay from './WidgetOnlyQuoteDisplay';

// display many typesof fetched data in a shape of an article

const WidgetUniversalArticleObjDisplay = (props) => {
  const data = props.data;

  let jsxContent = null;
  if (data !== null && js_utils.is_object(data)) {
    let jsx = {};

    jsx.title = null;
    if (data.title) {
      jsx.title = (
        <h3>{data.title}</h3>
      );
    }

    jsx.subTitle = null;
    if (data.subTitle) {
      jsx.subTitle = (
        <p className="subtitle">{data.subTitle}</p>
      );
    }

    jsx.nameOfPlace = null;
    if (data.nameOfPlace) {
      jsx.nameOfPlace = (
        <h3>{data.nameOfPlace}</h3>
      );
    }

    jsx.date = null;
    if (data.date) {
      jsx.date = (
        <div className="article-date">{data.date}</div>
      );
    }

    jsx.courseID = null;
    if (data.courseID) {
      jsx.courseID = (
        <div className="article-course-id">{data.courseID}</div>
      );
    }

    jsx.degreeName = null;
    if (data.degreeName) {
      jsx.degreeName = (
        <div className="article-course-id">{data.degreeName}</div>
      );
    }

    jsx.areaName = null;
    if (data.areaName) {
      jsx.areaName = (
        <div className="article-body-item"><b>{data.areaName}</b></div>
      );
    }

    jsx.facultyName = null;
    if (data.facultyName) {
      jsx.facultyName = (
        <p className="article-body-item">Faculty name: {data.facultyName}</p>
      );
    }

    jsx.username = null;
    if (data.username) {
      jsx.username = (
        <div className="article-body-item">Username: {data.username}</div>
      );
    }

    jsx.description = null;
    if (data.description) {
      jsx.description = (
        <div className="article-body description">{data.description}</div>
      );
    }

    jsx.tutoringLabHoursLink = null;
    if (data.tutoringLabHoursLink) {
      jsx.tutoringLabHoursLink = (
        <p className="article-body-item" >
          <Link
            href={data.tutoringLabHoursLink}
            title={data.tutoringLabHoursLink}
          />
        </p >
      );
    }

    jsx.RITJobZoneGuidelink = null;
    if (data.RITJobZoneGuidelink) {
      jsx.RITJobZoneGuidelink = (
        <p className="article-body-item" >
          <Link
            href={data.RITJobZoneGuidelink}
            title={data.RITJobZoneGuidelink}
          />
        </p >
      );
    }

    jsx.quote = null;
    if (data.quote) {
      jsx.quote = (
        <WidgetOnlyQuoteDisplay quote={data.quote} quoteAuthor={data.quoteAuthor} />
      );
    }

    jsx.ambassadorsImageSource = null;
    if (data.ambassadorsImageSource) {
      jsx.ambassadorsImageSource = (
        <div className="article-image" >
          <img
            src={data.ambassadorsImageSource}
            alt={data.ambassadorsImage}
          />
        </div>
      );
    }

    jsxContent = (
      <div className="article">
        {jsx.title}
        {jsx.subTitle}
        {jsx.nameOfPlace}
        {jsx.date}
        {jsx.courseID}
        {jsx.degreeName}
        {jsx.areaName}
        {jsx.facultyName}
        {jsx.username}
        {jsx.description}
        {jsx.tutoringLabHoursLink}
        {jsx.quote}
        {jsx.ambassadorsImageSource}
      </div>
    );
  }

  return (
    <div className="arr-news-item">
      {jsxContent}
    </div>
  );
};

export default WidgetUniversalArticleObjDisplay;