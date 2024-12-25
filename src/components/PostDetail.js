import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const PostDetail = ({
  post,
  handelPostPressed,
  handelNewPost,
  deletePost,
  addComment,
}) => {
  const { title, description } = post;

  return (
    <View style={styles.postContainer}>
      <Text> Title: {title}</Text>
      <Text> Description: {description}</Text>
      <View>
        <Button title="See Post Detail" onPress={handelPostPressed} />
        <Button title="Add A Post" onPress={handelNewPost} />
        <Button title="Delete Post" onPress={deletePost} />
        <Button title="Add Comment" onPress={addComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    padding: 10,
  },
});

export default PostDetail;
