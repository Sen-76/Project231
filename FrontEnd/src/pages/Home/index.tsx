import './home.module.scss';
import './index.scss';
import PopularNews from '../../components/News/PopularNews';
import FromAroundTheWorld from '../../components/News/FromAroundTheWorld';

import LastestArticles from '../../components/News/LastestArticles';
import TechNews from '../../components/News/TechNews';
import Gallery from '../../components/News/Gallery';
import {  Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Featurepost from '../../components/FeaturePost/featurepost';

const defaultTheme = createTheme();
function Home() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Featurepost />
            <CssBaseline />
            <Container maxWidth="lg">
                <div className="content_area">
                    <div className="main_content floatleft">
                        <FromAroundTheWorld></FromAroundTheWorld>
                        <LastestArticles></LastestArticles>
                        <Gallery></Gallery>
                        <TechNews></TechNews>
                    </div>
                    <div className="sidebar floatright">
                        <PopularNews />
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default Home;
