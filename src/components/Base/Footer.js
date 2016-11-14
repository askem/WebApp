import React from 'react';

const Footer = () => (
	<footer>
		<div className="copyright">
	    	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
				Copyright &copy; 2016 Askem Inc.&nbsp;&nbsp;•&nbsp;&nbsp;All rights reserved&nbsp;&nbsp;•&nbsp;&nbsp;<a href="https://askem.com/privacy">Privacy Policy</a>
			</div>
	        <div className="social col-lg-6 col-md-6 col-sm-12 col-xs-12">
	            <ul className="social_links">
	               {/*<li><a href="#"><i className="fa fa-facebook"></i></a></li>
	                <li><a href="#"><i className="fa fa-twitter"></i></a></li>*/}
					<li><a href="https://www.linkedin.com/company/2855667"><i className="fa fa-linkedin"></i></a></li>
				</ul>
			</div>
		</div>
	</footer>
);
	
export default Footer;