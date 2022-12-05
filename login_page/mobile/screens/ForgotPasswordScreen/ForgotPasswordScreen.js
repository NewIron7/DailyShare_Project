import { StyleSheet, Text, View, ScrollView} from "react-native";
import React , {useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const [username, setUsername] = useState("");

    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSendPressed = () => {
        //Verif Username
        navigation.navigate('NewPassword');
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.root}>
            <Text style={styles.title}>
                Reset your password
            </Text>
            <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
            />

            <CustomButton
            onPress={onSendPressed}
            text="Send"
            />

            <CustomButton
            onPress={onSignInPressed}
            text="Back to Sign in"
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

export default ForgotPasswordScreen;