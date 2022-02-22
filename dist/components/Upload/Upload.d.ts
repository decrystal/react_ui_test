import { FC } from "react";
export interface uploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    header?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    accept?: string;
    multiple?: boolean;
    name?: string;
    drag?: boolean;
}
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    percentage?: number;
    status?: UploadFileStatus;
    raw?: File;
    response?: any;
    error?: any;
}
declare const Upload: FC<uploadProps>;
export default Upload;
