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
                <FromAroundTheWorld></FromAroundTheWorld>
                <LastestArticles></LastestArticles>
                <Gallery></Gallery>
                <TechNews></TechNews>
            </div>
            <div className="sidebar floatright">
                <PopularNews />
            </div>
        </div >
    );
}

export default Home;
