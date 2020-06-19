import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUpUser, resetAllAuthForms } from "./../../redux/User/user.actions";
import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError,
});
const Singup = (props) => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            reset();
            dispatch(resetAllAuthForms())
            props.history.push("/");
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError]);

    const reset = () => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
    };
    const handlFormSubmit = async (event) => {
        event.preventDefault();
        dispatch(
            signUpUser({
                displayName,
                email,
                password,
                confirmPassword,
            })
        );
    };

    const configAuthWrapper = {
        headline: "Registration",
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return <li key={index}>{err}</li>;
                        })}
                    </ul>
                )}
                <form onSubmit={handlFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={(e) => setDisplayName(e.target.value)}
                        required
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button type="submit">Register</Button>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default withRouter(Singup);
