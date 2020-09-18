import React from "react";

//Component used for displaying validation errors or otherwise.

export default (props) => {
    if(props.errors && props.errors.length) {
        const errors = props.errors.map((error, index) => {
            return <li key={index}>{error}</li>
        });
        return <ul style={{color: "red"}}>{errors}</ul>
    }
    return null;
}