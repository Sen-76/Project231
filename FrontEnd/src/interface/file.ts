export declare type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadRawFile extends File {
    uid: number;
}
export interface UploadFile {
    name: string;
    percentage?: number;
    status: UploadStatus;
    size?: number;
    response?: unknown;
    uid: number;
    url?: string;
    raw?: UploadRawFile;
}
