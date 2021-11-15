import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getImageUrl = (firebase_storage_ref) => {
  const storage = getStorage();

  return getDownloadURL(ref(storage, firebase_storage_ref));
};

export const getImageUrl2 = (firebase_storage_ref) => {
  const storage = getStorage();

  getDownloadURL(ref(storage, firebase_storage_ref))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      // Handle any errors
      console.error("opsie daisy: ", error);
    });
};
