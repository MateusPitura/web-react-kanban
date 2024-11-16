import { gapi } from "gapi-script";
import { useEffect } from "react";
import { SCOPES } from "../constants/gapiScopes";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

interface UseAuthGoogleProperties {
  handleOnAuth: (isSignedIn: boolean) => void;
}

export function useAuthGoogle({ handleOnAuth }: UseAuthGoogleProperties) {
  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://classroom.googleapis.com/$discovery/rest?version=v1",
          ],
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const updateSigninStatus = (isSignedIn: boolean) => {
    handleOnAuth(isSignedIn);
  };
}
