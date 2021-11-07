import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useIsProviderUser = () => {
	const [isProviderPass, setIsProviderPass] = useState(false);
	const [isProviderGoogle, setIsProviderGoogle] = useState(false);
	const user = useSelector(state => state.user.user);
	useEffect(() => {
		if(user.providerData){
			function isGoogleProvieder(){
				for (const i of user.providerData) {
					if(i.providerId === "google.com"){
						setIsProviderGoogle(true);
						return
					}
				}
				setIsProviderGoogle(false);
			}
			function isPassProvider(){
				for (const i of user.providerData) {
					if(i.providerId === "password"){
						setIsProviderPass(true);
						return
					}
				}
				setIsProviderGoogle(false);
			}
			isGoogleProvieder();
			isPassProvider();
		}
	}, [user.providerData])
	return {
		isProviderPass,
		isProviderGoogle
	}
}
 
export default useIsProviderUser;