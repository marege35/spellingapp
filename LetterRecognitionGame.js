import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder, Animated, Text, ScrollView, Alert } from 'react-native';

const DragAndDropLetter = ({ letter, onDrop, isCorrect }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);

  const isVowel = (char) => ['A', 'E', 'I', 'O', 'U', 'Y', 'Æ', 'Ø', 'Å'].includes(char.toUpperCase());

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        setDragging(false);
        if (isCorrect) {
          onDrop();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start();
        }
      },
    })
  ).current;

  const backgroundColor = isVowel(letter) ? 'red' : 'blue';

  return (
    <Animated.View
      style={[
        styles.letterContainer,
        {
          transform: position.getTranslateTransform(),
          opacity: dragging ? 0.8 : 1,
          backgroundColor: backgroundColor,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.letter}>{letter}</Text>
    </Animated.View>
  );
};

const LetterRecognitionGame = () => {
  const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const [randomUppercaseLetters, setRandomUppercaseLetters] = useState([]);
  const [randomLowercaseLetters, setRandomLowercaseLetters] = useState([]);
  const [correctDropIndexes, setCorrectDropIndexes] = useState([]);

  useEffect(() => {
    generateRandomLetters();
  }, []);

  const generateRandomLetters = () => {
    const randomUppercaseIndexes = [];
    const correctIndexes = [];

    while (randomUppercaseIndexes.length < 10) {
      const randomIndex = Math.floor(Math.random() * 10);
      if (!randomUppercaseIndexes.includes(randomIndex)) {
        randomUppercaseIndexes.push(randomIndex);
        correctIndexes.push(randomIndex);
      }
    }
    const newRandomUppercaseLetters = randomUppercaseIndexes.map(index => uppercaseLetters[index]);
    setRandomUppercaseLetters(newRandomUppercaseLetters);

    const newRandomLowercaseLetters = newRandomUppercaseLetters.map(letter => {
      const uppercaseIndex = uppercaseLetters.indexOf(letter);
      return lowercaseLetters[uppercaseIndex];
    });
    setRandomLowercaseLetters(newRandomLowercaseLetters);
    setCorrectDropIndexes(correctIndexes);
  };

  const handleDrop = (index) => {
    if (correctDropIndexes.includes(index)) {
      Alert.alert('Riktig!', 'God gjort!', [{ text: 'OK' }], { cancelable: false });
    } else {
      Alert.alert('Å nei!', 'Prøv igjen!', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const instructions = "Dra og slipp de store bokstavene til de små bokstavene som passer.";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.instructions}>{instructions}</Text>
      <View style={styles.borderContainer}>
        <View style={styles.lettersContainer}>
          {randomUppercaseLetters.map((letter, index) => (
            <DragAndDropLetter
              key={index}
              letter={letter}
              onDrop={() => handleDrop(index)}
              isCorrect={correctDropIndexes.includes(index)}
            />
          ))}
        </View>
        <View style={styles.verticalBorder} />
        <View style={styles.lettersContainer}>
          {randomLowercaseLetters.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.letterButton}
              disabled={correctDropIndexes.includes(index)}
            >
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  instructions: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalBorder: {
    width: 2,
    height: '100%',
    backgroundColor: 'black',
  },
  lettersContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  letterContainer: {
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  letter: {
    fontSize: 24,
    color: '#fff',
  },
  letterButton: {
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  letterText: {
    fontSize: 24,
    color: '#fff',
  },

});

export default LetterRecognitionGame;
