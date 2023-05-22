import styles from './default.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
interface IDefaultOnlyProps {
    children: JSX.Element;
}

function Default({ children }: IDefaultOnlyProps) {
    return (
        <div className="container">
            <div className="box_wrapper">
                <div className="center">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Default;