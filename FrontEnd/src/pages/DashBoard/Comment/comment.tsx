import styles from './comment.module.scss';
import { Avatar, Stack } from '@mui/material';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Comment() {
    return (
        <>
            <h1>Comment component</h1>
            <div className={styles.comment}>
                <Avatar>MĐ</Avatar>
                <div className="comment-item">
                    <div className="header">
                        <span>Minh Duc</span>
                        <span>Date Time</span>
                    </div>
                    <span>This is comment's content</span>
                </div>
            </div>
        </>
    );
}

export default Comment;
