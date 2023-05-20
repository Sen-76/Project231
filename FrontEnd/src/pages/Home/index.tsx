import Footer from '../Footer';
import Header from '../Header';
import './home.module.scss';
import './index.scss';
import PopularNews from '../../components/PopularNews';
import FromAroundTheWorld from '../../components/FromAroundTheWorld';
import Entertainment from '../../components/Entertainment';
import LastestArticles from '../../components/LastestArticles';
import TechNews from '../../components/TechNews';
function Home() {
    return (
        <div className="container">
            <div className="">
                <div className="body_wrapper">
                    <div className="center">
                        <Header></Header>

                        <div className="content_area">
                            <div className="main_content floatleft">
                                <div className="left_coloum floatleft">
                                    <div className="single_left_coloum_wrapper">
                                        <h2 className="title">FROM AROUND THE WORLD</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <FromAroundTheWorld></FromAroundTheWorld>
                                    </div>
                                    <div className="single_left_coloum_wrapper">
                                        <h2 className="title">Latest Articles</h2>
                                        <a className="more" href="dashboard">
                                            more
                                        </a>
                                        <LastestArticles></LastestArticles>
                                    </div>
                                    <div className="single_left_coloum_wrapper gallery">
                                        <h2 className="title">Gallery</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <img src="https://img5.thuthuatphanmem.vn/uploads/2021/11/01/999-anh-buon-va-tam-trang-nhat_012421999.jpg" alt="" />
                                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-buon-4k-001.jpg" alt="" />
                                        <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/tong-hop-nhung-background-buon-dep-va-co-don-nhat-1.jpg" alt="" />
                                        <img src="https://img5.thuthuatphanmem.vn/uploads/2021/11/01/999-anh-buon-va-tam-trang-nhat_012421999.jpg" alt="" />
                                        <img src="https://vapa.vn/wp-content/uploads/2022/12/anh-buon-4k-001.jpg" alt="" />
                                        <img src="https://toigingiuvedep.vn/wp-content/uploads/2021/08/tong-hop-nhung-background-buon-dep-va-co-don-nhat-1.jpg" alt="" />
                                    </div>
                                    <div className="single_left_coloum_wrapper single_cat_left">
                                        <h2 className="title">Tech News</h2>
                                        <a className="more" href="#">
                                            more
                                        </a>
                                        <TechNews></TechNews>
                                    </div>
                                </div>
                                <div className="right_coloum floatright">
                                    <div className="single_right_coloum">
                                        <h2 className="title">From the desk</h2>
                                        <ul>
                                            <li>
                                                <Entertainment></Entertainment>
                                            </li>
                                        </ul>
                                        <a className="popular_more" href="#">
                                            more
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="sidebar floatright">
                                <PopularNews />
                                <div className="single_sidebar">
                                    <img src="images/add1.png" alt="" />
                                </div>
                                <div className="single_sidebar">
                                    <h2 className="title">ADD</h2>
                                    <img src="images/add2.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
