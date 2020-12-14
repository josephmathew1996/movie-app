import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = (props) => {
    return (
        <Spinner color={props.color} />
    )
}
export default Loader;