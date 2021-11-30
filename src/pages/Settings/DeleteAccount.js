import { memo, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { BiHide, BiShow } from 'react-icons/all';
import { deleteAccount } from "../../redux/actions";
import useIsProviderUser from "../../customHooks/useIsProviderUser";

const DeleteAccount = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user.user);
	const loading = useSelector(state => state.app.loading);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const { isProviderPass } = useIsProviderUser();
	function handleSubmit(e){
		e.preventDefault();
		dispatch(deleteAccount(user, password));
		setPassword('');
	}
	return (
		<Form className="col-xxl-9 col-md-8" onSubmit={handleSubmit}>
			<h3 className="settings__title">Delete Account</h3>
			<div className="settings__block">
				<p>You've just entered the danger zone! If you would like to continue and remove your account, you can do so by entering your password below and confirming the prompts.</p>
				{!isProviderPass && <p className="mt-2">You have been authenticated with your <strong>Google Account</strong>, 
					if you want to change your email, you need to set a password.
				</p>}
				<Form.Group className="my-3" controlId="old-password">
					<Form.Label>Current Password</Form.Label>
					<InputGroup>
						<Form.Control
							type={isShowPassword ? 'text' : 'password'}
							value={password}
							placeholder="Enter your current password"
							onChange={(e) => setPassword(e.target.value)} />
						<Button
							className="settings__input-btn"
							onClick={() => setIsShowPassword(!isShowPassword)}>
							{isShowPassword ? <BiHide/> : <BiShow/>}
						</Button>
					</InputGroup>
				</Form.Group>
				<Button 
					className="settings__btn mt-2" 
					type="submit" 
					disabled={loading || !password || !isProviderPass}
				>Delete Account {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}</Button>
			</div>
		</Form>
	);
}
 
export default memo(DeleteAccount);