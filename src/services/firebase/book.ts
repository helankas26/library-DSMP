import firebase, {storage} from "../../config/firebase";

const BOOK_IMAGES: string = 'images/books';

const uploadBookImage = async (image: File) => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${BOOK_IMAGES}/${Date.now() + '-' + image.name}`);
    const snapshot = await imageRef.put(image);
    return await snapshot.ref.getDownloadURL();
}

const deleteBookImage = async (imageURL: string) => {
    try {
        const storage = firebase.storage();
        const imageRef = storage.refFromURL(imageURL);
        return await imageRef.delete();
    } catch (error: any) {
        return;
    }
}

export default {uploadBookImage, deleteBookImage};
