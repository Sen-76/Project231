import classNames from 'classnames/bind';
import styles from './headerOnly.module.scss';

interface IHeaderOnlyProps {
    children: JSX.Element;
}


const cx = classNames.bind(styles);
function HeaderOnly({ children }: IHeaderOnlyProps) {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default HeaderOnly;