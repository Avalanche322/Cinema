import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Alert, InputGroup, Spinner, Container } from "react-bootstrap";
import { BiChevronLeft, BiHide, BiShow, FcGoogle } from "react-icons/all";
import fullLogo from '../img/full-logo.png';
import banner from "../img/banner.webp";
import { useDispatch, useSelector } from "react-redux";
import { singin, singInWithGoogle } from "../redux/actions";
import { memo } from "react";

const SingIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const dispatch = useDispatch();
	const loading = useSelector(state => state.app.loading);
	const error = useSelector(state => state.app.error);
	useEffect(() => {
		// title for page
		document.title = "Sig In | Cinema HD"
	}, [])
	function handleSubmit(e){
		e.preventDefault();
		dispatch(singin(email,password));
	}
	function handleSubmitWithGoogle(){
		dispatch(singInWithGoogle());
	}
	function handlerInputEmail (e){
		setEmail(e.target.value);
	}
	function handlerInputPass (e){
		setPassword(e.target.value);
	}
	const back = e => {
		e.stopPropagation();
		history.push('/prevue');
	};
	return (
		<Container fluid='md'>
			<div className="authentication sing-in min-vh-100 d-flex justify-content-center align-items-center">
				<div className="authentication__body p-4 rounded-3 position-relative">
					<div className="mb-4">
						<div className="d-flex">
							<img className="authentication__logo pb-1" src={fullLogo} alt="logo" />
						</div>
						<h2 className="authentication__title title">Sing In</h2>
						{error && <Alert className="p-2" variant="warning">{error}</Alert>}
					</div>
					<Button
						variant='light' 
						className="authentication__btn-social w-100 d-flex align-items-center justify-content-center" 
						onClick={handleSubmitWithGoogle.bind()}
						disabled={loading}>
						<FcGoogle className="me-2"/> Continue with Google
					</Button>
					<div className="mt-3 text-center">
						<span>OR</span>
					</div>
					<Form onSubmit={handleSubmit} className="mb-3">
						<Form.Group className="mb-2" controlId="email">
							<Form.Label>Email address</Form.Label>
							<Form.Control 
								type="email" 
								placeholder="Enter email" 
								onChange={handlerInputEmail}
								disabled={loading} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<InputGroup>
								<Form.Control 
									type={isShowPassword ? 'text' : 'password'} 
									placeholder="Password" 
									onChange={handlerInputPass}
									disabled={loading} />
								<Button 
									className="btn-addons" 
									onClick={() => setIsShowPassword(!isShowPassword)}
									disabled={loading}
								>
									{isShowPassword ? <BiHide /> : <BiShow/>}
								</Button>
							</InputGroup>
						</Form.Group>
						<Button className="authentication__btn w-100" type="submit" disabled={loading}>
							Sing In {loading ? <Spinner as='span' size="sm" animation="border" variant="light"/> : null}
						</Button>
					</Form>
					<p className="text-center">Need an account?
						<Link 
							to="/sing-up" 
							className={`authentication__link white-60  ${loading ? 'disabled-link' : ''}`}
						> Sing Up</Link>
					</p>
					<p className="text-center">
						<Link 
							to="/forgotPassword" 
							className={`authentication__link white-60  ${loading ? 'disabled-link' : ''}`}
						>Forgot your password?</Link>
					</p>
					<BiChevronLeft 
						onClick={back} 
						className={`authentication__back position-absolute top-50 rounded-circle ${loading ? 'disabled-link' : ''}`}
					/>
				</div>
				<div className="_ibg position-absolute h-100 w-100 top-0 start-0">
					<img src={banner} className="h-100 w-100" alt="banner" />
					<div className="_ibg__shadow position-absolute w-100 h-100 top-0 start-0"></div>
				</div>
			</div>
		</Container>
	);
}
 
export default memo(SingIn);