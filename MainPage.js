import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';


const MainPage = ({ navigation }) => {
  const handleLinkPressTwo = () => {
    navigation.navigate('AlphabetPage', { letter: 'Ord med to bokstaver' });
  };

  const handleLinkPressThree = () => {
    navigation.navigate('Trebokstaver', { letter: 'Ord med tre bokstaver' });
  };

  const handleLinkPressLesetrening = () => {
    navigation.navigate('LetterRecognitionGame');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lær å lese og skrive</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('./thumbnail.png')} // Replace 'path/to/your/image.jpg' with the actual path to your image
          style={styles.image}
        />
      </View>
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={handleLinkPressTwo} style={styles.button}>
          <Text style={styles.buttonText}>Ord med to bokstaver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={handleLinkPressThree} style={styles.button}>
          <Text style={styles.buttonText}>Ord med tre bokstaver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={handleLinkPressLesetrening} style={styles.button}>
          <Text style={styles.buttonText}>Dra og slipp bokstavene</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background color
  },
  header: {
    paddingVertical: 20, // Vertical padding for header
    paddingHorizontal: 20, // Horizontal padding for header
    backgroundColor: '#ffffff', // White background color
    width: '100%', // Take full width
    alignItems: 'center', // Center header text horizontally
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Add margin bottom to create space between header and image
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Maintain aspect ratio and fit within the container
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Add margin bottom to create space between buttons
  },
  button: {
    backgroundColor: '#4e94ed', // Blue color for the button background
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Border radius for rounded corners
  },
  buttonText: {
    color: '#ffffff', // White color for the button text
    fontSize: 18, // Font size for the button text
  },
});

export default MainPage;