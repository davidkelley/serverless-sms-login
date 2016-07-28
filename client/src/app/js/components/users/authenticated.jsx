import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class UsersAuthenticated extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  
  render() {
    const { session } = this.props;

    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <h1>Authenticated!</h1>
          <hr />
          <p>Your session token: {session}</p>
          <hr />
          <Link to='/' className="button u-full-width">Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.users };
}

export default connect(mapStateToProps, null)(UsersAuthenticated);
