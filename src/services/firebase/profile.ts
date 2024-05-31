import firebase, {storage} from "../../config/firebase";

const PROFILE_IMAGES: string = 'images/profiles';

const uploadProfileImage = async (image: File) => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`${PROFILE_IMAGES}/${Date.now() + '-' + image.name}`);
    const snapshot = await imageRef.put(image);
    return await snapshot.ref.getDownloadURL();
}

const deleteProfileImage = async (imageURL: string) => {
    try {
        const storage = firebase.storage();
        const imageRef = storage.refFromURL(imageURL);
        return await imageRef.delete();
    } catch (error: any) {
        return;
    }
}

export default {uploadProfileImage, deleteProfileImage};
