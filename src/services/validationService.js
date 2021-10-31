import { getUser } from "../components/Auth/auth";
import { getDatabase, ref, set, child, onValue } from "firebase/database";

export const persistValidationStatus = (status, message) => {
  console.log("persistValidationStatus", status, message);
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const validationDataRef = ref(db, `/validation/${uid}/status/`);

  if (message) {
    return set(validationDataRef, { status, message });
  } else {
    const status_child_status_ref = child(validationDataRef, "status");
    return set(status_child_status_ref, status);
    //return validationDataRef.child("status").set(status);
  }
};

export const persistSignupData = (userid, signupData, firebaseImages) => {
  const db = getDatabase();
  const validationDataRef = ref(db, `validation/${userid}`);
  //const dataRef = firebase.database().ref(`validation/${userid}`);
  const now = new Date().toISOString();
  //.push(userid + "-hello")

  set(validationDataRef, {
    message: signupData.message,
    created: now,
    firebaseImages,
  }).catch((error) => {
    console.error(error);
  });

  // dataRef
  //   .push()
  //   .set({
  //     message: signupData.message,
  //     created: now,
  //     firebaseImages,
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  set(child(validationDataRef, "current"), {
    message: signupData.message,
    created: now,
    firebaseImages,
  }).catch((error) => {
    console.error(error);
  });
  // dataRef
  //   .child("current")
  //   .update({
  //     message: signupData.message,
  //     created: now,
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};

export const onValidationDataChange = (
  setSignupData,
  setValidated,
  setImages
) => {
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const currentRef = ref(db, `/validation/${uid}/current/`);
  onValue(currentRef, (snapshot) => {
    const data = snapshot.val();
    console.log("validation data change: ", data);
    setSignupData({ ...data });
    setValidated(data.validation);
    setImages(data.images || []);
  });

  return currentRef;
};

export const onStatusValueChange = (callback) => {
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const statusDataRef = ref(db, `/validation/${uid}/status/`);

  onValue(statusDataRef, (snapshot) => {
    const data = snapshot.val();

    callback(data);
  });
  return statusDataRef;

  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   updateStarCount(postElement, data);
  // });
};

export const setValidationPending = () => {
  persistValidationStatus("PENDING");
};
export const setValidationRetry = () => {
  persistValidationStatus("RETRY");
};
