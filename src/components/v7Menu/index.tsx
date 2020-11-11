import React, { useState } from "react";
import styles from "./v7Menu.module.scss";
import { V7Avatar } from "components";
import { createUseStyles } from "react-jss";
import OutsideClickHandler from "react-outside-click-handler";
import cx from "classnames";

interface v7MenuProps {
  height?: number;
  width?: number;
  menuImage: string;
  onItemClick?: (index: number) => void;
  listItems: React.ReactNode[];
}

const useStyles = createUseStyles({
  menu: {
    height: (props: v7MenuProps) =>
      props.height ? `${props.height}px` : "auto",
    width: (props: v7MenuProps) => (props.width ? `${props.width}px` : "auto"),
  },
});
const V7Menu: React.SFC<v7MenuProps> = (props) => {
  const classes = useStyles(props);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItem = (index: number) => {
    setMenuOpen(false);
    if (props.onItemClick) {
      props.onItemClick(index);
    }
  };

  return (
    <div className={styles.v7Menu}>
      <div onClick={handleClickMenu}>
        <V7Avatar alt={`item-language-selected`} src={props.menuImage} />
      </div>
      {menuOpen && (
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpen(false);
          }}
        >
          <div className={cx(classes.menu, styles.menuContainer)}>
            <ul className={styles.list}>
              {props.listItems.map((item, i) => {
                return <li onClick={() => handleItem(i)}>{item}</li>;
              })}
            </ul>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default V7Menu;
