import classNames from 'classnames/bind';
import styles from './headerOnly.module.scss';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../store/hook';
import { SnackbarProvider } from 'notistack';

interface IHeaderOnlyProps {
    children: JSX.Element;
}

const cx = classNames.bind(styles);
function HeaderOnly({ children }: IHeaderOnlyProps) {
    const Loading: boolean = useAppSelector((state) => state.controller.loading);
    return (
        <SnackbarProvider maxSnack={3}>
            <div className={cx('container')}>
                {Loading && (
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Loading}>
                        <CircularProgress color="success" />
                    </Backdrop>
                )}
                <div className={cx('content')}>{children}</div>
            </div>
        </SnackbarProvider>
    );
}
export default HeaderOnly;
