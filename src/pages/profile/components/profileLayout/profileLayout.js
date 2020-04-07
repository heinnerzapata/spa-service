import React from 'react';
import './profileLayout.scss';

const ProfileLayout = (props) => {
  return (
    <section className="profile-layout">
      {props.children}
    </section>
  );
}

export default ProfileLayout;