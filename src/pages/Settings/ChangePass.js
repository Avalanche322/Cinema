import {Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiShow, BiHide } from 'react-icons/all';
import { changePassword, showError } from '../../redux/actions';
import useIsProviderUser from '../../customHooks/useIsProviderUser';

const ChangePass = () => {
	const user = useSelector(state => state.user.user);
	const message = useSelector(state => state.app.message);
	const loading = useSelector(state => state.app.loading);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const [isShowPasswordOld, setIsShowPasswordOld] = useState(false);
	const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
	const [isShowPasswordConft, setIsShowPasswordConft] = useState(false);
	const { isProviderPass } = useIsProviderUser(user);
	const dispatch = useDispatch();
	function handleSubmit(e){
		e.preventDefault();
		if(newPassword !== newPasswordConfirm){
			dispatch(showError("You confirmation password doesn't match your new password. Please try again."))
		} else if(!(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newPassword))){
			dispatch(showError("password must be at least 8 characters long contain a number and an uppercase letter"))
		} else{
			dispatch(changePassword(user, isProviderPass, oldPassword, newPassword));
			setOldPassword('');
			setNewPassword('');
			setNewPasswordConfirm('');
		}
	}
	return (
		<div className="col-xxl-9 col-md-8">
			<h3>Change Password</h3>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
			<Form className="mt-3 settings__block" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="old-password">
					<Form.Label>Old password</Form.Label>
					<InputGroup>
						<Form.Control 
							type={isShowPasswordOld ? 'text' : 'password'}
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							placeholder="old password" 
						/>
						<Button
							className="settings__input-btn"
							onClick={() => setIsShowPasswordOld(!isShowPasswordOld)}>
							{isShowPasswordOld ? <BiHide/> : <BiShow/>}
						</Button>
					</InputGroup>
					<Form.Text className="text-muted">
						If you don't have password, you can write your new password.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="new-password">
					<Form.Label>New password</Form.Label>
					<InputGroup>
						<Form.Control 
							type={isShowPasswordNew ? 'text' : 'password'}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="new password" 
						/>
						<Button
							className="settings__input-btn"
							onClick={() => setIsShowPasswordNew(!isShowPasswordNew)}>
							{isShowPasswordNew ? <BiHide/> : <BiShow/>}
						</Button>
					</InputGroup>
				</Form.Group>
				<Form.Group className="mb-3" controlId="repeat-password">
					<Form.Label>Repeat new password</Form.Label>
					<InputGroup>
						<Form.Control 
							type={isShowPasswordConft ? 'text' : 'password'}
							value={newPasswordConfirm}
							onChange={(e) => setNewPasswordConfirm(e.target.value)}
							placeholder="repeat new password" 
						/>
						<Button
							className="settings__input-btn"
							onClick={() => setIsShowPasswordConft(!isShowPasswordConft)}>
							{isShowPasswordConft ? <BiHide/> : <BiShow/>}
						</Button>
					</InputGroup>
				</Form.Group>
				<Button 
					className="settings__btn" 
					type="submit" 
					disabled={loading || !oldPassword || !newPassword || !newPasswordConfirm}
					>Submit {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
				</Button>
			</Form>
		</div>
	);
}
 
export default ChangePass;