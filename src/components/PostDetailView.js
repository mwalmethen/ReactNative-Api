import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import { getPostById } from "../api/requests";
import { useQuery } from "@tanstack/react-query";

const PostDetailView = ({ route }) => {
  const { postId } = route.params;
  const { data } = useQuery({
    queryKey: ["postDataId", postId],
    queryFn: () => getPostById(postId),
  });
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
