import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

const AlphabetPage = ({ route, navigation }) => {
  const { letter } = route.params;
  const [word, setWord] = useState('');
  const [vowelWords, setVowelWords] = useState([]);
  const [consonantWords, setConsonantWords] = useState([]);
  const [showTypingBoard, setShowTypingBoard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setShowTypingBoard(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setShowTypingBoard(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    populateTables();
  }, [word]);


  const populateTables = () => {
    if (word.length === 2 && isValidWord(word)) {
      const category = isVowel(word[0]) ? vowelWords : consonantWords;
      if (category.length < 2 && !category.includes(word)) {
        category.push(word);
      }
    }
  };

  const handleAddWord = () => {
    if (vowelWords.length === 2 && consonantWords.length === 2) {
      navigation.navigate('ToOrdTabell', { vowelWords, consonantWords });
    }
  };

  const isValidWord = (word) => {
    return validWords.includes(word.toLowerCase());
  };

  const validWords = [
    'ai', 'av', 'au', 'ba', 'be', 'bo', 'by', 'bæ', 'bø', 'cd', 'cv',
    'da', 'de', 'di', 'do', 'du', 'dø', 'då', 'en', 'er', 'es', 'et', 'ex', 'fy', 'fø', 'få', 'fe',
    'ga', 'gi', 'gå', 'ha', 'hi', 'hæ', 'hø', 'is', 'it', 'ja', 'jo', 'ka', 'ku', 'kø',
    'la', 'le', 'li', 'lo', 'ly', 'ma', 'me', 'mi', 'mø', 'mæ', 'må', 'ni', 'no', 'ny',
    'næ', 'nå', 'oi', 'ok', 'og', 'om', 'os', 'pc', 'pi', 'på', 'pø', 'qi', 'ra', 're', 'ri', 'ro',
    'rå', 'ry', 'sa', 'se', 'si', 'sy', 'så', 'ta', 'te', 'ti', 'to', 'ty', 'tå',
    'tv', 'ur', 'uv', 'ut', 'ut', 'vi', 'vy', 'wc', 'yr', 'yt', 'øv', 'øy', 'ør',
    'øm', 'øk', 'øs', 'åk', 'år', 'ål', 'ås', 'åt'
  ];

  const handleDeleteWord = () => {
    setVowelWords([]);
    setConsonantWords([]);
  };

  const isVowel = (letter) => {
    return ['A', 'E', 'I', 'O', 'U', 'Y', 'Æ', 'Ø', 'Å'].includes(letter.toUpperCase());
  };

  const handleInputChange = (text) => {
    if (text === '←' && word.length > 0) {
      setWord(word.slice(0, -1));
    } else if (text.length <= 2) {
      setWord(text);
    }
    if (text.length > 0) {
      setShowTypingBoard(true); // Show typing board when user interacts with keyboard
    } else {
      setShowTypingBoard(false); // Hide typing board when input is empty
    }
    if (text.length > 2) {
      alert('For mange bokstaver! Legg til et ord med to bokstaver');
    }
  };
  

  const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'Æ', 'Ø', 'Å'
  ];

  const handleInputSubmit = () => {
    handleAddWord();
  };

  const handleEnterPress = () => {
    if (word.length === 2) {
      populateTables();
      setWord('');
    } else {
      alert('Legg til et ord med to bokstaver');
    }
  };

  return (
    <View style={styles.container}>
      {showTypingBoard && (
        <View style={styles.viewingBox}>
          <Text style={styles.typedLetter}>{word}</Text>
        </View>
      )}
      <View style={styles.alphabetContainer}>
        <Text style={styles.alphabetHeader}>Tast inn et ord med to bokstaver. Trykk deretter på den grønne knappen. </Text>
        <Text style={styles.additionalText}>
        Ordene legges automatisk som konsonant eller vokal.
        </Text>
        <View style={styles.alphabetTable}>
          <View style={styles.gridContainer}>
            {alphabet.map((letter, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.alphabetCell, isVowel(letter) ? styles.vowelCell : styles.consonantCell]}
                onPress={() => handleInputChange(word + letter)}
              >
                <Text style={styles.alphabetText}>{letter}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.alphabetCell, styles.backspaceCell]}
              onPress={() => handleInputChange('←')}
            >
              <Text style={styles.alphabetText}>{'←'}</Text>
            </TouchableOpacity>
            <View style={[styles.alphabetCell, styles.enterButton]}>
            <TouchableOpacity
              style={styles.fullWidthButton}
              onPress={handleEnterPress}
            >
            <Text style={[styles.alphabetText, { color: 'white' }]}>{'>'}</Text>
            </TouchableOpacity>
</View>
        </View>
        </View>
      </View>
      <Text style={styles.additionalText}>
        Når du har tastet inn 2 ord i hver boks kan du slette alle ordene for å prøve på nytt.
        </Text>
      <View style={styles.tablesContainer}>
        <View style={[styles.table, styles.basicBackground]}>
          <Text style={[styles.tableTitle, {color: 'blue'}]}>Konsonanter</Text>
          {consonantWords.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <Text style={styles.blueWord}>{word}</Text>
            </View>
          ))}
          {consonantWords.length === 2 && (
            <TouchableOpacity onPress={handleAddWord} style={styles.addButton}>
              <Text style={styles.addButtonText}>Fullført! Se svar.</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.table, styles.basicBackground]}>
          <Text style={[styles.tableTitle, {color: 'red'}]}>Vokaler</Text>
          {vowelWords.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <Text style={styles.redWord}>{word}</Text>
            </View>
          ))}
          {vowelWords.length === 2 && (
            <TouchableOpacity onPress={handleAddWord} style={styles.addButton}>
              <Text style={styles.addButtonText}>Godt gjort! Se svar.</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {(consonantWords.length === 2 || vowelWords.length === 2) && (
        <TouchableOpacity onPress={handleDeleteWord} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Slett alle ordene</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  
  typedLetter: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'green',
  },
  alphabetContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  alphabetHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  additionalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  alphabetTable: {
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  alphabetCell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  alphabetText: {
    fontSize: 20,
  },
  vowelCell: {
    backgroundColor: 'red',
  },
  consonantCell: {
    backgroundColor: 'blue',
  },
  backspaceCell: {
    backgroundColor: 'lightgray',
  },
  tablesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  basicBackground: {
    backgroundColor: 'ghostwhite',
    marginRight: 5,
    marginBottom: 10,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 25,
  },
  blueWord: {
    color: 'blue',
    fontSize: 25,
  },
  redWord: {
    color: 'red',
    fontSize: 25,
  },
  addButton: {
    backgroundColor: 'steelblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
  },
  enterButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  enterButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default AlphabetPage;
