import React from "react";
import { Grid } from "react-flexbox-grid";
import Tools from "uiComponents/tools/Tools";
import "./PageContainer.scss";

const PageContainer = props => {
  return (
    <section className="vol7er-page-container">
      {!props.isFull && (
        <Grid
          fluid={true}
          className={[
            props.isMarginTopActivated
              ? "vol7er-page-container--margin-variable"
              : "",
            "vol7er-page-container__grid"
          ].join(" ")}
        >
          {props.children}
        </Grid>
      )}
      {props.isFull && <div>{props.children}</div>}
      {props.showTools && <Tools />}
    </section>
  );
};

export default PageContainer;
