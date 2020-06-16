import React from "react";
import "./v7LanguageSelector.module.scss";
import { V7Avatar, AVATAR_SIZES } from "components";
import { DEFAULT_CONFIG, LANGUAGES_OPTIONS } from "variables/constants";
import { LANGUAGES, ILanguagesOptions } from "models";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import flagES from "static/media/images/flags/es.svg";
import flagGB from "static/media/images/flags/gb.svg";
import { useTranslation } from "react-i18next";
import { COLORS } from "variables/constants";
import "i18n";

interface v7LanguageSelectorProps {}

const V7LanguageSelector: React.SFC<v7LanguageSelectorProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState<any>(
    i18n.language
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: string) => {
    if (typeof lang === "string") {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
    setAnchorEl(null);
  };

  const getAvatarByLang = (lang: string) => {
    let result = flagES;

    switch (lang) {
      case LANGUAGES.EN:
        result = flagGB;
        break;
    }

    return result;
  };

  let items = LANGUAGES_OPTIONS.map(
    (item: ILanguagesOptions, index: number) => {
      return (
        <MenuItem
          key={`item-language-${index}`}
          onClick={() => handleClose(item.language)}
        >
          <V7Avatar
            size={AVATAR_SIZES.SMALL}
            alt={`item-language-${index}`}
            src={getAvatarByLang(item.language)}
          />{" "}
          {t(`languages.${item.language}`)}
        </MenuItem>
      );
    }
  );

  return (
    <React.Fragment>
      <div onClick={handleClick}>
        <V7Avatar
          alt={`item-language-selected`}
          src={getAvatarByLang(language)}
        />
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

export default V7LanguageSelector;
