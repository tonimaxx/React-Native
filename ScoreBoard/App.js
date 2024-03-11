import React, { useRef, useState, useEffect } from "react";
import { Button, View, SafeAreaView, Text, StyleSheet } from "react-native";
import Scoreboard from "./Scoreboard";

// Main App component
const App = () => {
  // State hooks for tracking scores from child components
  const [child1Data, setChild1Data] = useState(0);
  const [child2Data, setChild2Data] = useState(0);
  // State for calculating the total score
  const [totalScore, setTotalScore] = useState(0);

  // Refs for interacting with the Scoreboard components
  const scoreboardOneRef = useRef(null);
  const scoreboardTwoRef = useRef(null);

  // Effect hook for updating total score whenever child scores change
  useEffect(() => {
    setTotalScore(child1Data + child2Data);
  }, [child1Data, child2Data]);

  // Function to increment both scores
  const handleAddAll = () => {
    scoreboardOneRef.current?.addPoint();
    scoreboardTwoRef.current?.addPoint();
  };

  // Function to reset scores in both child components
  const handleResetAll = () => {
    scoreboardOneRef.current?.resetScore();
    scoreboardTwoRef.current?.resetScore();
  };

  // Callback function for receiving data from child components
  const handleDataReceived = (childId, data) => {
    console.log(`DataReceived (childId, data) = ${childId},${data}`);
    if (childId === 1) {
      setChild1Data(data);
    } else if (childId === 2) {
      setChild2Data(data);
    } else {
      console.error("Invalid child ID:", childId);
    }
  };

  // Component for displaying individual scores
  const ShowScore = ({ title, score }) => (
    <View style={styles.showScoreContainer}>
      <Text style={styles.scoreTitle}>{title}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );

  // Main component render function
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <View style={styles.scoreContainer}>
          <ShowScore title="Total" score={totalScore} />
        </View>
        <View style={styles.scoreContainer}>
          <ShowScore title="Child 1" score={child1Data} />
          <ShowScore title="Child 2" score={child2Data} />
        </View>
        <Scoreboard
          ref={scoreboardOneRef}
          childId={1}
          onSendData={handleDataReceived}
        />
        <Scoreboard
          ref={scoreboardTwoRef}
          childId={2}
          onSendData={handleDataReceived}
        />
        <Button title="Add Both" onPress={handleAddAll} />
        <Button title="Reset Both" onPress={handleResetAll} />
      </View>
    </SafeAreaView>
  );
};

// Stylesheet for the App component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    width: "100%",
  },
  scoreContainer: {
    flexDirection: "row",
    margin: 10,
  },
  showScoreContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    padding: 10,
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  score: {
    fontSize: 32,
  },
});

export default App;
