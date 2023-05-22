import { useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import './detail.scss';
import * as newDetailService from '../../services/newDetailService';
import { INewsPaper } from '../../components/PopularNews/model';

// interface INewDetailProps {
//     newId: string;
// }

function DashBoard() {
    console.log(window.location);
    let locationArray = window.location.pathname.split('/');
    let newId = locationArray[locationArray.length - 1];
    console.log(newId);
    const [newDetail, setNewDetail] = useState<INewsPaper>();
    useEffect(() => {
        newDetailService
            .getNewDetail(newId)
            .then((result: INewsPaper) => {
                if (result) {
                    setNewDetail(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
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
                                        <h2 className="post_title wow ">{newDetail?.title}</h2>
                                        <div>
                                            <b>Author:</b>
                                        </div>
                                        <div>
                                            <b>Date:</b> {newDetail?.createdDate}
                                        </div>

                                        <div className="single_post_content">{newDetail?.content}</div>
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
                                                <div className="item1">
                                                    <img
                                                        className="rounded-circle"
                                                        src="https://i.imgur.com/RpzrMR2.jpg"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="item2">
                                                    <input placeholder={'Write your comment here...'}></input>
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
