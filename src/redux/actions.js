import { 
	INIT_USER, 
	CHANGE_USER_SETTINGS, 
	SHOW_LOADER, 
	HIDE_LOADER, 
	SHOW_ERROR, 
	HIDE_ERROR,
	FETCH_MOVIES_SEARCH, 
	SHOW_BG_LOADER,
	HIDE_BG_LOADER,
	UPLOAD_MOVIES_FAVORITE,
	REMOVE_MOVIES_FAVORITE,
	FETCH_TV_SEASONS,
	RERENDER_COMPONENT,
	HIDE_MESSAGE,
	SHOW_MESSAGE,
	FETCH_CONTENT_SEARCH_LIST,
	CLEAR_CONTENT_SEARCH_LIST,
	UPLOAD_PLANS,
} from "./types";
import firebase from "../firebase";
import profileImg from '../img/user.svg';
import { history } from "../helpers/history";

/*App function*/
export function hideError(){
	return {
		type: HIDE_ERROR
	}
}
export function showError(text){
	return dispatch => {
		dispatch({
			type: SHOW_ERROR, 
			payload: text
		})
	}
}
export function hideMessage(){
	return {
		type: HIDE_MESSAGE
	}
}
export function showMessage(text){
	return dispatch => {
		dispatch({
			type: SHOW_MESSAGE, 
			payload: text
		})
	}
}
/*reauthenticate function*/
async function reauthenticate(user, currentPassword){
	let cred =  firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
	return user.reauthenticateWithCredential(cred)
}

