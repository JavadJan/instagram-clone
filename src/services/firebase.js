import { collection, where, getDocs, query, limit, updateDoc, doc, addDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '../lib/firebase'

export async function doesUsernameExist(username) {
    console.log('usernameeeeeeeee' , username)
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return user;
}
doesUsernameExist('bob')

//get user from fire store where userId === userId(passed from the auth)
export async function getUserById(uid) {
    const q = query(collection(db, "users"), where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return user;
}

//suggested users
export async function suggestedUser(userId, following) {
    const q = query(collection(db, 'users'), limit(10))
    const result = getDocs(q)

    // shows all profile except of the users is already logged and the users we already have following
    const suggestedUsers = (await result).docs.map(doc => ({ ...doc.data(), id: doc.id }))
        .filter((prof) => prof.userId !== userId && !following.includes(prof.userId))

    return suggestedUsers;
}

//update following field of user already logged
export async function updateLoggedInUserFollowing(loggedUserIdDoc, profileId, isFollowingProfile) {
    return await updateDoc(doc(db, 'users', loggedUserIdDoc), {
        following: isFollowingProfile
            ? arrayUnion(profileId)
            : arrayRemove(profileId)
    })

}

//update field follower of user is followed
export async function updateFollowingUserFollowers(spUserDocId, loggedUserIdDoc, isFollowingProfile) {
    return await updateDoc(doc(db, 'users', spUserDocId), {
        followers: isFollowingProfile
            ? arrayUnion(loggedUserIdDoc)
            : arrayRemove(loggedUserIdDoc)
    })
}

//get photos
export async function getPhotos(userId, following) {
    //extract the photosId that exist in following array of the user logged
    const q = query(collection(db, 'photos'), where("userId", "in", following))
    const users_following = await getDocs(q)
    const isFollowed_userPhotos = users_following.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    const photosWithUserDetails = await Promise.all(
        isFollowed_userPhotos.map(async (photo) => {
            let userLikedPhoto = false;

            //if photo is already liked liked==true
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true
            }

            const user = await getUserById(photo.userId)
            const { username } = user[0]
            return { username, ...photo, userLikedPhoto }
        })
    )
    return photosWithUserDetails
}



//get User Photos By Username
export async function getUserPhotosByUserId(userId) {
    const q = query(collection(db, "photos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const photos = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log('photos : =>', photos)
    return photos;
}

//isUserFollowingProfile
export async function isUserFollowingProfile(username, profileUserId) {
    const q = query(collection(db, 'users'), where('username', '==', username), where('following', 'array-contains', profileUserId))
    const snap = await getDocs(q)
    const res = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log('res', res)
    return res
}

//isUserFollowersProfile
export async function isUserFollowersProfile(followers) {
    const q = query(collection(db, 'users'), where('userId', 'in', followers))
    const snap = await getDocs(q)
    const res = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log('res', res)
    return res
}

//update db when you click on follow account!
export async function ToggleFollow(isFollowingProfile, activeUserDocId,profileDocId, profileUserId, followingUserId) {
    await updateLoggedInUserFollowing(activeUserDocId , profileUserId , isFollowingProfile)

    await updateFollowingUserFollowers(profileDocId , followingUserId, isFollowingProfile)
}