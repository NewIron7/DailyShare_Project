import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView} from "react-native";
import React , {useState} from "react";
import Logo from '../../assets/images/Share_Logo.png';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        //Verif logins
        navigation.navigate('Home');
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo,
            {height: height * 0.3}]}
            resizeMode="contain"
             />
            <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />
            <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry
            />
            <CustomButton
            onPress={onSignInPressed}
            text="Sign In"
            />

            <CustomButton
            onPress={onForgotPasswordPressed}
            text="Forgot password"
            type="TERTIARY"
            />

            <SocialSignInButtons />

            <CustomButton
            onPress={onSignUpPressed}
            text="Don't have an account ? Create one"
            type="TERTIARY"
            />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen;