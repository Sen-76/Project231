import styles from './comment.module.scss';
import { Avatar, Box } from '@mui/material';
import { IComment } from '../../../interface/comment';

interface ICommentProp {
    comment: IComment;
}

function Comment({ comment }: ICommentProp) {
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
                        <span className={styles.date}>{comment.postTime.toString()}</span>
                    </div>
                    <span className={styles.content}>{comment.content}</span>
                </div>
            </div>
        </Box>
    );
}

export default Comment;
