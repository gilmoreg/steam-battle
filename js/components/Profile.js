import React from 'react';

export default function Profile(props) {
  const { profile } = props;
  return (
    <div className="profile" id="{this.props.id}">
      <h2>
        <a href={profile.profileurl} title={profile.personaname}>
          {profile.personaname}
        </a>
      </h2>
      <p>
        <img
          src={profile.avatarfull}
          alt={profile.personaname}
          title={profile.personaname}
        />
      </p>
    </div>
  );
}
