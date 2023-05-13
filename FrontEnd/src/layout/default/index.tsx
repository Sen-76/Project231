import classNames from 'classnames/bind';
import styles from './default.module.scss';

interface IDefaultOnlyProps {
    children: JSX.Element;
}

const cx = classNames.bind(styles);
function Default({ children }: IDefaultOnlyProps) {
    return ( 
        <div className={cx('container')}></div>
     );
}

export default Default;