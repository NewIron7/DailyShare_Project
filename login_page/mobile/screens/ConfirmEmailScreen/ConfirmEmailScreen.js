import { StyleSheet, Text, View, ScrollView} from "react-native";
import React , {useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState("");

    const navigation = useNavigation();

    const onCodePressed = () => {
        navigation.navigate('SignIn');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onResendPressed = () => {
        console.warn("Resend Code");
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.root}>
            <Text style={styles.title}>
                Confirm your email
            </Text>
            <CustomInput
            placeholder="Enter your confirmation code"
            value={code}
            setValue={setCode}
            />

            <CustomButton
            onPress={onCodePressed}
            text="Confirm"
            />

            <CustomButton
            onPress={onResendPressed}
            text="Resend code"
            type="SECONDARY"
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

export default ConfirmEmailScreen;