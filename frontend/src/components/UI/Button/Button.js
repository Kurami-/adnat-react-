import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ButtonBase from "@material-ui/core/Button";

const CustomButton = withStyles(theme => ({
    root: {
        display: 'block',
        border: "1px solid #8B008B", 
        backgroundColor: "#8B008B", 
        color: "#fff", 
        fontSize: "12px", 
        textTransform: "none",
        "&:hover": {
            color: "#fff",
            background: "#800080",
            boxShadow: "none",
            borderColor: "#800080"
        },
        boxShadow: "none"
    },
}))(ButtonBase);

export default function Button(props){
    return (
        <CustomButton {...props} style={props.style}>
            {props.children}
        </CustomButton>
    )
}
