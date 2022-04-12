import React from 'react';
import { View, Dimensions, TouchableOpacity, Alert, Text } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import styles from '../../styles/stylesheet.js';

export default function Resources() {
  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article} />
          </TouchableOpacity>
        </View>


        <View>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>

            <View style={styles.article} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
            <View style={styles.article} />
          </TouchableOpacity>
        </View>




      </View>
      <BlurView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{ position: 'absolute', top: Dimensions.get('window').height / 3 }}>
        <Text style={styles.title}>Resource Page Coming Soon!</Text>
      </View>
    </View>
  );
}
