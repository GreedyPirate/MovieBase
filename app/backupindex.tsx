import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to My movie app~</Text>
      {/* <Link href="/page1">
        <Text>Go to page 1</Text>
      </Link>
      <Link href="/page2">
        <Text>Go to page 2</Text>
      </Link> */}
    </View>
  );
}
