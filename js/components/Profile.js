import React from 'react';

export default function Profile(props) {
  const { profile } = props;
  return (
    <div className="profile">
      <h2>
        <a
          href={profile.profileurl}
          target="_blank"
          rel="noopener noreferrer"
          title={profile.personaname}
        >
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

Profile.propTypes = {
  profile: React.PropTypes.shape({
    profileurl: React.PropTypes.string,
    personaname: React.PropTypes.string,
    avatarfull: React.PropTypes.string,
  }).isRequired,
};
