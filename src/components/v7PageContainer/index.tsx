import React from "react";
import styles from "./v7PageContainer.module.scss";
import { Grid } from "react-flexbox-grid";
import { createUseStyles } from "react-jss";

interface v7PageContainerProps {
  isFull?: boolean;
  isMarginTopActivated?: boolean;
  showTools?: boolean;
  marginTop?: number;
  marginBotton?: number;
}

const useStyles = createUseStyles({
  v7PageContainer: {
    paddingTop: (props: v7PageContainerProps) =>
      `${props.marginTop ? props.marginTop : 20}px`,
    marginBotton: (props: v7PageContainerProps) =>
      `${props.marginBotton ? props.marginTop : 20}px`,
  },
});

const V7PageContainer: React.SFC<v7PageContainerProps> = (props) => {
  const classes = useStyles(props);
  return (
    <section className={styles.vol7erPageContainer}>
      {!props.isFull && (
        <Grid
          fluid={true}
          className={props.isMarginTopActivated ? styles.marginVariable : ""}
        >
          <div className={classes.v7PageContainer}>{props.children}</div>
        </Grid>
      )}
      {props.isFull && <div>{props.children}</div>}
      {/* {props.showTools && <Tools />} */}
    </section>
  );
};

export default V7PageContainer;
