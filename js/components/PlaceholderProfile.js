import React from 'react';

export default function PlaceholderProfile(props) {
  return (
    <div className="profile" id={`player${props.id}`}>
      <h2>
        Player {props.id}
      </h2>
      <p>
        <img
          src="https://steamdb.info/static/img/default.jpg"
          alt="Default steam avatar"
        />
      </p>
    </div>
  );
}

PlaceholderProfile.propTypes = {
  id: React.PropTypes.number.isRequired,
};

