import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import NewPasswordScreen from './screens/NewPasswordScreen';
import Navigation from './navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfc',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
