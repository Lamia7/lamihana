import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

import { useMsal } from '@azure/msal-react';
import { loginRequest, msalConfig } from './config/authConfig';
import Button from 'react-bootstrap/Button';
import {
  AzureCloudInstance,
  PublicClientApplication,
} from '@azure/msal-browser';
export function App() {
  const [profile, setProfile] = useState<{
    email: null | string;
    name: null | string;
    azure: null | boolean;
  }>({
    email: null,
    name: null,
    azure: null,
  });

  const myMsal = new PublicClientApplication(msalConfig);

  const clientId =
    '984057980244-940qklk0tgf1hbv0f1eu398gn9spgt2u.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });
  const responseGoogleSuccess = (response: any) => {
    console.log('Success', response);
    setProfile({
      email: response.profileObj.email,
      name: response.profileObj.name,
      azure: false,
    });
  };
  const responseGoogleFailure = (response: any) => {
    console.log('Failure', response);
  };
  const logout = () => {
    console.log('logout');
    setProfile({ email: null, name: null, azure: null });
  };
  const handleLogOutAzure = () => {
    console.log('logout Azure');
    myMsal.logoutPopup();
    setProfile({ email: null, name: null, azure: null });
  };
  const handleResponseAzure = (response: any) => {
    let accountId;
    console.log('here response');
    if (response !== null) {
      accountId = response.account.homeAccountId;
      setProfile({
        email: response.account.username,
        name: response.account.name,
        azure: true,
      });
    } else {
      // In case multiple accounts exist, you can select
      const currentAccounts = myMsal.getAllAccounts();

      if (currentAccounts.length === 0) {
        // no accounts signed-in, attempt to sign a user in
        myMsal.loginRedirect(loginRequest);
      } else if (currentAccounts.length > 1) {
        // Add choose account code here
      } else if (currentAccounts.length === 1) {
        accountId = currentAccounts[0].homeAccountId;
      }
    }
  };
  const handleLoginAzure = () => {
    myMsal.loginPopup(loginRequest).then(handleResponseAzure);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile.name ? (
        <div>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>

          {profile.azure === false ? (
            <GoogleLogout
              clientId={clientId}
              buttonText="Log out"
              onLogoutSuccess={logout}
            />
          ) : (
            <Button
              variant="secondary"
              className="ml-auto"
              onClick={() => handleLogOutAzure()}
            >
              Sign out with Azure
            </Button>
          )}
        </div>
      ) : (
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
          <p>or </p>
          <Button
            variant="secondary"
            className="ml-auto"
            onClick={() => handleLoginAzure()}
          >
            Sign in with Azure
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
