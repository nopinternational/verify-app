import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getImageUrl = (firebase_storage_ref) => {
  const storage = getStorage();

  return getDownloadURL(ref(storage, firebase_storage_ref));
};
