import React, { useEffect, useState } from 'react';
import * as api from "../pages/api/posts.js";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then((response) => {
      setPosts(response.data);
    });
  }, [posts.length]);

  console.log(posts);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>Departure Date: {post.data.departDate}</p>
            <p>Departure Location: {post.data.departLoc}</p>
            <p>Departure Time: {post.data.departTime}</p>
            <p>Destination: {post.data.dest}</p>
            <p>Flight Destination: {post.data.flightDest}</p>
            <p>Flight Number: {post.data.flightNumber}</p>
            <p>Flight Time: {post.data.flightTime}</p>
            <p>Group Size: {post.data.groupSize}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
