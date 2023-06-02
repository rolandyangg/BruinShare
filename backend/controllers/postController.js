import { db } from "../firebase.js";
import { doc, collection, getDoc, getDocs, addDoc, arrayUnion, arrayRemove, updateDoc, deleteDoc } from "firebase/firestore";

const getPosts = async (req, res) => {
  try {
    getDocs(collection(db, "posts")).then((sc)=> {
      const posts = [];
      sc.forEach((doc) => {
        const data = doc.data();
        posts.push({id: doc.id, data: data});
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
    const { userName, departLoc, dest, departDate, departTime, flightTime, flightNumber, flightDest, groupSize, creator } = req.body;
    console.log(req.body);
    const postData = {
      userName: userName,
      creator: creator,
      departLoc: departLoc,
      dest: dest,
      departDate: departDate,
      departTime: departTime,
      flightTime: flightTime,
      flightNumber: flightNumber,
      //flightDest: flightDest,
      groupSize: groupSize
    };

    const doc = await addDoc(collection(db, "posts"), postData);
    const id = doc.id;
    res.status(202).json(id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a user's posts for the my rides page
const getUserPosts = async (req, res) => {
  try {
    const { username } = req.body;
    getDocs(collection(db, "posts")).then((sc)=> {
      const posts = [];
      const joined = [];
      sc.forEach((doc) => {
        const data = doc.data();
        if((data.userName !== undefined && data.userName === username)){
          posts.push({id: doc.id, data: data});
        }
        else if(data.members !== undefined && (data.members).includes(username)){
          joined.push({id: doc.id, data: data});
        }
      }) 
      res.status(202).json({posts, joined});
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

//allows a user to join a group (adds their username to the post members field)
const joinGroup = async (req, res) => {
  try {
    const { username, postID } = req.body;
    const postRef = doc(db, "posts", postID);
    const postData = await getDoc(postRef);
    const data = postData.data();
    if(data.members === undefined || (data.members !== undefined && !(data.members).includes(username))){
      updateDoc(postRef, {
        members: arrayUnion(username),
      }).then(() => {
        res.status(202).json({});
      });
    }
    // res.status(202).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

//allows a user to leave a group (removes their username to the post members field)
const leaveGroup = async (req, res) => {
  try {
    const { username, postID } = req.body;
    const postRef = doc(db, "posts", postID);
    const postData = await getDoc(postRef);
    const data = postData.data();
    if(data.members !== undefined && data.members.includes(username)){
      updateDoc(postRef, {
        members: arrayRemove(username),
      }).then(() => {
        res.status(202).json({});
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postID } = req.body;
    const postRef = doc(db, "posts", postID);
    const response = await deleteDoc(postRef);
    res.status(202).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  getPosts,
  createPost,
  getUserPosts,
  joinGroup,
  leaveGroup,
  deletePost,
}