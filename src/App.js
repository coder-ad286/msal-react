import { UnauthenticatedTemplate, AuthenticatedTemplate, useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest } from "./auth-config";

const WrapView = () => {
  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const handleRedirect = () => {
    instance.loginRedirect({
      ...loginRequest,
      prompt: 'create'
    }).catch((err) => console.log(err.message))

  }

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {
          activeAccount ? (
            <p>Authenticated Successfully</p>
          ) : null
        }
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button onClick={handleRedirect}>
          SignUp
        </button>
      </UnauthenticatedTemplate>
    </div>
  )
}

function App({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <WrapView />
    </MsalProvider>
  );
}

export default App;
