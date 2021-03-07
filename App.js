// import React from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
// import { default as theme } from './custom-theme.json'; // <-- Import app theme

// export default () => (
//   <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
//     <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button>Log In to Spotify</Button>
//     </Layout>
//   </ApplicationProvider>
// );

// import 'react-native-gesture-handler';
// import React from 'react';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { AppNavigator } from './navigation.component';
// import { default as theme } from './custom-theme.json';

// export default () => (
//   <>
//     <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
//       <AppNavigator/>
//     </ApplicationProvider>
//   </>
// );

import * as React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Text, Input } from '@ui-kitten/components';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { default as theme } from './custom-theme.json';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    margin: 20,
    color: '#FFF',
    textAlign: 'center'
  },
  button: {
      height:50,
      paddingHorizontal:10,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      margin:10,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  }
});

function Login({ navigation }) {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text} category='h3'>Athena: Empathetic Playlists</Text>
        <Button onPress={() => navigation.navigate('Choose a Song')}>Log In to Spotify</Button>
      </Layout>
    </ApplicationProvider>
  );
}

function Selection({navigation}) {
  const [value, setValue] = React.useState('');
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.text} category='h1'>Select your first song:</Text>
        <Input
          placeholder='Search for a song here...'
          value={value}
          onChangeText={nextValue => setValue(nextValue)}
        />

        <Button onPress={() => navigation.navigate('Detecting Emotion')}>Submit Song</Button>
      </Layout>
    </ApplicationProvider>
  );
}

function playSong() {
return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text} category='h5'>Playing suggested song</Text>
      <View style={styles.container}>
      <Image
      source={require('./keshi.jpg')}
      style={{ width: 300, height: 300 }}
      PlaceholderContent={<ActivityIndicator />}
      />

    </View>
    <Text style={styles.text} category='h1'>2 soon</Text>
    <Image 
      source={require('./MusicBar.png')}
      style={{ width: 250, height:  250 }}
      />
      
      </Layout>
    </ApplicationProvider>
  );
}

function detectEmotion({navigation}){
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button style={{backgroundColor: 'transparent'}} onPress={() => navigation.navigate('Playing Song')}>Loading</Button>

      <Image 
      source={require('./progressbar.png')}
      style={{ width: 250, height:  250 }}
      />
      </Layout>
    </ApplicationProvider>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Start Here" component={Login} />
        <Stack.Screen name="Choose a Song" component={Selection} />
        <Stack.Screen name="Playing Song" component={playSong} />
        <Stack.Screen name="Detecting Emotion" component={detectEmotion}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
