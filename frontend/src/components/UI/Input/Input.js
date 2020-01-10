import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';

const CustomInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 12,
      width: '100%',
      padding: '15px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  inputLabel: {
    fontSize: "14px",
    color: "#8B008B",
    textTransform: "uppercase",
    fontWeight: "600"
  },
  required: {
    color: "#ff0000"
  },
  formControl: {
    marginBottom: theme.spacing(1),
  }
}));


const Input = props => {
    const classes = useStyles();
    const { label, required, onChange, value, type, disabled } = props;

    return (
        <FormControl fullWidth className={classes.formControl}>
            {
                label ?
                (
                <InputLabel shrink className={classes.inputLabel}>
                    {label} { required ? <span className={classes.required}>*</span> : null }
                </InputLabel>
                ) : null
            }
            <CustomInput 
                disabled={disabled}
                required={required}
                type={type}
                value={value}
                onChange={onChange} />
        </FormControl>
    )
};

export default Input;
  

