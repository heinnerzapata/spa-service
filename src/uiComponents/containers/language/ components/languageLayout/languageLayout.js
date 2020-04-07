import React from 'react';
import './languageLayout.scss';

const LanguageLayout = (props) => {
  return (
    <div className="language-layout">
      { props.children }
    </div>
  );
};

export default LanguageLayout;