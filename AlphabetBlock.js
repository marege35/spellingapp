// AlphabetBlock.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AlphabetBlock = ({ letter, onDrop }) => {
  const handlePress = () => {
    onDrop(letter);
  };

  return (
    <TouchableOpacity style={styles.letterButton} onPress={handlePress}>
      <Text style={styles.letterText}>{letter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  letterButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    fontSize: 18,
  },
});

export default AlphabetBlock;
