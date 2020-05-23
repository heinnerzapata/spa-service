import React, { Component } from 'react';
import { V7Dropdown, V7FlagIcon } from 'uiComponents/components';
import { Row, Col } from 'react-flexbox-grid';
import { NavItem } from 'react-materialize';
import { LANGUAGES } from './../../../variables/constants/constants';
import { withTranslation } from 'react-i18next';
import LanguageLayout from './ components/languageLayout/languageLayout';
import { DEFAULT_CONFIG } from "./../../../variables/constants/constants";

class Language extends Component {
  state = {
    language: DEFAULT_CONFIG.defaultLanguage
  }

  handleLanguageClick(e, lang) {
    e.preventDefault();
    this.props.i18n.changeLanguage(lang);
    this.setState({ language: lang });
  }

  getTrigger = (trigger) => {
    return (
      <V7FlagIcon width={this.props.width} flag={trigger.toUpperCase()} />
    )
  }

  render() {
    const { t } = this.props;
    let languagesList = LANGUAGES.map((object, i) => {
      return (
        <NavItem
          onClick={(e) => { this.handleLanguageClick(e, object.language) }}
          key={i}>
          <Row middle="xs" center="xs">
            <Col xs={8}>
              {t(`languages.${object.language}`)}
            </Col>
            <Col xs={4}>
              <V7FlagIcon width={20} flag={object.language.toUpperCase()} />
            </Col>
          </Row>
        </NavItem>
      )
    });
    return (
      <LanguageLayout>
        <V7Dropdown 
          trigger={this.getTrigger(this.state.language)}
          list={languagesList} />
      </LanguageLayout>
    )
  }
}

export default withTranslation('common')(Language);