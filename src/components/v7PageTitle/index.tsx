import React from "react";
import styles from "./v7PageTitle.module.scss";

interface v7PageTitleProps {
  title: string;
}

const V7PageTitle: React.SFC<v7PageTitleProps> = (props) => {
  return (
    <section className={styles.vol7erPageTitle}>
      <div className={styles.back} />
      <div className={styles.cover} />
      <div className={styles.content}>{props.title.toUpperCase()}</div>
    </section>
  );
};

export default V7PageTitle;
