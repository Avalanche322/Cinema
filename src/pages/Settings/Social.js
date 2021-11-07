import { Button, Alert } from "react-bootstrap";
import { FcGoogle } from 'react-icons/all';
import { useDispatch, useSelector } from "react-redux";
import useIsProviderUser from "../../customHooks/useIsProviderUser";
import { LinkInGoogle, unlinkGoogle } from "../../redux/actions";

const Social = () => {
	const loading = useSelector(state => state.app.loading);
	const user = useSelector(state => state.user.user);
	const message = useSelector(state => state.app.message);
	const { isProviderGoogle, isProviderPass } = useIsProviderUser();
	const dispatch = useDispatch();
	function handelSocialGoogle(){
		if(isProviderGoogle){
			dispatch(unlinkGoogle(user));
		} else{
			dispatch(LinkInGoogle(user));
		}
	}
	return (
		<div className="col-xxl-9 col-md-8 settings__social social-settings">
			<h3 className="settings__title">Social Settings</h3>
			<h4 className="settings__subtitle pb-2 mt-3">Service</h4>
			{message && <Alert variant='success' className="mt-3 settings__block">{message}</Alert>}
			<div className="mt-3">
				{!isProviderPass && isProviderGoogle && 
					<p className="mb-2">You have been authenticated with your <strong>Google Account</strong>, 
						if you want to disconnect Google, you need to set a password.
					</p>
				}
				<Button
					onClick={handelSocialGoogle}
					disabled={loading || !isProviderPass}
					variant="light" 
					className="d-flex align-items-center social-settings__btn"
					><FcGoogle className="me-2"/> {isProviderGoogle ? 'Disconnect Google' : 'Continue with Google'}
				</Button>
			</div>
		</div>
	);
}
 
export default Social;