import { useEffect, useState } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export const useUser = () => {
  const [user, setUser] = useState(async () => {
    await Auth.currentSession()
      .then((data) => {
        const idToken = data.getIdToken();
        const email = idToken.payload.email;
        console.log("The email in useUser is", email);
        setUser(email);
      })
      .catch((err) => {
        setUser(null);
        console.log("Error in useUser", err);
      });
  });

  // This 'CurrentSession' is used here, instead of 'currentAuthenticatedUser', bcoz when you sign in with Google, you will not get the email if you are using 'currentAuthenticatedUser'
  useEffect(() => {
    const updateUser = async (authState) => {
      await Auth.currentSession()
        .then((data) => {
          const idToken = data.getIdToken();
          const email = idToken.payload.email;
          setUser(email);
        })
        .catch((err) => {
          setUser(null);
        });
    };

    const removeListener = Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event

    removeListener(); // cleanup.
  }, [user]);

  return user;
};
