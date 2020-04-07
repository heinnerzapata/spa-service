import * as React from 'react';
import PropTypes from 'prop-types';
import { LANGUAGES } from './../../../variables/constants/constants';
import flagES from '../../../static/media/images/flags/es.svg';
import flagGB from '../../../static/media/images/flags/gb.svg';

const V7FlagIcon = (props) => {
  const style = {
    width: `${props.width}px`,
    height: `${props.width}px`,
    borderRadius: '50%'
  }

  function getIcon(flag){
    let result;
    switch (flag) {
      case LANGUAGES[1].language.toUpperCase(): {
        result = flagES;
        break;
      }
      case LANGUAGES[0].language.toUpperCase(): {
        result = flagGB;
        break;
      }
      default: {
        result = flagGB;
        break;
      }
    }
    return result;
  }

  return(
    <img src={getIcon(props.flag)}
         alt="render"
         style={style} />
  );
}

V7FlagIcon.propTypes = {
  trigger: PropTypes.oneOf(LANGUAGES.map(index => { return index.language })),
  list: PropTypes.object,
  flag: PropTypes.string
}

export default V7FlagIcon;