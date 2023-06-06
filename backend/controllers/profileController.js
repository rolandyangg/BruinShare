import { db } from "../firebase.js";
import { doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";

const editProfile = async (req, res) => {
  console.log("Edit Profile request received");
  const {userID, newProfile} = req.body;
  const {description, email, phone, location, interests} = newProfile;

  try {
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where('username', '==', userID));
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

    await updateDoc(userRef, newData);

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export {
    editProfile, 
}