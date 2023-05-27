import { useEffect, useState } from 'react';
import './detail.scss';
import * as newDetailService from '../../services/newDetailService';
import * as commentService from '../../services/commentService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import LastestArticles from '../../components/News/LastestArticles';
import { useParams } from 'react-router-dom';

interface IComment {
    commentId: string;
    newsPaperId: string;
    newsPaper: null;
    userId: string;
    user: null;
    content: string;
    postTime: string;
    isDeleted: false;
}
function DashBoard() {
    const { id } = useParams();
    const [newDetail, setNewDetail] = useState<INewsPaper>();
    const [commentList, setCommentList] = useState<IComment[]>();
    useEffect(() => {
        newDetailService
            .getNewDetail(id || '')
            .then((result: INewsPaper) => {
                if (result) {
                    setNewDetail(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        commentService
            .getCommentofNew(1, id || '')
            .then((result: IComment[]) => {
                if (result) {
                    setCommentList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                <div className="row">
                    <div className="middle_bar">
                        <div className="single_post_area">
                            <h2 className="post_title wow ">{newDetail?.title}</h2>
                            <div>
                                <b>Author:</b> {newDetail?.author.name}
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
                            {/* <div className="social_area wow fadeInLeft">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Comment */}
            <div className="containerCmt">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-8">
                        <div className="d-flex flex-column comment-section">
                            {commentList?.map((comment, key) => (
                                <div key={key}>
                                    <div className="bg-white p-2">
                                        <div className="info">
                                            <div className="item1">
                                                <img
                                                    className="rounded-circle"
                                                    src="https://i.imgur.com/RpzrMR2.jpg"
                                                    width="40"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="item2">
                                                {' '}
                                                <span className="d-block font-weight-bold name"></span>
                                            </div>
                                            <div className="item3">{comment.postTime}</div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="comment-text">{comment.content}</p>
                                        </div>
                                    </div>
                                    <div className="reaction">
                                        <button className="ml-1">Like</button>

                                        <button className="ml-1">Comment</button>

                                        <button className="ml-1">Share</button>
                                    </div>
                                </div>
                            ))}

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
            <LastestArticles></LastestArticles>
        </>
    );
}

export default DashBoard;
