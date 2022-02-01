import { js_utils } from "../utils/js-utils";
import Link from "./Link";
import WidgetUniversalArticleObjDisplay from "./WidgetUniversalArticleObjDisplay";
import WidgetUniversalTableArrayOfObjectsDisplay from "./WidgetUniversalTableArrayOfObjectsDisplay";

const WidgetOnlyResourcesDisplay = (props) => {

  // const apicrumbs = [...props.apicrumbs, 'ARRAY'];

  let item = {};
  if (js_utils.is_object(props.data)) {
    item = props.data;
  }


  let jsx = {};

  // 3
  const article_data1 = {
    description: item.studyAbroad.description
  };
  let jsxTemp1 = item.studyAbroad.places.map((article, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={article} />
    );
  });
  jsx.studyAbroad = (
    <>
      <h2>{item.studyAbroad.title}</h2>
      <WidgetUniversalArticleObjDisplay data={article_data1} />
      <h3>Places:</h3>
      <div className="indent">
        {jsxTemp1}
      </div>
    </>
  );

  // 4
  const article_data4_1 = {
    description: item.studentServices.academicAdvisors.description
  };
  const article_data4_3 = {
    description: item.studentServices.facultyAdvisors.description
  };
  jsx.studentServices = (
    <>
      <h2>{item.studentServices.title}</h2>
      <h3>{item.studentServices.academicAdvisors.title}</h3>
      <WidgetUniversalArticleObjDisplay data={article_data4_1} />
      <h4>{item.studentServices.academicAdvisors.faq.title}</h4>
      <p>
        <Link
          href={item.studentServices.academicAdvisors.faq.contentHref}
          title={item.studentServices.academicAdvisors.faq.contentHref}
        />
      </p>
      <h3>{item.studentServices.professonalAdvisors.title}</h3>
      <WidgetUniversalTableArrayOfObjectsDisplay data={item.studentServices.professonalAdvisors.advisorInformation} />
      <h3>{item.studentServices.facultyAdvisors.title}</h3>
      <WidgetUniversalArticleObjDisplay data={article_data4_3} />
      <h3>{item.studentServices.istMinorAdvising.title}</h3>
      <WidgetUniversalTableArrayOfObjectsDisplay data={item.studentServices.istMinorAdvising.minorAdvisorInformation} />
    </>
  );

  // 5
  const article_data5 = {
    description: item.tutorsAndLabInformation.description
  };
  jsx.tutorsAndLabInformation = (
    <>
      <h2>{item.tutorsAndLabInformation.title} TODO</h2>
      <WidgetUniversalArticleObjDisplay data={article_data5} />
      <div>
        <p>
          <Link
            href={item.tutorsAndLabInformation.tutoringLabHoursLink}
            title={'Tutoring Lab Hours'}
          />
        </p>
      </div>
    </>
  );

  // 6
  // ambassadorsImageSource
  let jsxTemp6 = item.studentAmbassadors.subSectionContent.map((article, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={article} />
    );
  });
  const article_data6 = {
    ambassadorsImageSource: item.studentAmbassadors.ambassadorsImageSource
  };
  jsx.studentAmbassadors = (
    <>
      <h2>{item.studentAmbassadors.title} TODO</h2>
      <WidgetUniversalArticleObjDisplay data={article_data6} />
      <div>
        <p>
          <Link
            href={item.studentAmbassadors.applicationFormLink}
            title={'Application form'}
          />
        </p>
        <p>{item.studentAmbassadors.note}</p>
      </div>
      {/*<h3>subSectionContent:</h3>*/}
      <div className="indent">
        {jsxTemp6}
      </div>
    </>
  );

  // 7
  let jsxTemp7a = item.forms.graduateForms.map((item, index) => {
    return (
      <p key={index} ><Link href={'https://www.rit.edu' + item.href} title={item.formName} /></p>
    );
  });
  let jsxTemp7b = item.forms.undergraduateForms.map((item, index) => {
    return (
      <p key={index} ><Link href={'https://www.rit.edu' + item.href} title={item.formName} /></p>
    );
  });
  jsx.forms = (
    <>
      <h2>Forms</h2>
      <WidgetUniversalArticleObjDisplay data={item.forms} />
      <div className="indent">
        <h3>Graduate forms</h3>
        {jsxTemp7a}
        <h3>Undergraduate forms</h3>
        {jsxTemp7b}
      </div>
    </>
  );

  // 8
  let jsxTemp8 = item.coopEnrollment.enrollmentInformationContent.map((article, index) => {
    return (
      <WidgetUniversalArticleObjDisplay key={index} data={article} />
    );
  });
  jsx.coopEnrollment = (
    <>
      <h2>{item.coopEnrollment.title}</h2>
      <div>
        <p>
          <Link
            href={item.coopEnrollment.RITJobZoneGuidelink}
            title={'RIT Job Zone Guide'}
          />
        </p>
      </div>
      {/*<h3>enrollmentInformationContent:</h3>*/}
      <div className="indent">
        {jsxTemp8}
      </div>
    </>
  );


  return (
    <div className="page-content" >
      <h1>{item.title}</h1>
      <p className="subTitle">{item.subTitle}</p>
      {jsx.studyAbroad}
      {jsx.studentServices}
      {jsx.tutorsAndLabInformation}
      {jsx.studentAmbassadors}
      {jsx.forms}
      {jsx.coopEnrollment}
    </div>
  );
};

export default WidgetOnlyResourcesDisplay;