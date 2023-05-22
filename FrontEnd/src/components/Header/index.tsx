import './index.scss';
import * as CategoryService from '../../services/categoryService';
import { ICategory } from '../ExamplaeForm/CategoryForm/model';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const [CategoryList, SetCategoryList] = useState<ICategory[]>([]);
    useEffect(() => {
        CategoryService.listCate()
            .then((category) => {
                if (category) {
                    SetCategoryList(category);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    // const handleReload= (event: React.MouseEvent<HTMLAnchorElement>) => {
    //     event.preventDefault();
    //     console.log("handle: " );
    //     window.location.reload();
    // };
    return (
        <div>
            <div className="header_area">
                <div className="logo floatleft">
                    <h2 className="title">
                        <b>M</b>isaelMagazine
                    </h2>
                </div>
                <div className="top_menu floatleft">
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Contact us</a>
                        </li>
                        <li>
                            <a href="login">Login</a>
                        </li>
                    </ul>
                </div>
                <div className="social_plus_search floatright">
                    <div className="social">
                        <ul>
                            <li>
                                <a href="#" className="twitter"></a>
                            </li>
                            <li>
                                <a href="#" className="facebook"></a>
                            </li>
                            <li>
                                <a href="#" className="feed"></a>
                            </li>
                        </ul>
                    </div>
                    <div className="search">
                        <form action="#" method="post" id="search_form">
                            <input type="text" placeholder="Search news" id="s" />
                            <button className="" type="submit" id="searchform" value="search">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="main_menu_area">
                <ul id="nav">
                    {CategoryList.map((category, key) => (
                        <li key={key}>
                            <Link to={`/listNews/${category.name}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
