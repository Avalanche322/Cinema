import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { memo, useState } from 'react';
import { useHistory } from 'react-router';
import banner from '../img/banner.webp';
import fullLogo from '../img/full-logo.png'
import { BiChevronLeft } from 'react-icons/all';
import { resetPassword } from '../redux/actions';

const ForgotPassword = () => {
	const error = useSelector(state => state.app.error);
	const message = useSelector(state => state.app.message);
	const loading = useSelector(state => state.app.loading);
	const [email, setEmail] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	function handleSubmit(event){
		event.preventDefault();
		dispatch(resetPassword(email));
	}
	return (
		<div className="authentication forgot-passoword min-vh-100 d-flex justify-content-center align-items-center">
			<div className="authentication__body p-4 rounded-3 position-relative">
				<div className="mb-4">
					<div className="d-flex">
						<img className="authentication__logo pb-1" src={fullLogo} alt="logo" />
					</div>
					<h2 className="authentication__title title">Resset Password</h2>
					{message && <Alert className="p-2" variant="success">{message}</Alert>}
					{error && <Alert className="p-2" variant="warning">{error}</Alert>}
				</div>
				<Form onSubmit={handleSubmit} className="mb-3">
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email address</Form.Label>
						<Form.Control 
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email" 
						/>
					</Form.Group>
					<Button 
						className="authentication__btn w-100" 
						type="submit" 
						disabled={loading}
					>
						Reset my password
					</Button>
				</Form>
				<BiChevronLeft 
					onClick={() => history.goBack()}
					disabled={loading}
					className={`authentication__back position-absolute top-50 rounded-circle ${loading ? 'disabled-link' : ''}`}
				/>
			</div>
			<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
				<img src={banner} className="h-100 w-100" alt="banner" />
				<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
			</div>
		</div>
	);
}
 
export default memo(ForgotPassword);