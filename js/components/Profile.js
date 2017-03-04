import React from 'react';

export default function Profile(props) {
  const { player } = props;
  return (
    <div className="profile" id="{this.props.id}">
      <h2>
        <a href={player.profile.profileurl} title={player.profile.personaname}>
          {player.profile.personaname}
        </a>
      </h2>
      <p>
        <img
          src={player.profile.avatarfull}
          alt={player.profile.personaname}
          title={player.profile.personaname}
        />
      </p>
    </div>
  );
}
