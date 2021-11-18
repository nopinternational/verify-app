import { getUser } from "./auth";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  onValue,
  off,
  update,
} from "firebase/database";
import {
  deleteObject,
  getStorage,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";

export const persistValidationStatus = (status, message) => {
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

export const persistSignupData = (userid, signupData) => {
  const db = getDatabase();
  const validationDataRef = ref(db, `validation/${userid}`);
  //const dataRef = firebase.database().ref(`validation/${userid}`);
  const now = new Date().toISOString();
  //.push(userid + "-hello")
  push(validationDataRef, {
    ...signupData,
    created: now,
  }).catch((error) => {
    console.error(error);
  });

  update(child(validationDataRef, "current"), {
    ...signupData,
    created: now,
  }).catch((error) => {
    console.error(error);
  });
};

export const onValidationDataChange = (callback) => {
  const user = getUser();

  const uid = user.uid;
  const db = getDatabase();
  const currentRef = ref(db, `/validation/${uid}/current/`);
  onValue(currentRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });

  return () => {
    off(currentRef);
  };
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
  return () => {
    off(statusDataRef);
  };
};

export const setValidationPending = () => {
  persistValidationStatus("PENDING");
};
export const setValidationRetry = () => {
  persistValidationStatus("RETRY");
};

export const persistImage = (file, success) => {
  const user = getUser();

  const uid = user.uid;
  const storage = getStorage();
  const baseRef = storageRef(storage, `validation/${uid}`);
  const fileRef = storageRef(baseRef, file.name);

  uploadBytes(fileRef, file).then((snapshot) => {
    success(snapshot.metadata);
  });
};

export const deleteImage = (url, success, error) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, url);
  deleteObject(imageRef)
    .then((snapshot) => {
      // console.log(`file ${url}deleted, snapshot:`, snapshot);
      if (success) success(snapshot);
    })
    .catch((err) => {
      // console.log("delete ended up in an error", err);
      if (error) error(err);
    });

  // var storage = firebase.storage();
  // const storageRef = storage.refFromURL(src);
  // storageRef
  //   .delete()
  //   .then(function (snapshot) {
  //     // file deleted
  //   })
  //   .catch(function (error) {
  //     console.error("delete failed:", error);
  //   });
};
