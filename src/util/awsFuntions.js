import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports"; // NOTE: This is the location that has the file 'aws-exports.js'

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

export const logIn = async (email, password, setErrorMessage, navigate) => {
  try {
    const user = await Auth.signIn(email, password);
    navigate(`/`);
  } catch (e) {
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
    navigate,
    setSuccess,
    setErrorMessage
  ) => {
    try {
      await Auth.forgotPassword(email).then((data) => console.log(data)); // NOTE: This line of code can also be used to resend the six digit code for 'forgot password'
      setSuccess(true);
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 3000);
    } catch (error) {
      console.log(
        "Error sending forgot password confirmation code error",
        error
      );
      setErrorMessage(error.message);
    }
  },

  // CHANGE THE USER'S PASSWORD TO THE NEW PASSWORD IF CONFIRMATION CODE IS CORRECT
  forgotPasswordSubmit: async (
    email,
    code,
    newPassword,
    setIsSuccess,
    setIsFailure
  ) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword).then((data) =>
        console.log(data)
      );
      setIsSuccess(true);
    } catch (error) {
      console.log("Error when submitting forgot password code", error);
      setIsFailure(true);
    }
  },
};
