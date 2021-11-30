import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "./Settings/Profile";
import Payment from "./Settings/Payment";
import ChangeEmail from "./Settings/ChangeEmail";
import ChangePass from "./Settings/ChangePass";
import DeleteAccount from "./Settings/DeleteAccount";
import Plan from "./Settings/Plan";
import Social from "./Settings/Social";
import { memo } from "react";

const Settings = () => {
	return (
		<section className="settings">
			<Container fluid="md">
				<div className="row gap-3 px-3">
					<aside 
						className="settings__sidebar sidebar-settings rounded-3 p-0 d-flex flex-column
						col-12 col-md-3 col-xxl-2">
						<div className="sidebar-settings__block-title rounded-top px-3 py-md-3 w-100">
							<h2 className="sidebar-settings__title">Settings</h2>
						</div>
						<ul className="sidebar-settings__list list-sidebar-settings px-3 pt-3 pb-md-3 pb-2 d-flex flex-md-column">
							<li className="mb-md-2 me-md-0 me-3">
								<NavLink
									className="list-sidebar-settings__item text-nowrap" 
									to="/settings/profile"
									activeClassName="list-sidebar-settings__item-active"
									>Profile
								</NavLink>
							</li>
							<li className="mb-md-2 me-md-0 me-3">
								<NavLink 
									className="list-sidebar-settings__item text-nowrap" 
									to="/settings/payment"
									activeClassName="list-sidebar-settings__item-active"
									>Payment
								</NavLink>
							</li>
							<li className="mb-md-2 me-md-0 me-3">
								<NavLink 
									className="list-sidebar-settings__item text-nowrap" 
									to="/settings/plan"
									activeClassName="list-sidebar-settings__item-active"
									>Plan
								</NavLink>
							</li>
							<li className="mb-md-2 me-md-0 me-3">
								<NavLink 
									className="list-sidebar-settings__item text-nowrap" 
									to="/settings/social"
									activeClassName="list-sidebar-settings__item-active"
									>Social Settings
								</NavLink>
							</li>
							<li>
								<NavLink 
									className="list-sidebar-settings__item text-nowrap" 
									to="/settings/delete-account"
									activeClassName="list-sidebar-settings__item-active"
									>Delete Account
								</NavLink>
							</li>
						</ul>
					</aside>
					<PrivateRoute path="/settings/profile" component={Profile} />
					<PrivateRoute path="/settings/payment" component={Payment} />
					<PrivateRoute path="/settings/plan" component={Plan} />
					<PrivateRoute path="/settings/change-email" component={ChangeEmail} />
					<PrivateRoute path="/settings/change-pass" component={ChangePass} />
					<PrivateRoute path="/settings/delete-account" component={DeleteAccount} />
					<PrivateRoute path="/settings/social" component={Social} />
				</div>
			</Container>
		</section>
	);
}
 
export default memo(Settings);