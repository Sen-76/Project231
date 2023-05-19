import './index.scss';
import * as CategoryService from '../../services/categoryService';
import { ICategory } from '../../components/CategoryAddForm/model';
import { useEffect, useState } from 'react';
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
                            <a href="home">Home</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Contact us</a>
                        </li>
                        <li>
                            <a href="#">Login</a>
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
                            <input type="text" value="Search news" id="s" />
                            <button className="" type="submit" id="searchform" value="search">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="main_menu_area">
                <ul id="nav">
                    {CategoryList.map((category) => (
                        <li>
                            <a href="#">{category.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
