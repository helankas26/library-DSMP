import FileResizer from 'react-image-file-resizer';

export const resizeProfileImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
        FileResizer.imageFileResizer(
            file,
            800,
            800,
            'JPEG',
            60,
            0,
            (uri) => {
                resolve(uri as File);
            },
            'file'
        );
    });
}