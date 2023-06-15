import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/index';
import './App.css';
import Default from './layout/default';
import { Suspense } from 'react';
function App() {
    return (
        <div className="App">
            <Router>
                <div className="App">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout: any = Default;
                                if (route.layout) {
                                    Layout = route.layout;
                                }
                                else if (route.layout === null) {
                                    Layout = <></>;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </div >
    );
}

export default App;
