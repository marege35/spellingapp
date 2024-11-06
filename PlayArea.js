// PlayArea.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AlphabetBlock from './AlphabetBlock';

const PlayArea = () => {
  const [word, setWord] = useState('');

  const handleDrop = (letter) => {
    setWord(word + letter);
  };

  const handlePlay = () => {
    console.log('Pronounce:', word);
    // Add pronunciation functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.wordSpace}>
        <Text>{word}</Text>
      </View>
      <View style={styles.alphabetContainer}>
        {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map((letter) => (
          <AlphabetBlock key={letter} letter={letter} onDrop={handleDrop} />
        ))}
      </View>
      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordSpace: {
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphabetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
  },
  playButtonText: {
    color: 'white',
  },
});

export default PlayArea;
