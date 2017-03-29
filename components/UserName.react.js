import React from 'react';
import {connect} from 'react-redux';

class UserName extends React.Component {
  render() {
    return (
      <span className="user-name">
        <b>Signed in as: </b>
        {this.props.user}
      </span>
    );
  };
};

export default UserName;
