import { useEffect, useState, useContext } from "react";
import UserContext from "../context/userContext";
import { getUserById } from "../services/firebase";

export const useUser = () => {
    const [activeUser, setActiveUser] = useState({})
    const { user } = useContext(UserContext)
    useEffect(() => {
        async function getUserObjByUserId() {
            const [response] = await getUserById(user.uid)
            console.log('response:', typeof (response), response, user.uid)
            setActiveUser(response)
        }

        if (user?.uid) {
            getUserObjByUserId()
        }
    }, [user])

    console.log('activeUser: ', activeUser)
    return { user: activeUser }
}
