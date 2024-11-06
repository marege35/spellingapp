import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ToOrdTabellPage = () => {
  const validWords = [
    'ai', 'av', 'au', 'ba', 'be', 'bo', 'by', 'bæ', 'bø', 'cd', 'cv',
    'da', 'de', 'di', 'do', 'du', 'dø', 'då', 'en', 'er', 'es', 'et', 'ex', 'fy', 'fø', 'få', 'fe',
    'ga', 'gi', 'gå', 'ha', 'hi', 'hæ', 'hø', 'is', 'it', 'ja', 'jo', 'ku', 'kø',
    'la', 'le', 'li', 'lo', 'ly', 'ma', 'me', 'mi', 'mø', 'mæ', 'må', 'ni', 'no', 'ny',
    'næ', 'nå', 'oi', 'ok', 'og', 'om', 'os', 'pc', 'pi', 'på', 'pø', 'qi', 'ra', 're', 'ri', 'ro',
    'rå', 'ry', 'sa', 'se', 'si', 'sy', 'så', 'ta', 'te', 'ti', 'to', 'ty', 'tå',
    'tv', 'ur', 'uv', 'ut', 'ut', 'vi', 'vy', 'wc', 'yr', 'yt', 'øv', 'øy', 'ør',
    'øm', 'øk', 'øs', 'åk', 'år', 'ål', 'ås', 'åt'
  ];

  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'Æ', 'Ø', 'Å'
  ];

  // Organize valid words alphabetically
  const organizedWords = alphabet.map(letter => {
    const wordsStartingWithLetter = validWords.filter(word => word.charAt(0).toUpperCase() === letter);
    return { letter, words: wordsStartingWithLetter };
  });

  const isVowel = (letter) => {
    return ['a', 'e', 'i', 'o', 'u', 'y', 'æ', 'ø', 'å'].includes(letter.toLowerCase());
  };

  return (
    <ScrollView style={styles.container}>
      {organizedWords.map(({ letter, words }) => (
        <View key={letter}>
          <Text style={styles.letter}>{letter}</Text>
          <View style={styles.wordContainer}>
            <Text style={styles.word}>
              {words.map((word, index) => (
                <Text key={index} style={isVowel(word.charAt(0)) ? styles.vowelText : styles.consonantText}>
                  {word}{index !== words.length - 1 ? ', ' : ''}
                </Text>
              ))}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  letter: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {
    fontSize: 16,
    marginLeft: 20,
  },
  vowelText: {
    color: 'red',
  },
  consonantText: {
    color: 'blue',
  },
});

export default ToOrdTabellPage;
