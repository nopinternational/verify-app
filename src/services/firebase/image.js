import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getImageUrl = (firebase_storage_ref) => {
  const storage = getStorage();

  return getDownloadURL(ref(storage, firebase_storage_ref));
};

export const getImageUrl2 = (firebase_storage_ref) => {
  const storage = getStorage();

  getDownloadURL(ref(storage, firebase_storage_ref))
    .then((url) => {
      console.log(`ref: ${firebase_storage_ref} => url: ${url}`);
      return url;
      // `url` is the download URL for 'images/stars.jpg'
      // This can be downloaded directly:
      //   const xhr = new XMLHttpRequest();
      //   xhr.responseType = "blob";
      //   xhr.onload = (event) => {
      //     const blob = xhr.response;
      //   };
      //   xhr.open("GET", url);
      //   xhr.send();
      //   // Or inserted into an <img> element
      //   const img = document.getElementById("myimg");
      //   img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
      console.error("opsie daisy: ", error);
    });
};
