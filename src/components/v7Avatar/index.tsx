import React from "react";
import styles from "./v7Avatar.module.scss";
import Avatar from "@material-ui/core/Avatar";

interface v7AvatarProps {
  src?: string;
  alt?: string;
}

const V7Avatar: React.SFC<v7AvatarProps> = (props) => {
  return (
    <div className={styles.v7Avatar}>
      <Avatar alt={props.alt} src={props.src}>
        {props.children}
      </Avatar>
    </div>
  );
};

export default V7Avatar;
