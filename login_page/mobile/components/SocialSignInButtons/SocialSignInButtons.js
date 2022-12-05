import React from "react";
import CustomButton from "../../components/CustomButton";

const SocialSignInButtons = () => {
    const onSignInGooglePressed = () => {
        console.warn("Sign in Google");
    }

    const onSignInFacebookPressed = () => {
        console.warn("Sign in Facebook");
    }

    return (
        <>
            <CustomButton
            onPress={onSignInGooglePressed}
            text="Sign In Google"
            bgColor="#fae9ea"
            fgColor="#dd4d44"
            />

            <CustomButton
            onPress={onSignInFacebookPressed}
            text="Sign In Facebook"
            bgColor="#e7eaf4"
            fgColor="#4765a9"
            />
        </>
    );
};

export default SocialSignInButtons;