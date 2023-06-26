import { FunctionComponent, useEffect, useState } from 'react';
import './detail.scss';
import * as newDetailService from '../../services/newDetailService';
import * as commentService from '../../services/commentService';
import { INewsPaper } from '../../components/News/PopularNews/model';
import { useParams } from 'react-router-dom';
import FeaturePostDetail from './featurePostDetail';
import { Box, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import Comment from './Comment/comment';
import Cmt from './Comment/cmt';
import { IComment } from '../../interface/comment';
import { useCookies } from 'react-cookie';

const defaultTheme = createTheme();
function DashBoard() {
    const { id } = useParams();
    const [newDetail, setNewDetail] = useState<INewsPaper>();
    const [commentList, setCommentList] = useState<IComment[]>();
    const [resetComment, setResetComment] = useState<boolean>(true);
    const [cookies, setCookie] = useCookies(['userLogin']);
    const reset = (): void => {
        setResetComment(!resetComment);
    };
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
    }, [resetComment]);

    interface Props {
        htmlString: string;
    }
    const HTMLRenderer: FunctionComponent<Props> = ({ htmlString }) => {
        const createMarkup = (htmlString: string) => {
            return { __html: htmlString };
        };

        return (
            <div
                style={{ overflow: 'hidden', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={createMarkup(htmlString)}
            />
        );
    };
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
                <HTMLRenderer htmlString={newDetail?.content || ''} />
            </Box>
            {/* Comment */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    {'Summarize'}
                </Typography>
                <Typography sx={{ overflow: 'hidden', overflowWrap: 'break-word' }}>
                    {newDetail?.description}
                </Typography>
            </Paper>
            {cookies.userLogin && (
                <div>
                    <Cmt setResetComment={reset} />
                    {commentList?.map((item: IComment) => (
                        <Comment comment={item} setResetComment={reset} key={item.id} />
                    ))}
                </div>
            )}
        </ThemeProvider>
    );
}

export default DashBoard;
