import { db } from "../firebase.js";
import { doc, collection, getDoc, getDocs, addDoc, arrayUnion, updateDoc } from "firebase/firestore";

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

const getFilteredPosts = async (req, res) => {
  try {
    console.log(req);
    const posts = [];
    const q = query(collection(db, "posts"), where("departLoc", "==", "UCLA"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    // Insert filtering logic here...
    res.status(202).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
}

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
        res.status(202).json('success');
      });
    }
    res.status(202).json('cannot join more than once');
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  getPosts,
  getFilteredPosts,
  createPost,
  getUserPosts,
  joinGroup,
}