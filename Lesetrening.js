import React, { useRef, useState } from 'react'; 
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native'; 

const DragAndDropLetter = ({ letter, onDrop }) => { 
    const position = useRef(new Animated.ValueXY()).current; 
    const [dragging, setDragging] = useState(false); 

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
                const dropZoneIndex = Math.floor(gestureState.moveX / 80); // Adjust 80 according to the width of the letter buttons
                onDrop(dropZoneIndex);
            }, 
        }) 
    ).current; 

    return ( 
        <Animated.View 
            style={[ 
                styles.letterContainer, 
                { 
                    transform: position.getTranslateTransform(), 
                    opacity: dragging ? 0.8 : 1, 
                }, 
            ]} 
            {...panResponder.panHandlers} 
        > 
            <Text style={styles.letter}>{letter}</Text> 
        </Animated.View> 
    ); 
}; 
  
const LetterRecognitionGame = () => { 
    const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å']; 
    const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å']; 

    const [selectedUppercaseLetter, setSelectedUppercaseLetter] = useState(''); 
    const [selectedLowercaseIndex, setSelectedLowercaseIndex] = useState(-1); 

    const handleDrop = (index) => { 
        setSelectedLowercaseIndex(index); 
    }; 

    return ( 
        <View style={styles.container}> 
            <View style={styles.lettersContainer}> 
                {uppercaseLetters.map((letter, index) => ( 
                    <DragAndDropLetter 
                        key={index} 
                        letter={letter} 
                        onDrop={handleDrop} 
                    /> 
                ))} 
            </View> 
            <View style={styles.lettersContainer}> 
                {lowercaseLetters.map((letter, index) => ( 
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.letterButton, { backgroundColor: index === selectedLowercaseIndex ? 'green' : 'blue' }]} 
                    > 
                        <Text style={styles.letterText}>{letter}</Text> 
                    </TouchableOpacity> 
                ))} 
            </View> 
        </View> 
    ); 
}; 

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#fff', 
    }, 
    lettersContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    letterContainer: { 
        width: 60, 
        height: 60, 
        margin: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10, 
        backgroundColor: 'blue', 
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
        backgroundColor: 'blue', 
    }, 
    letterText: { 
        fontSize: 24, 
        color: '#fff', 
    }, 
}); 

export default DragAndDropLetter ;

