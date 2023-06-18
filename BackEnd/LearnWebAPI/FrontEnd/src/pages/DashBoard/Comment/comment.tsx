import styles from './comment.module.scss';
import { Avatar, Box } from '@mui/material';
import { IComment } from '../../../interface/comment';
import { format, parseISO } from 'date-fns';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as commentService from '../../../services/commentService';

interface ICommentProp {
    comment: IComment;
    setResetComment: () => void;
}

function Comment({ comment, setResetComment }: ICommentProp) {
    async function DeleteComment(id: string) {
        commentService
            .deleteComment(id)
            .then((result) => {
                if (result.success) {
                    setResetComment()
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return (
        <Box
            sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
            }}
        >
            <div className={styles.comment}>
                <Avatar className={styles.avatar}>{comment.user.name.split('')[0]}</Avatar>
                <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                        <span className={styles.username}>{comment.user.name}</span>
                        <span className={styles.date}>{format(parseISO(comment.postTime), 'dd-MMM-yyyy')}</span>
                        <DeleteOutlineIcon style={{cursor: 'pointer'}} onClick={() => DeleteComment(comment.id)} />
                    </div>
                    <span className={styles.content}>{comment.content}</span>
                </div>
            </div>
        </Box>
    );
}

export default Comment;
