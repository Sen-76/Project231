import { useEffect, useState } from 'react';
import './detail.scss';
import * as newDetailService from '../../services/newDetailService';
import * as commentService from '../../services/commentService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import LastestArticles from '../../components/News/LastestArticles';
import { useParams } from 'react-router-dom';
import FeaturePostDetail from './featurePostDetail';
import { ThemeProvider, createTheme } from '@mui/material';
import Comment from './Comment/comment';

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
const defaultTheme = createTheme();
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
        <ThemeProvider theme={defaultTheme}>
            <FeaturePostDetail newDetail={newDetail!}></FeaturePostDetail>
            <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                <div className="row">
                    <div className="middle_bar">
                        <div className="single_post_area">
                            <div>
                                <b>Author:</b> {newDetail?.author.name}
                            </div>
                            <div>
                                <b>Date:</b> {newDetail?.createdDate}
                            </div>

                            <div className="single_post_content">{newDetail?.content}</div>
                            {/* phân trang */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Comment */}
            {commentList?.map((item: IComment) => (
                <Comment comment={item} />
            ))}
            {/* <LastestArticles></LastestArticles> */}
        </ThemeProvider>
    );
}

export default DashBoard;
