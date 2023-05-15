import Footer from '../Footer';
import Header from '../Header';
import './detail.scss';
// import 'bootstrap/4.4.1/css/bootstrap.min.css';
function DashBoard() {
    return (
        <div>
            <div className="container">
                <div className="box_wrapper">
                    <div className="center">
                        <Header></Header>

                        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                            <div className="row">
                                <div className="middle_bar">
                                    <div className="single_post_area">
                                        <h2 className="post_title wow ">Giá xăng dầu hôm nay 15/5: Tiếp tục giảm </h2>
                                        <div>
                                            <b>Author:</b> Mohamed Kuddus Mia
                                        </div>
                                        <div>
                                            <b>Date:</b> Thursday,December 01,2045
                                        </div>

                                        <div className="single_post_content">
                                            <p>
                                                In nec leo vulputate, faucibus arcu eget, tempus neque. Aliquam erat
                                                volutpat. Pellentesque tempus nulla diam, eu laoreet urna imperdiet a.
                                                Sed accumsan diam libero, a vestibulum purus bibendum pellentesque. Sed
                                                elit nunc, malesuada lobortis dui eget, fringilla fringilla nisi.
                                                Vestibulum malesuada dignissim ante nec malesuada. Donec at fermentum
                                                tellus. Etiam nisl enim, consectetur nec nisi eget, hendrerit
                                                sollicitudin neque. Donec ut tincidunt sem. Curabitur faucibus, risus
                                                eget ultrices volutpat, massa dui condimentum neque, non bibendum libero
                                                orci a ante. Sed vulputate sed felis ultrices venenatis. Lorem ipsum
                                                dolor sit amet, consectetur adipiscing elit. Pellentesque sed orci id
                                                ipsum congue pharetra ut sit amet leo. Donec posuere lacus sit amet eros
                                                vestibulum euismod. Etiam sollicitudin nunc quis lectus mollis
                                                adipiscing. Aenean scelerisque tristique viverra.
                                            </p>

                                            <p>
                                                Quisque nec laoreet orci. Praesent eu mauris et nisl sodales dapibus non
                                                sit amet velit. Suspendisse quis auctor ligula. Suspendisse ut orci
                                                aliquam, viverra orci in, cursus velit. Phasellus auctor ipsum felis, at
                                                ultricies sapien commodo sed. Morbi cursus dictum ipsum, vel faucibus
                                                ligula tincidunt vitae. Phasellus vehicula eros quis nunc egestas
                                                vestibulum. Nulla non urna odio. Phasellus faucibus leo ante, in
                                                ultrices odio congue id. Nam molestie gravida ullamcorper. Sed dignissim
                                                volutpat cursus. Duis viverra diam nec arcu viverra, pulvinar faucibus
                                                magna luctus.
                                            </p>
                                        </div>
                                        {/* phân trang */}
                                        <div className="post_footer">
                                            <ul className="post_pager">
                                                <li className="previous wow fadeInLeftBig">
                                                    {' '}
                                                    <a href="">
                                                        <p>
                                                            <i className="fa fa-hand-o-left"></i>
                                                            <strong>Previous</strong>
                                                        </p>
                                                        <span>The best of Sony in a compact waterproof smartphone</span>{' '}
                                                    </a>
                                                </li>
                                                <li className="next wow fadeInRightBig">
                                                    {' '}
                                                    <a href="">
                                                        <p>
                                                            <i className="fa fa-hand-o-right"></i>
                                                            <strong>Next</strong>
                                                        </p>
                                                        <span>Proin vel arcu sed nibh faucibus porta non et nibh</span>{' '}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="social_area wow fadeInLeft">
                                            <ul>
                                                <li>
                                                    <a href="dashboard">
                                                        <span className="fa fa-facebook"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard">
                                                        <span className="fa fa-twitter"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard">
                                                        <span className="fa fa-google-plus"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard">
                                                        <span className="fa fa-linkedin"></span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="dashboard">
                                                        <span className="fa fa-pinterest"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Comment */}
                        <div className="containerCmt">
                            <div className="d-flex justify-content-center row">
                                <div className="col-md-8">
                                    <div className="d-flex flex-column comment-section">
                                        <div className="bg-white p-2">
                                            <div className="info">
                                                <div className="item1">
                                                    <img
                                                        className="rounded-circle"
                                                        src="https://i.imgur.com/RpzrMR2.jpg"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="item2">
                                                    {' '}
                                                    <span className="d-block font-weight-bold name">Marry Andrews</span>
                                                </div>
                                                <div className="item3">Shared publicly - Jan 2020</div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="comment-text">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="reaction">
                                            <button className="ml-1">Like</button>

                                            <button className="ml-1">Comment</button>

                                            <button className="ml-1">Share</button>
                                        </div>
                                        <div className="bg-light p-2">
                                            <div className="addcomment">
                                                <div className='item1'>
                                                    <img
                                                        className="rounded-circle"
                                                        src="https://i.imgur.com/RpzrMR2.jpg"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className='item2'>
                                                    <input
                                                        placeholder={'Write your comment here...'}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="actionAddComment">
                                                <button className="btn btn-primary btn-sm shadow-none" type="button">
                                                    Post comment
                                                </button>
                                                <button
                                                    className="btn btn-outline-primary btn-sm ml-1 shadow-none"
                                                    type="button"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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

export default DashBoard;
