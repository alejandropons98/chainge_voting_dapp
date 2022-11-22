import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db} from '../utils/firebase-config'
import { doc, setDoc, getDoc } from "firebase/firestore"

export default function SessionProvider (props){

    const [session, setSession] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [candidates, setCandidates] = useState([])

    const login = async (email,password) => {
        
        setLoading(true);
        try {

            const infoUsuario = await signInWithEmailAndPassword(auth, email, password);
            const docRef = doc(db, usersCollection, infoUsuario.user.uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();

            setSession({
                id: infoUsuario.user.uid,
                correo: email,
                name: userData.name,
            })

        } catch (e) {
            console.error("Error: ", e)
        }

        setLoading(false);
    }

    const register = async (name,email,password,rol) => {
        
        setLoading(true);
        
        try {
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, "usuarios", infoUsuario.user.uid), {name, correo:email, rol});

            setSession({
                id: infoUsuario.user.uid,
                //id: "17cgV8GIFEPIKuMqEMdr3zGFNFp2",
                name,
                //name: "Lionel Andrés",
                correo: email,
                //correo: "app@gmail.com",
                rol,
                //rol: "usuario"
            })
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setLoading(false);
    }

    const sessionCheckRegister = async (response) => {
        
        setLoading(true);
        await setDoc(doc(db, "usuarios", response.user.uid), {name: response.user.displayName, correo: response.user.email, rol: "usuario"});
        setSession({
            id: response.user.uid,
            correo: response.user.email,
            name: response.user.displayName,
            rol: "usuario",
        })
            
        setLoading(false);
    }

    const sessionCheckLogin = async (response) => {
 
        setLoading(true);
        setSession({
            id: response.user.uid,
            correo: response.user.email,
            name: response.user.displayName,
        })

        setLoading(false);
    }

    return(

        <sessionContext.Provider  value={{login, register, sessionCheckLogin, sessionCheckRegister}}>
            {props.children}
        </sessionContext.Provider>

    )
}