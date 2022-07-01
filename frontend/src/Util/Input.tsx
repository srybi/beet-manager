import './Input.css'
import { TextField } from '@mui/material';
import { ChangeEvent, ReactElement } from 'react';


type Props = {
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: 'text' | 'password';
    error?: string | undefined
};



function Input({ label, name, value, onChange, type, error}: Props): ReactElement {

    return (
        <div className={'Input'}>
        <TextField
            label={`${label}*`}
            variant="outlined"
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            helperText={error}
            error={error!==undefined}
        />
        </div>
    );
}
export default Input;