import React from 'react';

export default function SmallProfile(props) {
  if (props.profile) {
    return (
      <div className="small-profile">
        <img
          src={props.profile.avatar}
          alt={props.profile.personaname}
        />
        <span>{props.profile.personaname}</span>
      </div>
    );
  }
  return (
    <div className="small-profile">
      <img
        src={'https://steamdb.info/static/img/default.jpg'}
        alt={'Default Steam avatar'}
      />
    </div>
  );
}

SmallProfile.defaultProps = {
  profile: null,
};

SmallProfile.propTypes = {
  profile: React.PropTypes.shape({
    profileurl: React.PropTypes.string,
    personaname: React.PropTypes.string,
    avatarfull: React.PropTypes.string,
    avatar: React.PropTypes.string,
  }),
};
