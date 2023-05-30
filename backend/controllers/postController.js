import { db } from "../firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const getPosts = async (req, res) => {
  try {
    getDocs(collection(db, "posts")).then((sc)=> {
      const posts = [];
      sc.forEach((doc) => {
        const data = doc.data();
        posts.push({id: doc.id, data: data});
        console.log(`${doc.id} => ${doc.data()}`);
      }) 
      res.status(202).json(posts);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//creates a new user & adds their info to firebase
const createPost = async (req, res) => {
  try {
    const { departLoc, dest, departDate, departTime, flightTime, flightNumber, flightDest, groupSize, creator } = req.body;
    console.log(req.body);
    const postData = {
      creator: creator,
      departLoc: departLoc,
      dest: dest,
      departDate: departDate,
      departTime: departTime,
      flightTime: flightTime,
      flightNumber: flightNumber,
      flightDest: flightDest,
      groupSize: groupSize
    };

    await addDoc(collection(db, "posts"), postData);
    res.status(202).json('success');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  getPosts,
  createPost
}