import { FC } from 'react';
import { inputProps } from '../Input/Input';
export interface AutoCompleteProps extends inputProps {
    fetchSuggestions?: (str: string) => string[] | Promise<string[]>;
    onSelect?: (item: object) => void;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
