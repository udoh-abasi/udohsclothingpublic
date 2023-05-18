import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports"; // NOTE: This is the location that has the file 'aws-exports.js'
import { useUser } from "@/customHooks/useUser";

Amplify.configure(awsconfig);

// SIGN UP

export const signUp = async (
  email,
  password,
  setErrorMessage,
  setShowVerificationCodeField,
  setSignedUpUserEmail,
  setHideError,
  setSignUpLoading
) => {
  // NOTE: So, when we are calling this function, we need to pass in all this values
  try {
    setHideError(true);
    setSignUpLoading(true);
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: { email },
      autoSignIn: { enabled: true },
    });

    setShowVerificationCodeField(true);

    setSignedUpUserEmail(user.username);

    setSignUpLoading(false);
  } catch (error) {
    console.log("Error signing up", error);
    setHideError(false);
    setSignUpLoading(false);
    switch (error.name) {
      case "UsernameExistsException": {
        // NOTE: This 'UsernameExistsException' is an exception name that can be thrown by AWS
        setErrorMessage("Uh..Oh, Something went wrong");
        return;
      }
      case "InvalidPasswordException": {
        setErrorMessage("Password does not match expectation");
        return;
      }
      default: {
        setErrorMessage("Uh..Oh, Something went wrong, try again");
        return;
      }
    }
  }
};

// CONFIRM SIGN-UP

export const confirmSignUpCode = async (
  email,
  verificationString,
  setIsSuccess,
  setCodeVerificationFailed,
  setShowSignUpField,
  setVerifyEmailCodeLoading
) => {
  try {
    setVerifyEmailCodeLoading(true);
    setCodeVerificationFailed(false);

    await Auth.confirmSignUp(email, verificationString);

    setIsSuccess("successful");
    setShowSignUpField(false);
    setVerifyEmailCodeLoading(false);
  } catch (e) {
    console.log("Error confirming password", e);
    setCodeVerificationFailed(true);
    setVerifyEmailCodeLoading(false);
  }
};

// RESEND SIGN-UP CONFIRMATION CODE (A SIX (6) DIGIT CODE WILL BE SENT THE EMAIL)
export const resendSignUpConfirmationCode = async (
  email,
  setResendSignUpCodeLoading
) => {
  try {
    setResendSignUpCodeLoading(true);
    await Auth.resendSignUp(email);
    console.log("code resent successfully");
    setResendSignUpCodeLoading("successful");

    setTimeout(() => {
      setResendSignUpCodeLoading(false);
    }, 5000);
  } catch (error) {
    setResendSignUpCodeLoading(false);
    console.log("Error Sending code", error);
  }
};

//LOGIN CODE

export const logIn = async (
  email,
  password,
  setErrorMessage,
  setLoading,
  router
) => {
  try {
    setLoading(true);
    setErrorMessage("");

    const { attributes } = await Auth.signIn(email, password);
    setLoading(false);

    router.push("/payment-and-summary");
  } catch (e) {
    setLoading(false);
    setErrorMessage("Incorrect username or password");
    console.log("Error Signing In", e);
  }
};

// SIGN OUT
export const signOut = async (navigate) => {
  try {
    await Auth.signOut();
    navigate("/login");
  } catch (e) {
    console.log("Error Signing out", e);
  }
};

// FORGOT PASSWORD
export const forgotPassword = {
  //SEND FORGOT PASSWORD CODE
  sendForgotPasswordCode: async (
    email,
    setSuccess,
    setErrorMessage,
    isLoading
  ) => {
    setErrorMessage("");
    isLoading(true);

    // Check if the user exist. We do this with a workaround
    // So, we used the signUp because it checks and returns an error if the user exist.
    // We also used an obviously incorrect password that won't be accepted, so no user will ever be signed up through this process
    try {
      await Auth.signUp(email, "123"); // This line will definitely throw an error
    } catch (error) {
      console.log(error);
      switch (error.name) {
        case "UsernameExistsException": {
          // This will then mean the user is signed up, and exist
          try {
            await Auth.forgotPassword(email).then((data) => console.log(data)); // NOTE: This line of code can also be used to resend the six digit code for 'forgot password'
            setSuccess(true);
            isLoading(false);
          } catch (error) {
            isLoading(false);
            console.log(
              "Error sending forgot password confirmation code error",
              error
            );
            setErrorMessage(error.message);
          }
          return;
        }

        default: {
          isLoading(false);
          setErrorMessage("This account does not exist. Sign in instead");
          return;
        }
      }
    }
  },
  // CHANGE THE USER'S PASSWORD TO THE NEW PASSWORD IF CONFIRMATION CODE IS CORRECT
  forgotPasswordSubmit: async (
    email,
    code,
    newPassword,
    setIsSuccess,
    setShowEmailForm,
    setErrorMessage,
    setForgotPasswordLoading
  ) => {
    try {
      setErrorMessage("");
      setForgotPasswordLoading(true);
      await Auth.forgotPasswordSubmit(email, code, newPassword).then((data) =>
        console.log(data)
      );
      setShowEmailForm(false);
      setIsSuccess(true);
      setForgotPasswordLoading(false);
    } catch (error) {
      console.log("Error when submitting forgot password code", error);
      setErrorMessage(
        "There was an error. Please check the code and the password and try again, or try again after sometime"
      );
      setForgotPasswordLoading(false);
    }
  },
};
