import { app, db, storage } from "../firebase.js";
import {doc, collection, query, where, getDocs, updateDoc,} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const editProfile = async (req, res) => {
  console.log("Edit Profile request received");
  const { userID, newProfile } = req.body;
  const { description, email, phone, location, interests, profilePicture } =
    newProfile;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", userID));
    const querySnapshot = await getDocs(q);
    const documentId = querySnapshot.docs[0].id;
    const userRef = doc(db, "users", documentId);

    const newData = {
      description,
      email,
      phone,
      location,
      interests,
    };

    if (profilePicture) {
      const fileRef = ref(storage, `profilePictures/${userID}`);
      await uploadBytes(fileRef, Buffer.from(profilePicture, "base64"));

      const downloadURL = await fileRef.getDownloadURL();
      newData.profilePicture = downloadURL;
      console.log("profile pic");
    }

    await updateDoc(userRef, newData);

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export { editProfile };
