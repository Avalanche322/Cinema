import { useSelector } from "react-redux";
import { Alert, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import { memo, useState } from "react";
import { BiHide, BiShow } from 'react-icons/all'
import { useDispatch } from "react-redux";
import { changeEmail } from "../../redux/actions";

const ChangeEmail = () => {
	const message = useSelector(state => state.app.message);
	const user = useSelector(state => state.user.user);
	const loading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isShowPassword, setIsShowPassword] = useState('');
	function handleSubmit(e){
		e.preventDefault();
		dispatch(changeEmail(user, password, email));
		setIsShowPassword('');
		setPassword('');
	}
	return (
		<div className="col-xxl-9 col-md-8">
			<h3>Change Email</h3>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
			<Form className="mt-3 settings__block" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="old-password">
					<Form.Label>New Email</Form.Label>
						<Form.Control 
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="new email" 
						/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="new-password">
					<Form.Label>Current password</Form.Label>
					<InputGroup>
						<Form.Control 
							type={isShowPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="new password" 
						/>
						<Button
							className="settings__input-btn"
							onClick={() => setIsShowPassword(!isShowPassword)}>
							{isShowPassword ? <BiHide/> : <BiShow/>}
						</Button>
					</InputGroup>
				</Form.Group>
				<Button
					className="settings__btn"
					type="submit"
					disabled={loading || !email || !password}
					>Submit {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
				</Button>
			</Form>
		</div>
	);
}
 
export default memo(ChangeEmail);