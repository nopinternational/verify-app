import { getUser } from "../components/Auth/auth";
import { getDatabase, ref, set, child, onValue } from "firebase/database";

export const persistValidationStatus = (status, message) => {
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const validationDataRef = ref(db, `/validation/${uid}/status/`);

  if (message) {
    return set(db, validationDataRef, { status, message });
  } else {
    return set(db, child(validationDataRef, "status"), { status, message });
    //return validationDataRef.child("status").set(status);
  }
};
export const onStatusValueChange = (callback) => {
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const statusDataRef = ref(db, `/validation/${uid}/status/`);

  onValue(statusDataRef, (snapshot) => {
    const data = snapshot.val();

    callback(data);
    return statusDataRef;
  });

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
