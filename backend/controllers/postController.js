import { db } from "../firebase.js";
import { doc, collection, getDoc, getDocs, addDoc, arrayUnion, arrayRemove, updateDoc, deleteDoc, query, where } from "firebase/firestore";

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
    const { userName, departLoc, dest, departDate, departTime, flightTime, flightNumber, flightDest, timeObject, groupSize, creator } = req.body;
    console.log(req.body);
    const postData = {
      userName: userName,
      creator: creator,
      departLoc: departLoc,
      dest: dest,
      departDate: departDate,
      departTime: departTime,
      timeObject: new Date(timeObject),
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

// Return posts accordingly to the filter
const getFilteredPosts = async (req, res) => {
  try {
    console.log('A FILTER HAS BEEN REQUESTED!');
    console.log(req.body);

    let { startLocation, endLocation, startTimeRange, endTimeRange, groupSizeMin, groupSizeMax } = req.body;
    let queries = []

    // Preprocess the filters for comparison
    startLocation = startLocation.trim(); // Remove extra whitespace
    endLocation = endLocation.trim();
    startTimeRange = new Date(startTimeRange);
    endTimeRange = new Date(endTimeRange);
    groupSizeMin = parseInt(groupSizeMin); // Convert to integers
    groupSizeMax = parseInt(groupSizeMax);

    console.log(startLocation);
    console.log(endLocation);
    console.log(startTimeRange);
    console.log(endTimeRange);
    console.log(groupSizeMin);
    console.log(groupSizeMax);

    // Departing Location
    if (startLocation.trim() != '')
      queries.push(where("departLoc", "==", startLocation.trim()));

    // Destination
    if (endLocation.trim() != '')
      queries.push(where("dest", "==", endLocation.trim()));

    // Start Time
    if (!isNaN(startTimeRange.getTime()))
      queries.push(where("timeObject", ">=", startTimeRange));
    
    if (!isNaN(endTimeRange.getTime()))
      queries.push(where("timeObject", "<=", endTimeRange));

    // Group Size Min & Max
    // if (!isNaN(groupSizeMin))
    //   queries.push(where("groupSize", ">=", groupSizeMin));
    
    // if (!isNaN(groupSizeMax))
    //   queries.push(where("groupSize", "<=", groupSizeMax));

    console.log("Num of queries: " + queries.length)

    getDocs(query(collection(db, "posts"), ...queries
    )).then((sc)=> {
      const posts = [];
      sc.forEach((doc) => {
        const data = doc.data();
        posts.push({id: doc.id, data: data});
      }) 
      // Filter by group size (We can't make a query for it because firebase is stupid and limits the amoount of queries you can perform...)
      // Solution... Filter manually!!!
      if (!isNaN(groupSizeMin))
        posts.filter((post) => post.data.groupSize >= groupSizeMin); // queries.push(where("groupSize", ">=", groupSizeMin));
      
      if (!isNaN(groupSizeMax))
        posts.filter((post) => post.data.groupSize <= groupSizeMax); // queries.push(where("groupSize", "<=", groupSizeMax));
        
      res.status(202).json(posts);
    });
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
}

export {
  getPosts,
  getFilteredPosts,
  createPost,
  getUserPosts,
  joinGroup,
  leaveGroup,
  deletePost,
}