import React, { useState } from "react";
import { withRouter } from 'react-router-dom'
import "./styles.scss";

import { auth, handleUserProfile } from "./../../firebase/utils";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

const Singup = (props) => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const reset = () => {
        setDisplayName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors([]);
    };
    const handlFormSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            const err = ["Passwords don't match"];
            setErrors(err);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await handleUserProfile(user, { displayName });
            reset();
            props.history.push('/')
        } catch (err) {
            //console.log(err)
        }
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
