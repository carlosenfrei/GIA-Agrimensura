import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserEmail, setLocalId, clearUser, setUserType } from "../store/slices/userSlice";
import { auth } from "../services/db";

const useAuthlis = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Observa los cambios de sesión de Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // Si hay un usuario logueado, guardamos sus datos en Redux
            dispatch(setUserEmail(user.email));
            dispatch(setLocalId(user.uid));
        } else {
            // Si no hay sesión, limpiamos Redux
            dispatch(clearUser());
        }
        });

        // Limpieza del listener cuando el componente se desmonta
        return () => unsubscribe();
    }, [dispatch]);
};
export default useAuthlis 