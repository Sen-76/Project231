import styles from './comment.module.scss';
import { Avatar, Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
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
                <Avatar className={styles.avatar}>Đ</Avatar>
                <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                        <span className={styles.username}>{comment.userId}</span>
                        <span className={styles.date}>Date Time</span>
                    </div>
                    <span className={styles.content}>This is comment's content</span>
                </div>
            </div>
        </Box>
    );
}

export default Comment;
