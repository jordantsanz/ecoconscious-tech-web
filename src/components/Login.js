/* eslint-disable react/no-this-in-sfc */
import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { logInUser } from '../actions';

const clientId = '1058585226378-0kmkappfj9gjahpfm44klrli3b7imt62.apps.googleusercontent.com';
const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    console.log('newAuthRes:', newAuthRes);

    console.log('new auth token', newAuthRes.id_token);

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

class Login extends Component {
  onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);

    refreshTokenSetup(res);
    this.props.logInUser(res.profileObj);
  };

  onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  render() {
    return (
      <div>
        <GoogleLogin
          render={(renderProps) => (
            <button type="button" className="button-dark" onClick={renderProps.onClick} disabled={renderProps.disabled}>Log in</button>
          )}
          clientId={clientId}
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy="single_host_origin"
          className="button-dark"
          id="google-login"
          isSignedIn
        />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    // address: reduxState.address,
    user: reduxState.user,
  };
}
export default connect(mapStateToProps, { logInUser })(Login);
