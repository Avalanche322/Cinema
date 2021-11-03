import { memo } from 'react';
import { Container } from 'react-bootstrap';
import { FaTelegramPlane, AiFillInstagram, FaFacebookF, SiTiktok } from 'react-icons/all';

const Footer = () => {
	return (
		<footer className="footer py-4 white-50 mt-5">
			<Container fluid="md">
				<div className="footer__top text-center pb-3">
					<div className="footer__socials mb-2">
						<a href="https://web.telegram.org/k/" className="me-3">
							<FaTelegramPlane className="footer__social link-color opacity-50"/>
						</a>
						<a href="https://www.instagram.com/" className="me-3">
							<AiFillInstagram className="footer__social link-color opacity-50"/>
						</a>
						<a href="https://www.facebook.com/" className="me-3">
							<FaFacebookF className="footer__social link-color opacity-50"/>
						</a>
						<a href="https://www.tiktok.com/uk-UA/">
							<SiTiktok className="footer__social link-color opacity-50"/>
						</a>
					</div>
					<p className="white-60">We are always ready to help you</p>
					<a 
						href="mailto:cinema@gmail.com" 
						className="white-70 footer__question-link link-color">
						You can write your question or proposition
					</a>
					<div></div>
				</div>
				<div className="footer__bottom d-flex justify-content-between align-items-sm-center mt-3 flex-sm-row flex-column">
					<div className="footer__copiring me-3">
						<p>© 2021, <a href="/" className="white-50 link-color">Cinema</a>, may contain information not intended for minors</p>
						<p>LLC "Cinema", location address: 103 Generala Chuprynky Street, Lviv, Lviv Region, Ukraine, 79057</p>
						<p>Address for user inquiries: <a href="mailto:cinema@gmail.com" className="white-50 link-color">cinema@gmail.com</a></p>
						<div>
							<a href="/" className="me-3 white-50 link-color">Agreement</a>
							<a href="/" className="white-50 link-color">Reference</a>
						</div>
					</div>
					<div className="footer__company mt-sm-0 mt-3">
						<span>Company project <a 
								className="footer__company-link white-50 link-color"
								rel="noreferrer"
								href="https://avalanche322.github.io/Personal-Portfolio/" 
								target="_blank">
								Avalanche
							</a>
						</span>
					</div>
				</div>
			</Container>
		</footer>
	);
}
 
export default memo(Footer);