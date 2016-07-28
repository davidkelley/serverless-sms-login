import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../actions/users';
import { Link } from 'react-router';

class UsersLogin extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    var token = this.refs.token.value;
    var code = this.refs.code.value;
    var number = this.refs.number.value;

    if (code.length > 0 && code.match(/^[0-9]{6}$/)) {
      const user = {number, code, token};
      this.props.authenticateUser(user);
    } else {
      alert('Invalid code');
    }
  }

  render() {
    const { token } = this.props;
    const { number } = this.props;

    return (
      <div className="row">
        <div className="four columns offset-by-four">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Enter Code</h1>
            <hr />
            <p>Enter the code you receive via SMS shortly.</p>
            <input type="text" placeholder="Authentication Code" className="u-full-width" ref="code" />
            <input type="hidden" value={token} ref="token" />
            <input type="hidden" value={number} ref="number" />
            <input type="submit" className="button button-primary" value="Submit Code" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.users };
}

export default connect(mapStateToProps, { authenticateUser })(UsersLogin);
