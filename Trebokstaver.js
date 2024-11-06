import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

const Trebokstaver = ({ route, navigation }) => {
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
    if (word.length === 3 && isValidWord(word)) {
      const category = isVowel(word[0]) ? vowelWords : consonantWords;
      if (category.length < 3 && !category.includes(word)) {
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
    'aks', 'ape', 'alv', 'ask', 'ake', 'alm', 
    'bøy', 'blæ', 'bry', 'bra', 'bør', 'bær', 'bøk', 'blå', 'bud', 'bue', 'bur', 'bål', 'bås', 'båt', 'bok', 'bom', 'bak',
    'bad', 'bod', 'bil', 'bod', 'bro', 'bor', 'bar', 'bed', 'ben', 'ber', 'bet', 'bit', 'bli', 'bre', 'dyp', 'døp', 'døv',
    'det', 'dit', 'dør', 'dus', 'død', 'dås', 'eik', 'eks', 'elg', 'ene', 'ese', 'est', 'ete', 'ert', 'far', 'fag',
    'fat', 'fet', 'for', 'fis', 'fil', 'fot', 'fyr', 'før', 'føn', 'får', 'gal', 'gir', 'gis', 'giv',
    'går', 'har', 'han', 'ham', 'hai', 'hat', 'hav', 'hes', 'hel', 'het', 'hev', 'hey', 'hei', 'hit', 'hus', 'hul', 'huk',
    'hun', 'hær', 'hør', 'høy', 'høl', 'hæl', 'hån', 'inn', 'jul', 'kul', 'kil', 'kam', 'kan', 'kar', 'kom', 'kun', 'kur',
    'kål', 'kår', 'lar', 'lam', 'lag', 'lav', 'ler', 'let', 'lei', 'lek', 'les', 'lev', 'lik',
    'liv', 'los', 'lus', 'lur', 'lut', 'lun', 'lua', 'lue', 'lyr', 'lys', 'lyv', 'løy', 'løp',
    'lår', 'lån', 'lås', 'låt', 'mal', 'man', 'mas', 'mat', 'mel', 'men', 'mer', 'min', 'mil', 'mor', 'mot', 'mos', 'mus',
    'mur', 'nal', 'nam', 'nek', 'nok', 'nyt', 'nys', 'nær', 'nøl', 'nøt', 'nøs', 'når', 'nål', 'ose', 'osp', 'pes', 'pil', 'pus',
    'ras', 'rev', 'ris', 'rik', 'rim', 'riv', 'rir', 'ror', 'rot', 'rom', 'rop', 'ros', 'ryk', 'ræv', 'røk', 'rød', 'røp', 'rør',
    'rår', 'sak', 'sal', 'sag', 'sel', 'ser', 'ses', 'sin', 'sil', 'sol', 'som', 'sot', 'sov', 'sur', 'syk', 'syr', 'sys', 'syd',
    'sær', 'søm', 'søl', 'sør', 'søt', 'sår', 'tak', 'tar', 'tau', 'tom', 'tog', 'tok', 'tov', 'tut', 'tur', 'tun', 'tyv', 'tyn', 'tyr',
    'tær', 'tæl', 'tør', 'tøt', 'tøm', 'tøv', 'ule', 'urn', 'ute', 'uer', 'vår', 'var', 'våg', 'vei', 'vel', 'vet', 'vil', 'vis',
  'vid', 'yte', 'ære', 'øre', 'øye', 'åle', 'åke'];


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
    } else if (text.length <= 3) {
      setWord(text);
    }
    if (text.length > 0) {
      setShowTypingBoard(true); // Show typing board when user interacts with keyboard
    } else {
      setShowTypingBoard(false); // Hide typing board when input is empty
    }
    if (text.length > 3) {
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
    if (word.length === 3) {
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

export default Trebokstaver;
