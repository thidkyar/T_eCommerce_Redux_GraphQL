import React, { Component } from 'react';
import './styles.scss'
import { render } from '@testing-library/react';
import Signup from './../../components/Signup'

class Registration extends Component {

    render() {
        return (
            <Signup />
        )
    }
}

export default Registration