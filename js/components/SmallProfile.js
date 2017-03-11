import React from 'react';

export default function SmallProfile(props) {
  if (props.profile) {
    return (
      <div className="small-profile">
        <img
          src={props.profile.avatar}
          alt={props.profile.personaname}
          style={{}}
        />
        <span>{props.profile.personaname}</span>
      </div>
    );
  }
  return (<div />);
}

SmallProfile.propTypes = {
  profile: React.PropTypes.shape({
    profileurl: React.PropTypes.string,
    personaname: React.PropTypes.string,
    avatarfull: React.PropTypes.string,
    avatar: React.PropTypes.string,
  }).isRequired,
};
