import React from "react";
import { V7Avatar, V7Icon } from "components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { COLORS } from "variables/constants";
import { createUseStyles } from "react-jss";

interface v7LanguageSelectorProps {
  imgUrl: string;
  onLogOutClick?: () => void;
}

export enum MENU_OPTIONS_TYPE {
  LOG_OUT = 0,
}

interface IMenuOptions {
  label: string;
  type: MENU_OPTIONS_TYPE;
}

const useStyles = createUseStyles({
  v7Avatar: {
    marginRight: "10px",
  },
});

const MENU_OPTIONS: IMenuOptions[] = [
  { label: "logout", type: MENU_OPTIONS_TYPE.LOG_OUT },
];

const V7UserOptions: React.SFC<v7LanguageSelectorProps> = (props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type: MENU_OPTIONS_TYPE) => {
    switch (type) {
      case MENU_OPTIONS_TYPE.LOG_OUT:
        if (props.onLogOutClick) {
          props.onLogOutClick();
        }
        break;
    }

    setAnchorEl(null);
  };

  const classes = useStyles(props);

  let items = MENU_OPTIONS.map((item: IMenuOptions, index: number) => {
    return (
      <MenuItem
        key={`item-language-${index}`}
        onClick={() => handleClose(item.type)}
      >
        <V7Icon className={classes.v7Avatar} icon={faSignOutAlt} size={"2x"} />
        {t(`components.header.menu.${item.label}`)}
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      <div onClick={handleClick}>
        <V7Avatar alt={`item-language-selected`} src={props.imgUrl} />
      </div>
      <Menu
        PaperProps={{
          style: {
            backgroundColor: COLORS.vol7erTitle,
            color: COLORS.white,
          },
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items}
      </Menu>
    </React.Fragment>
  );
};

export default V7UserOptions;
