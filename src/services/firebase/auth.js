import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {};

export const userSignedIn = (firebase_auth) => {
  onAuthStateChanged(firebase_auth, (user) => {
    if (user) {
      console.log("state changed, user: ", user);
      // User is signed in
    } else {
      console.log("state changed, user: ", user);
      // No user is signed in
    }
  });
};

export const setUser = (user) =>
  isBrowser() && window.localStorage.setItem("user", JSON.stringify(user));

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.email;
};

export const logout = () => {
  setUser({});
  const auth = getAuth(app);
  signOut(auth);

  // return new Promise((resolve) => {
  //   signOut(firebase_auth).then(function () {
  //     resolve();
  //   });
  // });
};

export const setDisplayName = (firebase, name) => {
  return new Promise(() => {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name,
      })
      .then((success) => console.log("setDisplayName success: ", success))
      .catch((fail) => console.log("setDisplayName fail: ", fail));
  });
};

export const signin = (email, pass, onSuccess, onError) => {
  console.log("signin: ", email, pass);
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, pass)
    .then((result) => {
      console.log("signin is ok: ", result);
      const user = result.user;
      setUser(user);
      userSignedIn(auth);
      onSuccess(user);
    })
    .catch((error) => {
      console.log("signin error: ", error);
      onError(error);
    });
};
