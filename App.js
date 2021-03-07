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
import { StyleSheet } from 'react-native';
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

function Selection() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
