import './index.scss';
function Header() {
    return (
        <div>
            <div className="header_area">
                            <div className="logo floatleft">
                                <a href="#">
                                    <img src="images/logo.png" alt="" />
                                </a>
                            </div>
                            <div className="top_menu floatleft">
                                <ul>
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">About</a>
                                    </li>
                                    <li>
                                        <a href="#">Contact us</a>
                                    </li>
                                    <li>
                                        <a href="#">Login</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="social_plus_search floatright">
                                <div className="social">
                                    <ul>
                                        <li>
                                            <a href="#" className="twitter"></a>
                                        </li>
                                        <li>
                                            <a href="#" className="facebook"></a>
                                        </li>
                                        <li>
                                            <a href="#" className="feed"></a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="search">
                                    <form action="#" method="post" id="search_form">
                                        <input type="text" value="Search news" id="s" />
                                        <button className="" type="submit" id="searchform" value="search">Search</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="main_menu_area">
                            <ul id="nav">
                                <li>
                                    <a href="#">world news</a>
                                    <ul>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                            <ul>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">sports</a>
                                </li>
                                <li>
                                    <a href="#">tech</a>
                                    <ul>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">business</a>
                                </li>
                                <li>
                                    <a href="#">Movies</a>
                                    <ul>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                            <ul>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                                <li>
                                                    <a href="#">Single item</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">entertainment</a>
                                </li>
                                <li>
                                    <a href="#">culture</a>
                                </li>
                                <li>
                                    <a href="#">Books</a>
                                    <ul>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                        <li>
                                            <a href="#">Single item</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#"> classNameifieds</a>
                                </li>
                                <li>
                                    <a href="#">blogs</a>
                                </li>
                            </ul>
                        </div>
        </div>
    );
}

export default Header;
