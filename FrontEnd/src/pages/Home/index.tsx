import Footer from '../Footer';
import Header from '../Header';
import './home.module.scss';
import './index.scss';

function Home() {
    return (
        <div className="container">
            <div className="">
                <div className="body_wrapper">
                    <div className="center">
                        <Header></Header>
                        <div className="slider_area">
                            <div className="slider">
                                <ul className="bxslider">
                                    <li>
                                        <img src="https://wallpapercave.com/wp/wp5869650.jpg" alt="" title="Slider caption text" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="content_area">
                            <div className="main_content floatleft">
                                <div className="left_coloum floatleft">
                                    <div className="single_left_coloum_wrapper">
                                        <h2 className="title">FROM AROUND THE WORLD</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                    </div>
                                    <div className="single_left_coloum_wrapper">
                                        <h2 className="title">Latest Articles</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                        <div className="single_left_coloum floatleft">
                                            {' '}
                                            <img src="images/single_featured.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet, consectetur</h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor eu mattis.
                                            </p>
                                            <a className="readmore" href="#">
                                                read more
                                            </a>{' '}
                                        </div>
                                    </div>
                                    <div className="single_left_coloum_wrapper gallery">
                                        <h2 className="title">gallery</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                        <img src="images/single_featured.png" alt="" />{' '}
                                    </div>
                                    <div className="single_left_coloum_wrapper single_cat_left">
                                        <h2 className="title">tech news</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <div className="single_cat_left_content floatleft">
                                            <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit </h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor ...interdum
                                            </p>
                                            <p className="single_cat_left_content_meta">
                                                by <span>John Doe</span> | 29 comments
                                            </p>
                                        </div>
                                        <div className="single_cat_left_content floatleft">
                                            <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit </h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor ...interdum
                                            </p>
                                            <p className="single_cat_left_content_meta">
                                                by <span>John Doe</span> | 29 comments
                                            </p>
                                        </div>
                                        <div className="single_cat_left_content floatleft">
                                            <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit </h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor ...interdum
                                            </p>
                                            <p className="single_cat_left_content_meta">
                                                by <span>John Doe</span> | 29 comments
                                            </p>
                                        </div>
                                        <div className="single_cat_left_content floatleft">
                                            <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit </h3>
                                            <p>
                                                Nulla quis lorem neque, mattis venenatis lectus. In interdum ullamcorper
                                                dolor ...interdum
                                            </p>
                                            <p className="single_cat_left_content_meta">
                                                by <span>John Doe</span> | 29 comments
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="right_coloum floatright">
                                    <div className="single_right_coloum">
                                        <h2 className="title">from the desk</h2>
                                        <ul>
                                            <li>
                                                <div className="single_cat_right_content">
                                                    <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit</h3>
                                                    <p>
                                                        Nulla quis lorem neque, mattis venen atis lectus. In interdum
                                                        ull amcorper dolor eu mattis.
                                                    </p>
                                                    <p className="single_cat_right_content_meta">
                                                        <a href="#">
                                                            <span>read more</span>
                                                        </a>{' '}
                                                        3 hours ago
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_cat_right_content">
                                                    <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit</h3>
                                                    <p>
                                                        Nulla quis lorem neque, mattis venen atis lectus. In interdum
                                                        ull amcorper dolor eu mattis.
                                                    </p>
                                                    <p className="single_cat_right_content_meta">
                                                        <a href="#">
                                                            <span>read more</span>
                                                        </a>{' '}
                                                        3 hours ago
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_cat_right_content">
                                                    <h3>Lorem ipsum dolor sit amet conse ctetur adipiscing elit</h3>
                                                    <p>
                                                        Nulla quis lorem neque, mattis venen atis lectus. In interdum
                                                        ull amcorper dolor eu mattis.
                                                    </p>
                                                    <p className="single_cat_right_content_meta">
                                                        <a href="#">
                                                            <span>read more</span>
                                                        </a>{' '}
                                                        3 hours ago
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                        <a className="popular_more" href="#">
                                            more
                                        </a>{' '}
                                    </div>
                                    <div className="single_right_coloum">
                                        <h2 className="title">editorial</h2>
                                        <div className="single_cat_right_content editorial">
                                            {' '}
                                            <img src="images/editorial_img.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet con se cte tur adipiscing elit</h3>
                                        </div>
                                        <div className="single_cat_right_content editorial">
                                            {' '}
                                            <img src="images/editorial_img.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet con se cte tur adipiscing elit</h3>
                                        </div>
                                        <div className="single_cat_right_content editorial">
                                            {' '}
                                            <img src="images/editorial_img.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet con se cte tur adipiscing elit</h3>
                                        </div>
                                        <div className="single_cat_right_content editorial">
                                            {' '}
                                            <img src="images/editorial_img.png" alt="" />
                                            <h3>Lorem ipsum dolor sit amet con se cte tur adipiscing elit</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar floatright">
                                <div className="single_sidebar">
                                    {' '}
                                    <img src="images/add1.png" alt="" />{' '}
                                </div>
                                <div className="single_sidebar">
                                    <div className="news-letter">
                                        <h2>Sign Up for Newsletter</h2>
                                        <p>Sign up to receive our free newsletters!</p>
                                        <form action="#" method="post">
                                            <input type="text" value="Name" id="name" />
                                            <input type="text" value="Email Address" id="email" />
                                            <input type="submit" value="SUBMIT" id="form-submit" />
                                        </form>
                                        <p className="news-letter-privacy">We do not spam. We value your privacy!</p>
                                    </div>
                                </div>
                                <div className="single_sidebar">
                                    <div className="popular">
                                        <h2 className="title">Popular</h2>
                                        <ul>
                                            <li>
                                                <div className="single_popular">
                                                    <p>Sept 24th 2045</p>
                                                    <h3>
                                                        Lorem ipsum dolor sit amet conse ctetur adipiscing elit{' '}
                                                        <a href="#" className="readmore">
                                                            Read More
                                                        </a>
                                                    </h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_popular">
                                                    <p>Sept 24th 2045</p>
                                                    <h3>
                                                        Lorem ipsum dolor sit amet conse ctetur adipiscing elit{' '}
                                                        <a href="#" className="readmore">
                                                            Read More
                                                        </a>
                                                    </h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_popular">
                                                    <p>Sept 24th 2045</p>
                                                    <h3>
                                                        Lorem ipsum dolor sit amet conse ctetur adipiscing elit{' '}
                                                        <a href="#" className="readmore">
                                                            Read More
                                                        </a>
                                                    </h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_popular">
                                                    <p>Sept 24th 2045</p>
                                                    <h3>
                                                        Lorem ipsum dolor sit amet conse ctetur adipiscing elit{' '}
                                                        <a href="#" className="readmore">
                                                            Read More
                                                        </a>
                                                    </h3>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="single_popular">
                                                    <p>Sept 24th 2045</p>
                                                    <h3>
                                                        Lorem ipsum dolor sit amet conse ctetur adipiscing elit{' '}
                                                        <a href="#" className="readmore">
                                                            Read More
                                                        </a>
                                                    </h3>
                                                </div>
                                            </li>
                                        </ul>
                                        <a className="popular_more">more</a>{' '}
                                    </div>
                                </div>
                                <div className="single_sidebar">
                                    {' '}
                                    <img src="images/add1.png" alt="" />{' '}
                                </div>
                                <div className="single_sidebar">
                                    <h2 className="title">ADD</h2>
                                    <img src="images/add2.png" alt="" />{' '}
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
