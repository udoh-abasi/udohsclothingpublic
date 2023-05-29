import { useEffect, useState } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "../aws-exports";
import { useDispatch } from "react-redux";
import { emailAction, userLoadingAction } from "@/myReduxFiles/actions";
Amplify.configure(awsconfig);

export const useUser = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  // This 'CurrentSession' is used here, instead of 'currentAuthenticatedUser', bcoz when you sign in with Google, you will not get the email if you are using 'currentAuthenticatedUser'
  useEffect(() => {
    const updateUser = async (authState) => {
      dispatch(userLoadingAction(true)); // So, first, we set the loading to true
      await Auth.currentSession()
        .then((data) => {
          const idToken = data.getIdToken();
          const email = idToken.payload.email;
          dispatch(emailAction(email));
          setUser(email);
          dispatch(userLoadingAction(false));
        })
        .catch((err) => {
          dispatch(emailAction(null));
          setUser(null);
          dispatch(userLoadingAction(false));
        });
    };

    const removeListener = Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event

    //removeListener(); // cleanup. This was commented out bcoz it removed the event listener, and made it mandatory to refresh the page before seeing user updated
  }, [user, dispatch]);

  return user;
};
