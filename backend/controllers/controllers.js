import { db } from "../firebase.js";
import { collection, getDocs, addDoc, query, doc } from "firebase/firestore";

//returns an array of all the users
const getUsers = async (req, res) => {
    try {
        getDocs(collection(db, "users")).then((sc) => {
            const users = [];
            sc.forEach((doc) => {
              const data = doc.data();
              users.push({id: doc.id, data: data});
            })
            res.status(202).json(users);
          });
    } catch (error) {
      res.status(400).json(error);
    }
  };

//creates a new user & adds their info to firebase
const createUser = async(req, res) => {
  try {
    const data = req.body.newProfile;
    addDoc(collection(db, "users"), data).then(() => {
        res.status(202).json('success');
      });
  } catch (error) {
    res.status(400).json(error);
  }
}

export {
  getUsers,
  createUser
}