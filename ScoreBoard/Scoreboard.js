import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

// Scoreboard component using forwardRef for parent component interaction
const Scoreboard = forwardRef(({ childId, onSendData }, ref) => {
  // State hook for tracking the individual score
  const [score, setScore] = useState(0);

  // Expose functions to the parent component via ref
  useImperativeHandle(ref, () => ({
    addPoint: () => {
      setScore((prevScore) => prevScore + 1); // Increment score
    },
    resetScore: () => {
      setScore(0); // Reset score to zero
    },
  }));

  // Effect hook for notifying parent component when score changes
  useEffect(() => {
    onSendData(childId, score); // Send updated score to parent
  }, [score, childId, onSendData]);

  // Main render function for Scoreboard
  return (
    <View style={styles.container}>
      <Text style={styles.childId}>childId {childId}</Text> 
      <Text style={styles.score}>Current Score: {score}</Text> 
      <Button title="Add Point" onPress={() => setScore(score + 1)} /> 
      <Button title="Reset Score" onPress={() => setScore(0)} /> 
    </View>
  );
});

// Stylesheet for the Scoreboard component
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  childId: {
    textAlign: "center",
  },
  score: {
    textAlign: "center",
    fontSize: 25,
  },
});

export default Scoreboard;
