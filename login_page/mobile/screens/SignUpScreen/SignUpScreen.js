import { StyleSheet, Text, View, ScrollView} from "react-native";
import React , {useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail');
    }

    const onTermsOfUsePressed = () => {
        console.warn("Terms of use");
    }

    const onPrivacyPolicyPressed = () => {
        console.warn("Privacy policy");
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.root}>
            <Text style={styles.title}>
                Create an account
            </Text>
            <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />

            <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            />

            <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry
            />

            <CustomInput
            placeholder="Repeat Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry
            />

            <CustomButton
            onPress={onRegisterPressed}
            text="Register"
            />

            <Text style={styles.text}>
                By registering, you confirm that you accept
                our <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use </Text> 
                and <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
            </Text>

            <SocialSignInButtons />

            <CustomButton
            onPress={onSignInPressed}
            text="Have an account ? Sign in"
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
    title: {
        fontSize:24,
        fontWeight: "bold",
        color: "#051c60",
        margin: 10,
    },
    text: {
        color: "grey",
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    }
});

export default SignUpScreen;