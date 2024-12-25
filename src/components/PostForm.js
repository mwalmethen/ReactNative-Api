import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../api/requests";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  // Adding new post
  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: addPost,
    onSuccess: () => {
      alert("Post created!");
      queryClient.invalidateQueries(["posts"]); // Refetch the posts
    },
  });
  const queryClient = useQueryClient();
  return (
    <View style={styles.container}>
      <Text>Title: </Text>
      <TextInput
        style={styles.inputField}
        value={title}
        onChangeText={setTitle}
      />
      <Text>Description: </Text>
      <TextInput
        style={styles.inputField}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Comment: </Text>
      <TextInput
        style={styles.inputField}
        value={comment}
        onChangeText={setComment}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Create Post"
          onPress={() => mutation.mutate({ title, description, comment })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default PostForm;
