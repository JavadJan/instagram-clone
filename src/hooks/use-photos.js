import { useState, useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import { getUserById, getPhotos } from "../services/firebase";

export const usePhotos = () => {
    const [photos, setPhotos] = useState(null)
    const { user } = useContext(UserContext)
    console.log('user Photoes: ', user.uid)

    useEffect(() => {
        async function getTimeLinePhotos() {
            //Following can be user
            const [res]  =await getUserById(user.uid);
            console.log('get following: ',res, res.following)

            //collection(db, 'photos')=> imgSrc
            let isFollowed_userPhotos = []

            //does the user actually follow people?
            if (res.following.length > 0) {
                isFollowed_userPhotos =await getPhotos(res.uid , res.following)
                //re-arrange array to be newest photos first by dataCreated
                setPhotos(isFollowed_userPhotos.sort((a,b) => b.dateCreated - a.dateCreated))

                console.log('isFollowedPhoto: ', isFollowed_userPhotos)
            }

            //to be sure we have imageSrc
            console.log('.map((img)=>img.imageSrc):',isFollowed_userPhotos.map((img)=>img.imageSrc))
        }
        if (user.uid) {
            getTimeLinePhotos()
        }
    }, [user.uid])
    return { photos }

}
