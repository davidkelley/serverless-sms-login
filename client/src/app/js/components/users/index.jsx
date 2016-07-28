import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/users';
import { Link } from 'react-router';

class UsersIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    var number = this.refs.number.value;

    if (number.length !== 0) {
      number = number.replace(/[^+0-9]/g,'');
      if (number.match(/^\+?[1-9]\d{1,14}$/)) {
        const user = {number};
        this.props.loginUser(user);
      } else {
        alert('Invalid number. Ensure country code is present!');
      }
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Login</h1>
            <hr />
            <p>Enter your phone number, including country code (eg. +1).</p>
            <input type="text" placeholder="number" className="u-full-width" ref="number" />
            <input type="submit" className="button button-primary" value="Send Code" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginUser })(UsersIndex);
