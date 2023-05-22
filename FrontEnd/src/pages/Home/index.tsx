import './home.module.scss';
import './index.scss';
import PopularNews from '../../components/News/PopularNews';
import FromAroundTheWorld from '../../components/News/FromAroundTheWorld';
import Entertainment from '../../components/News/Entertainment';
import LastestArticles from '../../components/News/LastestArticles';
import TechNews from '../../components/News/TechNews';
import Gallery from '../../components/News/Gallery';
function Home() {
    return (
        <div className="content_area" >
            <div className="main_content floatleft">
                <div className="left_coloum floatleft">
                    <FromAroundTheWorld></FromAroundTheWorld>
                    <LastestArticles></LastestArticles>
                    <Gallery></Gallery>
                    <TechNews></TechNews>
                </div>
                <div className="right_coloum floatright">
                    <Entertainment></Entertainment>
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
        </div >
    );
}

export default Home;
