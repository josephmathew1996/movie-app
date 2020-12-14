import React from 'react';
import { Alert } from 'reactstrap';

const CommonAlert = (props) => {
    const {
        color,
        message
    } = props
    return (
        <Alert color={color}>
            {message}
        </Alert>
    );
};

export default CommonAlert;