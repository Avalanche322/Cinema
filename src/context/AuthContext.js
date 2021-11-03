import React, { useContext, useEffect, useState } from 'react';
import firebase from "../firebase"
import profileImg from '../img/user.svg';

const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}

export function AuthProvider ({children}){
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('User')));	
	const [loading, setLoading] = useState(true);
	const [googleAccount, setGoogleAccount] = useState();
	function isProviderGoogle(){
		for (const i of currentUser.providerData) {
			if(i.providerId === "google.com"){
				setGoogleAccount(i);
				return true
			}
		}
		return false
	}
	function isProviderPasswordUser(){
		for (const i of currentUser.providerData) {
			if(i.providerId === "password"){
				return true
			}
		}
		return false
	}
	async function reauthenticate(currentPassword){
		let cred =  firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
		return currentUser.reauthenticateWithCredential(cred)
	}
	async function unlinkGoogle(){
		for (const i of currentUser.providerData) {
			if(i.providerId === "google.com"){
				await currentUser.unlink(i.providerId);
				setGoogleAccount(null);
			}
		}
	}
	async function LinkInGoogle(){
		let provider = new firebase.auth.GoogleAuthProvider();
		await firebase.auth().currentUser.linkWithPopup(provider);
	}
	async function singup(email,password){
		const u = await firebase.auth().createUserWithEmailAndPassword(email, password);
		await u.user.updateProfile({
			photoURL: profileImg
		})
	}
	async function singInWithGoogle(){
		await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}
	async function userExists(email){
		try{
			await firebase.auth().getUserByEmail(email);
			return true
		} catch(e){
			return false
		}
	}
	const singin = async (email,password) => await firebase.auth().signInWithEmailAndPassword(email, password);
	const logout = async () => await firebase.auth().signOut();
	const resetPassword = async email => await firebase.auth().sendPasswordResetEmail(email);
	async function changeName(name){
		const user = JSON.parse(localStorage.getItem('User'));
		user.displayName = name;
		localStorage.setItem('User', JSON.stringify(user));
		await currentUser.updateProfile({displayName: name});	
	};
	async function changePassword(currentPassword, newPassword){
		if(!isProviderPasswordUser()){
			await firebase.auth().currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
			const u = await currentUser.linkWithCredential(firebase.auth.EmailAuthProvider.credential(currentUser.email, newPassword))
			setCurrentUser(u.user);
			localStorage.setItem('User', JSON.stringify(u.user))
		}	
		else{
			await reauthenticate(currentPassword);
			await currentUser.updatePassword(newPassword);
		}
	}
	async function deleteAccount(currentPassword){
		await reauthenticate(currentPassword);
		await removeAvatar();
		await currentUser.delete();
		await firebase.database().ref(`users/${currentUser.uid}`).remove();
	}
	async function changeEmail(currentPassword, newEmail){
		await reauthenticate(currentPassword);
		await currentUser.updateEmail(newEmail);
	}
	async function uploadAvatar(img){
		const storageRef = firebase.storage().ref();
		const fileRef = storageRef.child(currentUser.uid);
		await fileRef.put(img);
		const user = JSON.parse(localStorage.getItem('User'));
		user.photoURL = await fileRef.getDownloadURL();
		localStorage.setItem('User', JSON.stringify(user));
		await currentUser.updateProfile({
			photoURL: await fileRef.getDownloadURL()
		})
	}
	async function removeAvatar(){
		const ref = firebase.storage().ref(currentUser.uid)
		try {
			await ref.getDownloadURL()
			let desertRef = firebase.storage().refFromURL(currentUser.photoURL);
			await desertRef.delete();
		} catch(e){}
		finally{
			const user = JSON.parse(localStorage.getItem('User'));
			user.photoURL = profileImg;
			localStorage.setItem('User', JSON.stringify(user));
			await currentUser.updateProfile({
				photoURL: profileImg
			})
		}
	}
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if(user){
				setCurrentUser(user);
				localStorage.setItem('User', JSON.stringify(user)); // set local user
				setLoading(false); // hide loading
			} else{
				setCurrentUser(null);
				localStorage.removeItem('User');
				setLoading(false);
			}
		})
    	return unsubscribe
	// eslint-disable-next-line
  	},[])
	const value={
		currentUser,
		singup,
		singin,
		singInWithGoogle,
		logout,
		resetPassword,
		deleteAccount,
		changeName,
		uploadAvatar,
		removeAvatar,
		changePassword,
		changeEmail,
		LinkInGoogle,
		isProviderPasswordUser,
		isProviderGoogle,
		unlinkGoogle,
		googleAccount,
		userExists
	}
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
