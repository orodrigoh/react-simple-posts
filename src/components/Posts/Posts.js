import React from "react";
import { PostCard } from "../PostCards/PostCard";
import "./Posts.css";

export const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};
