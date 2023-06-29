import styles from './home.module.scss';
import './index.scss';
import PopularNews from '../../components/News/PopularNews';
import FromAroundTheWorld from '../../components/News/Sport';

import LastestArticles from '../../components/News/WorldPart';
import TechNews from '../../components/News/TechNews';
import Gallery from '../../components/News/Gallery';
import {  Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Featurepost from '../../components/FeaturePost/featurepost';

const defaultTheme = createTheme();
function Home() {
    return (
        <div className={styles.content_area}> 
            <ThemeProvider theme={defaultTheme}>
            <Featurepost />
            <CssBaseline />
            <Container maxWidth="lg">
                <div>
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
        </div>
        
    );
}

export default Home;
