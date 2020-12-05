import React from "react";
import styles from "./v7Avatar.module.scss";
import Avatar from "@material-ui/core/Avatar";
import { createUseStyles } from "react-jss";
import cx from "classnames";

interface v7AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: AVATAR_SIZES;
}

export enum AVATAR_SIZES {
  SMALL = 25,
  MEDIUM = 35,
  LARGE = 45,
}

const useStyles = createUseStyles({
  size: {
    width: (props: v7AvatarProps) => `${props.size}px`,
    height: (props: v7AvatarProps) => `${props.size}px`,
  },
});

const V7Avatar: React.SFC<v7AvatarProps> = (props) => {
  const classes = useStyles(props.size ? props.size : AVATAR_SIZES.MEDIUM);
  return (
    <div className={styles.v7Avatar}>
      <Avatar
        alt={props.alt}
        src={props.src}
        className={cx(props.className ? props.className : "", classes.size)}
      >
        {props.children}
      </Avatar>
    </div>
  );
};

export default V7Avatar;
