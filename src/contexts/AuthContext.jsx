import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db, storage } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import SyncLoader from 'react-spinners/SyncLoader'

const AuthContext = createContext()

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPhotoUrl, setUserPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = async (email, password, name, photo) => {
		await createUserWithEmailAndPassword(auth, email, password)

		const photoPicture = await setDisplayPhoto(photo)
		setUserPhotoUrl(photoPicture)

		const docRef = doc(db, 'users', auth.currentUser.uid) 
		await setDoc(docRef, {
			name,
			email,
			photoURL: photoPicture ? photoPicture : null,
			admin: false,
		})
	}

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const setDisplayPhoto = async (photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			// create a reference 
			const fileRef = ref(storage, `photos/${auth.currentUser.email}/${photo.name}`)

			// upload photo to fileRef
			const uploadResult = await uploadBytes(fileRef, photo)

			// get download url to file
			photoURL = await getDownloadURL(uploadResult.ref)

			console.log("Photo has been uploaded successfully, download url is:", photoURL)

			return photoURL
		}
	}

    // add auth-state observer 
	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
            setUserPhotoUrl(user?.photoURL)
			setLoading(false)
		})

		return unsubscribe
	}, [])

    const values = {
        // everything the children needs
        currentUser,
		signup,
        login,
        logout,
        setDisplayPhoto,
		userName,
		userEmail,
		userPhotoUrl
    }

    return (
        <AuthContext.Provider value={values}>
            {loading ? (
				<div id="initial-loader">
					<SyncLoader color={'#888'} size={15} speedMultiplier={1.1} />
				</div>
			) : (
				children
			)}
        </AuthContext.Provider>
    )
}

export {
    AuthContextProvider as default,
    useAuthContext,
}
