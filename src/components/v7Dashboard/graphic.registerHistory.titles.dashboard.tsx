import React from 'react';

interface IRegisterHistoryTitleGraphic {
  textTitle: string;
  textSubtitle: string;
}

const RegisterHistoryTitleGraphic: React.FC<IRegisterHistoryTitleGraphic> = (props) => {
  const textTitle = <h1 className="mb-0 font-light">{props.textTitle}</h1>;

  const textSubtitle = <small>{props.textSubtitle}</small>;

  return (
    <div>
      {textTitle}
      {textSubtitle}
    </div>
  );
};

export default RegisterHistoryTitleGraphic;
