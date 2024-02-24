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

  const DARK = 'black'
  const LIGHT = 'white'

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: theme === true ? DARK : LIGHT,
    },
    statusBar: theme === true ? 'light-content' : 'dark-content',
    stackScreen: {
      headerStyle: { backgroundColor: theme === true ? DARK : LIGHT },
      headerShadowVisible: false,
      headerTitleStyle: { color: theme === true ? LIGHT : DARK },
      title: 'Golf sucks'
    },
    buttonColor: theme === true ? DARK : LIGHT,
    viewStyle: {
      width: '100%',
      alignItems: 'center',
      marginTop: '25%'
    },
    textStyle: {
      fontSize: 20,
      marginTop: 50,
      color: theme === true ? LIGHT : DARK
    },
  });

  return (

    <SafeAreaView style={styles.safeAreaView}>
      {StatusBarComponent && <StatusBar barStyle={styles.statusBar} translucent={true} />}
      <Stack.Screen options={styles.stackScreen} />
          <View style={styles.viewStyle}>
            <TouchableOpacity onPress={() => {handleToggleTheme()}}>
              <Button buttonColor={styles.buttonColor} style={{ borderRadius: '10px'}} mode={'contained'} textColor={styles.textStyle.color}>
                Toggle {theme === true ? 'light' : 'dark'} mode
              </Button>
            </TouchableOpacity>
          </View>
          <Grid theme={theme} light = {LIGHT} dark = {DARK}/>
          

    </SafeAreaView>
  )
}
