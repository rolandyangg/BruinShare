import { db } from "../firebase.js";
import { doc, collection, getDoc, getDocs, addDoc, arrayUnion, updateDoc } from "firebase/firestore";

const editProfile = async (req, res) => {
  console.log("Edit Profile request received");
  const { id, description, email, phone, location, interests } = req.body;

  try {
    console.log("SDJFKLSDJKLRSJDFOSJOFI")
    const userRef = db.collection("users").doc(id);
    await userRef.update({
      description,
      email,
      phone,
      location,
      interests,
    });

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export {
    editProfile, 
}