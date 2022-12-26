import { useEffect, useState, useContext } from "react";
import UserContext from "../context/userContext";
import { getUserById } from "../services/firebase";

export const useUser = () => {
    const [activeUser, setActiveUser] = useState({})
    const { user } = useContext(UserContext)
    useEffect(() => {
        async function getUserObjByUserId() {
            const [response] = await getUserById(user.uid)
            setActiveUser(response)
        }

        if (user?.uid) {
            getUserObjByUserId()
        }
    }, [user])
    return { user: activeUser }
}
