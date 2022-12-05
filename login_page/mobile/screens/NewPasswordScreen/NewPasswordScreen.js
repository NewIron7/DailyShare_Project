import { StyleSheet, Text, View, ScrollView} from "react-native";
import React , {useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        //Verif code and newPassword
        navigation.navigate('SignIn');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.root}>
            <Text style={styles.title}>
                Reset your password
            </Text>
            <CustomInput
            placeholder="Code"
            value={code}
            setValue={setCode}
            />

            <CustomInput
            placeholder="Enter your new password"
            value={newPassword}
            setValue={setNewPassword}
            secureTextEntry
            />

            <CustomButton
            onPress={onSubmitPressed}
            text="Submit"
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

export default NewPasswordScreen;