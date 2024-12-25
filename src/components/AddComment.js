import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/requests";
const AddComment = ({ route }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const queryClient = useQueryClient();
  const { postId } = route.params;
  const mutation = useMutation({
    mutationKey: ["comments", postId],
    mutationFn: (data) => addComment(postId, data),
    onSuccess: () => {
      alert("Comment created!");
      queryClient.invalidateQueries(["postDataId", postId]);
    },
  });
  return (
    <View>
      <Text style={styles.username}>Write Your Username: </Text>
      <TextInput
        style={styles.inputField}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.title}>Add A Comment: </Text>
      <TextInput
        style={styles.inputField}
        value={comment}
        onChangeText={setComment}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Comment"
          onPress={() => mutation.mutate({ username, comment })}
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
  title: {
    marginTop: 10,
    marginLeft: 120,
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    marginTop: 10,
    marginLeft: 100,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    marginLeft: 41,
    padding: 10,
    width: "80%",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AddComment;
