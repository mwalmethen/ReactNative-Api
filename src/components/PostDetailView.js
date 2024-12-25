import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { getPostById } from "../api/requests";
import { useQuery } from "@tanstack/react-query";
import { deleteComment } from "../api/requests";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const PostDetailView = ({ route }) => {
  const { postId } = route.params;
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["postDataId", postId],
    queryFn: () => getPostById(postId),
  });

  // deleting a comment
  const mutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      alert("Comment deleted!");
      queryClient.invalidateQueries(["postDataId", postId]); // Refetch the posts
    },
    onError: (error) => {
      console.log("Error:", error.response?.data || error.message); // Debug error
      alert("Failed to delete comment!");
    },
  });
  // Handle delete comment
  const handleDelete = (commentId) => {
    mutation.mutate(commentId); // Trigger delete mutation
  };
  return (
    <ScrollView style={styles.postContainer}>
      <Text>Id: {data?.id}</Text>
      <Text>Title: {data?.title}</Text>
      <Text>Description: {data?.description}</Text>
      <Text>Comments:</Text>

      {data?.comments.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text>Username: {comment.username}</Text>
          <Text>Comment: {comment.comment}</Text>
          <Button
            title="Delete Comment"
            onPress={() => handleDelete(comment.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default PostDetailView;
