import { FC } from 'react';
export interface draggerProps {
    onFile: (file: FileList) => void;
    showText?: string;
}
declare const Dragger: FC<draggerProps>;
export default Dragger;
