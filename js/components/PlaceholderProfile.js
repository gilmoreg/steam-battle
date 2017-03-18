import React from 'react';

export default function PlaceholderProfile(props) {
  return (
    <div className="profile" id={`player${props.id}`}>
      <h3>
        Player {props.id + 1}
      </h3>
      <p>
        <img
          src="https://steamdb.info/static/img/default.jpg"
          alt="Default steam avatar"
        />
      </p>
    </div>
  );
}

PlaceholderProfile.defaultProps = {
  id: null,
};

PlaceholderProfile.propTypes = {
  id: React.PropTypes.number,
};

