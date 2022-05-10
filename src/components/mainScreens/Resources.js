import React, { useState, useCallback } from 'react';
import { View, Dimensions, TouchableOpacity, Alert, Text, TextInput, Linking, Image, ScrollView, Appearance } from 'react-native';
import COLORS from '../../styles/colors.js';
import { BlurView } from "@react-native-community/blur";
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

const bodyHeight = Dimensions.get('window').height * 0.65;
const footerHeight = Dimensions.get('window').height * 0.4;
const appearance = Appearance.getColorScheme();



export default function Resources() {

  const [searchText, setSearchText] = useState('500 El Camino Real San Jose CA');

  return (
    <ScrollView style={styles.scrollViewContainer} >
      <View style={[styles.container, { justifyContent: 'space-evenly', maxHeight: bodyHeight }]}>
        <Text style={styles.subtitle}>Featured References:</Text>
        <View style={styles.field}>
          <TextInput style={styles.searchText} placeholder="Search..." placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setSearchText(newText)} />
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
            <OpenURLButton url="https://www.researchgate.net/publication/351009949_Wage_Theft_in_Silicon_Valley_Building_Worker_Power" >2021 Wage Theft Report</OpenURLButton>
            <OpenURLButton url="https://workers-stories.org/" >Silicon Valley Worker Stories</OpenURLButton>
          </View>
        </View>

        <TouchableOpacity onPress={() => Alert.alert('This will display additional verified articles')}>
          <View style={styles.allArticles}>
            <Text style={styles.buttonText}>See All</Text>
            <Image source={appearance == 'dark' ? require('../../assets/images/icons/ForwardLight.png') : require('../../assets/images/icons/ForwardDark.png')} style={{ maxWidth: '9%', maxHeight: '50%' }} />
          </View>
        </TouchableOpacity>
      </View>


      <View>
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.light }}>
          <Text style={styles.subtitle}>Employer Match:</Text>
        </View>
        <View style={[styles.footer, { minHeight: footerHeight }]}>

          <View style={styles.field}>
            <TextInput style={styles.searchText} placeholder="Search..." placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setSearchText(newText)} />
            <TouchableOpacity style={styles.searchButton} onPress={() => Alert.alert('Search')}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>



          <BlurView
            style={{ borderRadius: 25, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', minHeight: '50%', zIndex: 1 }}
            blurType='regular'
            blurAmount={20}
            reducedTransparencyFallbackColor="gray"
          />

        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, }}>
          <Text style={styles.subtitle}>Coming Soon!</Text>
        </View>
      </View>
    </ScrollView >

  );
}
