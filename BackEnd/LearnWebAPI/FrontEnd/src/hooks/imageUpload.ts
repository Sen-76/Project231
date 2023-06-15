import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class ImageUploadPlugin extends Plugin {
    static get requires(): Array<any> {
        return [FileRepository];
    }

    init(): void {
        this.editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
            return new UploadAdapter(loader);
        };
    }
}

class UploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload(): Promise<any> {
        return this.loader.file
            .then(
                (file: any) =>
                    new Promise((resolve, reject) => {
                        // Customize your image upload logic here, e.g., using an API endpoint
                        // Once the image is uploaded, resolve the promise with the image URL
                        const url = 'https://example.com/upload-image';
                        resolve({ default: url });
                    }),
            )
            .then((response: any) => {
                return { default: response.default };
            });
    }
}
