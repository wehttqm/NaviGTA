import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Stack } from 'expo-router';
import ThemeContext from '../context/ThemeContext';
import Grid from '../components/grid';

export default function Home() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [StatusBarComponent, setStatusBarVisible] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = theme === true ? false : true;
    toggleTheme(newTheme);
  }

  useEffect(() => {
    setStatusBarVisible(true);
  }, []);

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: theme === true ? 'black' : 'white',
    },
    statusBar: theme === true ? 'light-content' : 'dark-content',
    stackScreen: {
      headerStyle: { backgroundColor: theme === true ? 'black' : 'white' },
      headerShadowVisible: false,
      headerTitleStyle: { color: theme === true ? 'white' : 'black' },
      title: 'Navigate'
    },
    buttonColor: theme === true ? 'black' : 'white',
    viewStyle: {
      width: '100%',
      alignItems: 'center',
      marginTop: '25%'
    },
    textStyle: {
      fontSize: 20,
      marginTop: 50,
      color: theme === true ? 'white' : 'black'
    },
  });

  return (

    <SafeAreaView style={styles.safeAreaView}>
      {StatusBarComponent && <StatusBar barStyle={styles.statusBar} translucent={true} />}
      <Stack.Screen options={styles.stackScreen} />
          <View style={styles.viewStyle}>
            <TouchableOpacity>
              <Button buttonColor={styles.buttonColor} mode={'outlined'} textColor={styles.textStyle.color} onPress={handleToggleTheme}>
                Toggle {theme === true ? 'Light' : 'Dark'} Mode
              </Button>
            </TouchableOpacity>
          </View>
          <Grid theme={theme}/>
          

    </SafeAreaView>
  )
}
