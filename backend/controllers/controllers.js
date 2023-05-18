import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

//returns an array of all the users
const getUsers = async (req, res) => {
    try {
        getDocs(collection(db, "users")).then((sc) => {
            const users = [];
            sc.forEach((doc) => {
              const data = doc.data();
              users.push({id: doc.id, data: data});
              console.log(`${doc.id} => ${doc.data()}`);
            })
            res.status(202).json(users);
          });
    } catch (error) {
      res.status(400).json(error);
    }
  };

  export {
    getUsers
  }