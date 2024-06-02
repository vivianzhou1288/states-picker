import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

interface State {
  name: string
}

function App(): React.JSX.Element {
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<string>('')

  useEffect(() => {
    const getStates = async () => {
      const response = await axios.get("http://localhost:3000/states");
      setStates(response.data);
    };

    getStates();
  }, []);

  const stateItems = states.map((state) => ({
    label: state.name,
    value: state.name,
  }))

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.subContainer}>
        <Text style = {styles.title}>State picker challenge</Text>
        <View style = {{position: "relative"}}>
          <RNPickerSelect 
            onValueChange = {(value) => setSelectedState(value)}
            items={stateItems}
            style={pickerSelectStyles} 
            placeholder = {{label: "Select a state", value: null}}
          />

          <View style = {styles.downSection}>
            <TouchableOpacity>
              <Image style = {styles.down} source = {{uri: "https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"}} />
            </TouchableOpacity>
          </View>

          <View style = {styles.stateTextSection}>
            <Text style = {styles.stateText}>State</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  subContainer:{
    paddingLeft: 30,
    marginTop: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 30
  },
  down: {
    width: 17,
    height: 17
  },
  downSection: {
    position: "absolute",
    right: 40,
    top: 17
  },
  stateText: {
    fontSize: 10,
    color: 'gray'
  },
  stateTextSection: {
    position: "absolute",
    left: 10,
    top: 2
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
      marginRight: 30,
      backgroundColor: 'white'
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 
  }
});

export default App;
