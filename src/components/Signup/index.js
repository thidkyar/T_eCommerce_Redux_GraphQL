import React, { Component } from "react";
import "./styles.scss";

import { auth, handleUserProfile } from "./../../firebase/utils";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";

const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
};

class Singup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handlFormSubmit = async (event) => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            const err = ["Passwords don't match"];
            this.setState({
                errors: err,
            });
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await handleUserProfile(user, { displayName });

            this.setState({
                ...initialState,
            });
        } catch (err) {
            //console.log(err)
        }
    };

    render() {
        const {
            displayName,
            email,
            password,
            confirmPassword,
            errors,
        } = this.state;
        
        const configAuthWrapper = {
            headline: 'Registration'
        }

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
                    <form onSubmit={this.handlFormSubmit}>
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            onChange={this.handleChange}
                            required
                        />

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                            required
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />

                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            required
                        />

                        <Button type="submit">Register</Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default Singup;
