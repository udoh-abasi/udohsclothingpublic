import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";

export const useUser = () => {
  const [user, setUser] = useState(async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      return attributes.email;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = async (authState) => {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser(); // This 'currentAuthenticatedUser' returns an object, which has the user's details if the user is logged in
        setUser(attributes.email);
      } catch (e) {
        setUser(null);
      }
    };

    const removeListener = Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event

    removeListener(); // cleanup.
  }, [user]);

  return user;
};
