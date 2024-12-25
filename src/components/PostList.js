import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllPosts, deletePost } from "../api/requests";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PostDetail from "./PostDetail";

const PostList = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient(); // Access query client
  // getting all posts
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    enabled: true,
  });
  // deleting a post
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("Post deleted!");
      queryClient.invalidateQueries(["posts"]); // Refetch the posts
    },
  });
  // Handle delete post
  const handleDelete = (id) => {
    mutation.mutate(id); // Trigger delete mutation
  };

  const posts = data?.map((post) => (
    <PostDetail
      key={post.id}
      post={post}
      handelPostPressed={() => {
        navigation.navigate("PostDetailView", { postId: post.id });
      }}
      handelNewPost={() => {
        navigation.navigate("PostForm", { post });
      }}
      deletePost={() => {
        handleDelete(post.id);
      }}
      addComment={() => {
        navigation.navigate("AddComment", { postId: post.id });
      }}
    />
  ));
  return <ScrollView>{posts}</ScrollView>;
};

export default PostList;

const styles = StyleSheet.create({});
