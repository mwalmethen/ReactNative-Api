import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostList from "./src/components/PostList";
import PostDetailView from "./src/components/PostDetailView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostForm from "./src/components/PostForm";
import AddComment from "./src/components/AddComment";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={PostList} />
          <Stack.Screen name="PostDetailView" component={PostDetailView} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name="AddComment" component={AddComment} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
