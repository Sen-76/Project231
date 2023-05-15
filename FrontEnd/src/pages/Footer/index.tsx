import './index.scss';
function Footer() {
    return (
        <div>
            <div className="footer_top_area">
                <div className="inner_footer_top">
                    {' '}
                    <img src="https://img5.thuthuatphanmem.vn/uploads/2021/09/22/background-hoat-hinh-de-thuong_094719435.jpg" alt="" />{' '}
                </div>
            </div>
            <div className="footer_bottom_area">
                <div className="footer_menu">
                    <ul id="f_menu">
                        <li>
                            <a href="#">world news</a>
                        </li>
                        <li>
                            <a href="#">sports</a>
                        </li>
                        <li>
                            <a href="#">tech</a>
                        </li>
                        <li>
                            <a href="#">business</a>
                        </li>
                        <li>
                            <a href="#">Movies</a>
                        </li>
                        <li>
                            <a href="#">entertainment</a>
                        </li>
                        <li>
                            <a href="#">culture</a>
                        </li>
                        <li>
                            <a href="#">Books</a>
                        </li>
                        <li>
                            <a href="#"> classNameifieds</a>
                        </li>
                        <li>
                            <a href="#">blogs</a>
                        </li>
                    </ul>
                </div>
                <div className="copyright_text">
                    <p>
                        Copyright &copy; 2045 The News Reporter Inc. All rights reserved | Design by{' '}
                        <a
                            target="_blank"
                            rel="nofollow"
                            href="http://www.graphicsfuel.com/2045/10/wp-magazine-theme-template-psd/"
                        >
                            Rafi MD
                        </a>
                    </p>
                    <p>
                        Trade marks and images used in the design are the copyright of their respective owners and are
                        used for demo purposes only.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
