import { FC, InputHTMLAttributes } from 'react';
declare type size = 'lg' | 'sm';
export interface inputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    size?: size;
    defaultValut?: string;
    disabled?: boolean;
    icon?: string;
}
declare const Input: FC<inputProps>;
export default Input;
