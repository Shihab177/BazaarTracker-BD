import React, { useEffect, useState } from 'react';
import { AuthContext } from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email,password)=>{
          setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout =()=>{
        setLoading(true)
        return signOut(auth)
    }
    const signInWithGoogle = ()=>{
        setLoading((true))
        return signInWithPopup(auth,googleProvider)
    }
    const updateUserProfile= profileInfo =>{
        return updateProfile(auth.currentUser,profileInfo)
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth ,currentUser =>{
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo ={
     createUser,
     signIn,
     user,
     loading,
     logout,
     signInWithGoogle,
     updateUserProfile
    }
    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;