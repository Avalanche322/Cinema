import {Button} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profileImg from '../../img/user.svg'
import { removeAvatar, uploadAvatar } from "../../redux/actions";
import useIsProviderUser from "../../customHooks/useIsProviderUser";

const Profile = () => {
	const currentUser = useSelector(state => state.user.user);
	const hiddenFileInput = useRef(null);
	const loading = useSelector(state => state.app.loading);
	const [isUploadPhoto, setIsUploadPhoto] = useState(profileImg !== currentUser.photoURL);
	const { isProviderPass } = useIsProviderUser();
	const dispatch = useDispatch();
	useEffect(() => {
		setIsUploadPhoto(profileImg !== currentUser.photoURL);
	},[currentUser.photoURL])
	return (
		<div className="col-xxl-9 col-md-8">
			{/*Photo*/}
			<div className="settings__profile profile-settings">
				<h3 className="settings__title">Current Avatar</h3>
				<div className="mt-3">
					<div className="profile-settings__img">
						<img src={currentUser.photoURL} alt="user avatar" className="rounded-circle" />
					</div>
					<div>
						<div className="mt-3 mb-2">
							<input 
								type="file" 
								accept="image/*" 
								ref={hiddenFileInput} 
								onChange={(event) => dispatch(uploadAvatar(event, currentUser))} 
								hidden/>
							<Button 
								className="settings__btn me-3" 
								onClick={() => hiddenFileInput.current.click()}  
								disabled={loading}>Upload photo</Button>
							{isUploadPhoto &&
								<Button 
								className="settings__btn" 
								onClick={() => dispatch(removeAvatar(currentUser))}
								disabled={loading}>
							Remove photo</Button>}
						</div>
						<span className="profile-settings__subtext">Pick a photo up to 4MB.</span>
					</div>
				</div>
			</div>
			{/*Change email*/}
			<div 
				className="d-flex flex-column align-items-start mt-4 settings__block
				settings__change-email change-email-settings">
				<h3 className="settings__title">Email</h3>
				{!isProviderPass && <p>You have been authenticated with your <strong>Google Account</strong>, 
					if you want to change your email, you need to set a password.
				</p>}
				<input 
					className="mt-2 mb-4 change-email-settings__input-disapbled rounded px-2 py-1 w-100" 
					type="email" 
					placeholder={currentUser.email} 
					disabled 
				/>
				<Button className="settings__btn" disabled={!isProviderPass}>
					<Link className="settings__btn-link" to='/settings/change-email'>Change Email</Link>
				</Button>
			</div>
			{/*Change password*/}
			<div className="mt-4 d-inline-flex flex-column align-items-start">
				<h3 className="settings__title">Change Password</h3>
				<Link to="/forgotPassword" className="settings__link">Forgot your password?</Link>
				<Button className="settings__btn mt-3">
					<Link className="settings__btn-link" to='/settings/change-pass'>Change Password</Link>
				</Button>
			</div>
		</div>
	);
}
 
export default Profile;