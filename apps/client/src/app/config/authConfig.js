export const msalConfig = {
  auth: {
    clientId: "66aaf7aa-7a47-4129-aa72-34817a46cb58",
    authority: "https://login.microsoftonline.com/265e91ca-1210-49db-b1c9-b7de50942e7d", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:4200",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"],
 prompt:"select_account"
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com"
};
