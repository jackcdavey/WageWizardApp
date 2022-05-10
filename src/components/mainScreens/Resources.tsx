import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Alert, Text, TextInput } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import styles from '../../styles/stylesheet.js';

export default function Resources() {

  const [searchText, setSearchText] = useState('500 El Camino Real San Jose CA');

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Reference Articles:</Text>
      <TextInput style={styles.searchText} placeholder="Search..." onChangeText={newText => setSearchText(newText)} />


      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 0,
        marginBottom: 0,
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article}>
              <Text style={styles.buttonText}>Article One</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article}>
              <Text style={styles.buttonText}>Article Two</Text>
            </View>
          </TouchableOpacity>
        </View>


        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>

            <View style={styles.article}>
              <Text style={styles.buttonText}>Article Three</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article}>
              <Text style={styles.buttonText}>Article Four</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
        <View style={[styles.article, { maxHeight: Dimensions.get('window').width * 0.15 }]}>
          <Text style={styles.buttonText}>See All</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Employer Match:</Text>
      <TextInput style={styles.searchText} placeholder="Search..." onChangeText={newText => setSearchText(newText)} />



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
