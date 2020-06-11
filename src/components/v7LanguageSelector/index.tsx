import React from "react";
import "./v7LanguageSelector.module.scss";
import { V7Avatar } from "components";
import cx from "classnames";
import { DEFAULT_CONFIG, LANGUAGES } from "variables/constants";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withTranslation, WithTranslation } from "react-i18next";
import flagES from 'static/media/images/flags/es.svg';
import flagGB from 'static/media/images/flags/gb.svg';

interface v7LanguageSelectorProps extends WithTranslation {
  t: any;
}

const V7LanguageSelector: React.SFC<v7LanguageSelectorProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: string) => {
    props.i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  let items = LANGUAGES.map((item) => {
    return (
      <MenuItem onClick={() => handleClose(item.language)}>
        {props.t(`languages.${item.language}`)}
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      <div onClick={handleClick}>
        <V7Avatar alt="Remy Sharp" src={flagES} />
      </div>
      <Menu
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

export default withTranslation("common")(V7LanguageSelector);