/*Auntification function*/
export function singup(email,password){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await u.user.updateProfile({
				photoURL: profileImg
			});
			dispatch({type: INIT_USER, payload: u.user});
			dispatch(changeSettings({sing_in: true}));
			history.push('/sing-up/platform');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function singInWithGoogle(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
			dispatch({type: INIT_USER, payload: u.user});
			dispatch(changeSettings({sing_in: true}));
			if (u.additionalUserInfo.isNewUser) {
				history.push('/sing-up/platform');
			} else{
				dispatch(hasImportantSettings(u.user, '/'));
			}	
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function logout(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await firebase.auth().signOut();
			history.push('/prevue');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function singin(email,password){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const u = await firebase.auth().signInWithEmailAndPassword(email, password);
			dispatch({type: INIT_USER, payload: u.user});
			dispatch(changeSettings({sing_in: true}));
			dispatch(hasImportantSettings(u.user, '/'));
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function handelPaymentCard(settings, user, path){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.update(settings);
			delete settings.card;
			localStorage.setItem('settings', JSON.stringify(settings));
			dispatch({type: CHANGE_USER_SETTINGS, payload: settings});
			dispatch(changeSettings({sing_in: true}));
			dispatch(hasImportantSettings(user, path));
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*Avatar User function*/
export function removeAvatar(user){
	return async dispatch => {
		try {
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const ref = firebase.storage().ref(user.uid)
			await ref.getDownloadURL()
			let desertRef = firebase.storage().refFromURL(user.photoURL);
			await desertRef.delete();
			dispatch({type: INIT_USER, payload: user});
			localStorage.setItem('user', JSON.stringify(user));
			await user.updateProfile({
				photoURL: profileImg
			})
			dispatch({type: HIDE_LOADER});
			dispatch({type: RERENDER_COMPONENT, payload: {}})
		} catch(e){
			if(e.code !== 'storage/object-not-found'){
				dispatch(showError(e.message) );
				dispatch({type: HIDE_LOADER});
			}
		} 
	}
}
export function uploadAvatar(event, user){
	return async dispatch => {
		if(event.target.files[0].size <= 4194304){
			try{
				dispatch({type: HIDE_ERROR});
				dispatch({type: SHOW_LOADER});
				const img = event.target.files[0];
				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child(user.uid);
				await fileRef.put(img);
				localStorage.setItem('user', JSON.stringify(user));
				dispatch({type: INIT_USER, payload: user});
				await user.updateProfile({
					photoURL: await fileRef.getDownloadURL()
				})
				dispatch({type: RERENDER_COMPONENT, payload: {}})
				dispatch({type: HIDE_LOADER});
			} catch(e){
				dispatch(showError(e.message) );
				dispatch({type: HIDE_LOADER});
			}
		} else {
			dispatch(showError('image must be lower 4 MB') );
		}
	}
}
/*Email, Password function*/
export function resetPassword(email){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await firebase.auth().sendPasswordResetEmail(email);
			dispatch(showMessage("Check your inbox for further instructions"));
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function deleteAccount(user, currentPassword){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await reauthenticate(user, currentPassword);
			dispatch(removeAvatar(user));
			await firebase.database().ref(`users/${user.uid}`).remove();
			await user.delete();
			history.push('/prevue');
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function changePassword(user, isProviderPass, currentPassword, newPassword){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			if(!isProviderPass){
				await firebase.auth().currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
				const u = await user.linkWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, newPassword))
				dispatch({type: INIT_USER, payload: u.user});
			}	
			else{
				await reauthenticate(user,currentPassword);
				await user.updatePassword(newPassword);
			}
			dispatch(showMessage("Successful password change"));
			dispatch({type: HIDE_LOADER});
			setTimeout(() => {
				dispatch(hideMessage());
			}, 5000)
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function changeEmail(user, currentPassword, newEmail){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await reauthenticate(user, currentPassword);
			await user.updateEmail(newEmail);
			dispatch(showMessage("Successful email change"));
			dispatch({type: HIDE_LOADER});
			setTimeout(() => {
				dispatch(hideMessage());
			}, 5000)
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*Link, Unlinke Social*/
export function unlinkGoogle(user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			await user.unlink('google.com');
			dispatch({type: INIT_USER, payload: user});
			dispatch(showMessage("You successfully disconnect to Google"));
			dispatch({type: HIDE_LOADER});
			setTimeout(() => {
				dispatch(hideMessage());
			}, 5000)
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function LinkInGoogle(user){	
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			let provider = new firebase.auth.GoogleAuthProvider();
			await firebase.auth().currentUser.linkWithPopup(provider);
			dispatch({type: INIT_USER, payload: user});
			dispatch(showMessage("You successfully connect to Google"));
			dispatch({type: HIDE_LOADER});
			setTimeout(() => {
				dispatch(hideMessage());
			}, 5000)
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*Settings function*/
export function uploadSettings(settings, user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.update(settings);
			delete settings.card;
			localStorage.setItem('settings', JSON.stringify(settings));
			dispatch({type: CHANGE_USER_SETTINGS, payload: settings});
			dispatch(showMessage("Your settings change success"));
			dispatch({type: HIDE_LOADER});
			setTimeout(() => {
				dispatch(hideMessage());
			}, 5000)
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function changeSettings(state){
	return dispatch => {
		const settings = {...JSON.parse(localStorage.getItem('settings')), ...state};
		dispatch({type: CHANGE_USER_SETTINGS, payload: settings});
		localStorage.setItem('settings', JSON.stringify(settings));
	}
}
function hasImportantSettings(user, path){
	return async dispatch => {
		try{
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.once('value', (snapshot) => {
				const settingsVal = snapshot.val();
				const importentSettings = {};
				if(settingsVal){
					if(!!settingsVal.card){
						importentSettings.has_card = true;
					}
					if(!!settingsVal.plan){
						importentSettings.has_plan = true;
					}
					dispatch(changeSettings(importentSettings));
					if(!!settingsVal.card && !!settingsVal.plan){
						history.push(path);
					}
				} else{
					history.push('/prevue')
				}
			})
		} catch(e){
			dispatch(showError(e.message) );
		}
	}
}
/*Upload Plans*/
export function uploadPlans(){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const plansRef = firebase.database().ref(`plans`);
			await plansRef.once('value', (snapshot) => {
				const plansVal = snapshot.val();
				const arrPlans = [];
				for (const id in plansVal) {
					arrPlans.push({...plansVal[id]});
				}
				arrPlans.sort((a , b) => a.id - b.id)
				dispatch({type: UPLOAD_PLANS, payload: arrPlans});
			})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
/*Content function*/
export function uploadFavorite(movie, user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`).child(movie.id);
			await favoriteRef.set({id: movie.id});
			//movie.db_id = insertData.key;
			dispatch({type: UPLOAD_MOVIES_FAVORITE, payload: [movie]});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function removeFavorite(movie, user){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`).child(movie.id);
			await favoriteRef.remove();
			dispatch({type: REMOVE_MOVIES_FAVORITE, payload: movie});
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function fetchMovies(categoryUrl, page){
	return async (dispatch, getState) => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			let selectedContent = {};
			const contents = getState().contents.contents;
			for (const key in contents) {
				if (Object.hasOwnProperty.call(contents, key)) {
					if(contents[key].categoryUrl === categoryUrl){
					selectedContent = contents[key];
				}
				}
			}
			const movies = await fetch(`https://api.themoviedb.org/3/${selectedContent.typeContent}/${selectedContent.category}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=${page}`);
			const moviesData = await movies.json();
			dispatch({type: selectedContent.type, payload: moviesData.results });
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function searchMovieById(id, typeContent){
	return async dispatch =>{
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const search = await fetch(`https://api.themoviedb.org/3/${typeContent}/${id}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US`);
			const searchsData = await search.json();
			dispatch({type: FETCH_MOVIES_SEARCH, payload: searchsData})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}
export function searchSeasonsById(id, season_number = 1){
	return async dispatch =>{
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			let arrSeasons = [];
			for (let i = 1; i <= season_number; i++) {
				const search = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US`);
				arrSeasons.push(await search.json())
			}
			dispatch({type: FETCH_TV_SEASONS, payload: arrSeasons})
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}
export function searchContentsByName(title, page){
	return async dispatch => {
		try{
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_LOADER});
			const movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=${page}&query=${title}`);
			const tv = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=${page}&query=${title}`);
			const moviesData = await movies.json();
			const tvData = await tv.json();
			const content = [...moviesData.results, ...tvData.results];
			dispatch({type: FETCH_CONTENT_SEARCH_LIST, payload: content });
			dispatch({type: HIDE_LOADER});
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_LOADER});
		}
	}
}
export function clearSearchContentsByName(){
	return {
		type: CLEAR_CONTENT_SEARCH_LIST
	}
}
/*Fetch Date function*/
function fetchData(user){
	return async (dispatch, getState) => {
		try{
			document.body.classList.add('overflow-hidden');
			// Settings
			dispatch({type: HIDE_ERROR});
			dispatch({type: SHOW_BG_LOADER});
			dispatch({type: SHOW_LOADER});
			const settingsRef = firebase.database().ref(`users/${user.uid}/settings`);
			await settingsRef.once('value', (snapshot) => {
				const settingsVal = snapshot.val();
				if(settingsVal){
					if(!!settingsVal.card){
						settingsVal.has_card = true;
					}
					if(!!settingsVal.plan){
						settingsVal.has_plan = true;
					}
					delete settingsVal.card;
					localStorage.setItem('settings', JSON.stringify(settingsVal));
					dispatch({type: CHANGE_USER_SETTINGS, payload: settingsVal});
				}
			})
			// Movies
			const contents = getState().contents.contents;
			let movies = '';
			let moviesData = '';
			for (const key in contents) {
				if (Object.hasOwnProperty.call(contents, key)) {
					movies = await fetch(`https://api.themoviedb.org/3/${contents[key].typeContent}/${contents[key].category}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=1`);
					moviesData = await movies.json();
					dispatch({type: contents[key].type, payload: moviesData.results });
				}
			}
			// Favorite
			const favoriteRef = firebase.database().ref(`users/${user.uid}/favorite`);
			await favoriteRef.once('value', async (snapshot) => {
				const favorites = snapshot.val();
				let movie = {};
				if(favorites){
					const favoriteAll = [];
					for (const id in favorites) {
						movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_CINEMA_API_KEY}&language=en-US&page=1`);
						moviesData = await movie.json();
						favoriteAll.push(moviesData);
						console.log(favoriteAll);
					}
					dispatch({type: UPLOAD_MOVIES_FAVORITE, payload: favoriteAll});
				}
			})
			dispatch({type: HIDE_BG_LOADER});
			dispatch({type: HIDE_LOADER});
			document.body.classList.remove('overflow-hidden');
		} catch(e){
			dispatch(showError(e.message) );
			dispatch({type: HIDE_BG_LOADER});
			document.body.classList.remove('overflow-hidden');
		}
	}
}
/* Unsubscribe function*/
export function unsubscribe() {
	return async dispatch => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if(user){
				dispatch({type: INIT_USER, payload: user});
				localStorage.setItem('user', JSON.stringify(user)); // set local user
				dispatch(fetchData(user));
			} else{
				dispatch({type: INIT_USER, payload: {}});
				dispatch({type: CHANGE_USER_SETTINGS, payload: {}});
				localStorage.removeItem('user');
				localStorage.removeItem('settings');
				dispatch({type: HIDE_BG_LOADER});
				dispatch({type: HIDE_LOADER});
				document.body.classList.remove('overflow-hidden');
			}
		})
	}
}