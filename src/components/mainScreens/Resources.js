import React, { useState, useCallback } from 'react';
import { View, Dimensions, TouchableOpacity, Alert, Text, TextInput, Linking } from 'react-native';
// import { BlurView } from "@react-native-community/blur";
import styles from '../../styles/stylesheet.js';


//Function to link to external urls
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile

      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.article}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
};



export default function Resources() {

  const [searchText, setSearchText] = useState('500 El Camino Real San Jose CA');

  return (
    <View style={styles.container}>

      <Text style={styles.subtitle}>Featured References:</Text>
      <View style={styles.field}>
        <TextInput style={styles.searchText} placeholder="Search..." onChangeText={newText => setSearchText(newText)} />
        <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search')}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>


      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
        <View style={{

        }}>
          <OpenURLButton url="https://wagetheftcoalition.org/know-your-rights/" >Ask a Question</OpenURLButton>
          <OpenURLButton url="https://wagetheftcoalition.org/mission/" >Wage Theft Coalition Home</OpenURLButton>

        </View>


        <View style={{
        }}>
          <OpenURLButton url="https://wagetheftcoalition.org/know-your-rights/" >Ask a Question</OpenURLButton>
          <OpenURLButton url="https://wagetheftcoalition.org/mission/" >Wage Theft Coalition Home</OpenURLButton>
        </View>
      </View>

      <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
        <View style={[styles.article, { maxHeight: Dimensions.get('window').width * 0.15 }]}>
          <Text style={styles.buttonText}>See All</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Employer Match:</Text>
      <View style={styles.field}>
        <TextInput style={styles.searchText} placeholder="Search..." onChangeText={newText => setSearchText(newText)} />
        <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search')}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>



      {/* <BlurView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{ position: 'absolute', top: Dimensions.get('window').height / 3 }}>
        <Text style={styles.title}>Resource Page Coming Soon!</Text>
      </View> */}
    </View>
  );
}
