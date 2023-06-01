import styles from './comment.module.scss';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
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
interface ICommentProp {
    comment: IComment;
}

function Comment({ comment }: ICommentProp) {
    return (
        <>
            <div className={styles.comment}>
                <Avatar className={styles.avatar}>Đ</Avatar>
                <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                        <span className={styles.username}>Minh Duc</span>
                        <span className={styles.date}>Date Time</span>
                    </div>
                    <span className={styles.content}>This is comment's content</span>
                </div>
            </div>
        </>
    );
}

export default Comment;
