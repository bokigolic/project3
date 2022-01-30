const WidgetOnlyQuoteDisplay = (props) => {
  let jsx = {};

  jsx.quoteAuthor = null;
  if (props.quoteAuthor) {
    jsx.quoteAuthor = (
      <b>{props.quoteAuthor}</b>
    );
  }

  jsx.quote = null;
  if (props.quote) {
    jsx.quote = (
      <p className="quote" >
        {props.quote}<br /><br />
        {jsx.quoteAuthor}
      </p>
    );
  }

  return (
    <>
      {jsx.quote}
    </>
  );
};

export default WidgetOnlyQuoteDisplay;