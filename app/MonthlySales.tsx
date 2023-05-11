import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import {
  LineChart,
} from "react-native-chart-kit";



const MonthlySales = ({text,data}: any) => {
  return (
    <View>
      <Text
        style={{
          paddingTop: 10,
          paddingLeft: 15,
          fontSize: 30,
          color: "#0d2b42",
          fontWeight: "800",
        }}
      >
        {text}
      </Text>
      <LinearGradient
        colors={["#fcfbf5", "#e3e2de"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            backgroundColor: "#ebf5f5",
            backgroundGradientFrom: "#f7f9fa",
            backgroundGradientTo: "#d1f0ff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(17,54,41, ${opacity})`,
            style: {
              borderRadius: 20,
              alignItems: "center",
              flex: 1,
              paddingLeft: 10,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
            alignItems: "center",
            flex: 1,
          }}
        />
      </LinearGradient>
    </View>
  );
};

export default MonthlySales;
