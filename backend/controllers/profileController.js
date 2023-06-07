import { db } from "../firebase.js";
import {doc, collection, query, where, getDocs, updateDoc,} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase.js'

const editProfile = async (req, res) => {
  console.log("Edit Profile request received");
  const { userID, newProfile, picRef } = req.body;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("username", "==", userID));
    const querySnapshot = await getDocs(q);
    const documentId = querySnapshot.docs[0].id;
    const userRef = doc(db, "users", documentId);
    if (picRef) {
      const url = await getDownloadURL(ref(storage, `profilePictures/${userID}`));
      newProfile.profilePicture = url.toString();
    }
    await updateDoc(userRef, newProfile);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export { editProfile };
