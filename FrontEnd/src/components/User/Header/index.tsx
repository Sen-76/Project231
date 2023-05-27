import './header.scss';
import * as CategoryService from '../../../services/categoryService';
import { ICategory } from '../../ExamplaeForm/CategoryForm/model';
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
    return (
        <div>
            <div className="header_area">
                <div className="logo floatleft">
                    <Link to="/home">
                        <h2 className="title">
                            <b>M</b>isaelMagazine
                        </h2>
                    </Link>
                </div>
                <div className="top_menu floatleft">
                    <ul>
                        <li>
                            <a href="login">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main_menu_area">
                <ul id="nav">
                    {CategoryList.map((category, key) => (
                        <li key={key}>
                            <Link to={`/listNews/${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
                {/* <div className="search">
                    <form action="#" method="post" id="search_form">
                        <input type="text" placeholder="Search news" id="s" />
                        <button className="" type="submit" id="searchform" value="search">
                            Search
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
}

export default Header;
