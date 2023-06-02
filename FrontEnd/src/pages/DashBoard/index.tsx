import { useEffect, useState } from 'react';
import './detail.scss';
import * as newDetailService from '../../services/newDetailService';
import * as commentService from '../../services/commentService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import LastestArticles from '../../components/News/LastestArticles';
import { useParams } from 'react-router-dom';
import FeaturePostDetail from './featurePostDetail';
import { Box, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
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
            <div>
                <b>Author:</b> {newDetail?.author.name}
            </div>
            <div>
                <b>Date:</b> {newDetail?.createdDate}
            </div>
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr' },
                    gap: 2,
                }}
            >
                {newDetail?.content}
            </Box>
            {/* Comment */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    {'Summarize'}
                </Typography>
                <Typography>{newDetail?.description}
                    </Typography>
            </Paper>
            <div>
                {commentList?.map((item: IComment) => (
                    <Comment comment={item} />
                ))}
            </div>

            {/* <LastestArticles></LastestArticles> */}
        </ThemeProvider>
    );
}

export default DashBoard;
