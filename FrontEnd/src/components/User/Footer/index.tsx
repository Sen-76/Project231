import { useEffect, useState } from 'react';
import * as CategoryService from '../../../services/categoryService';
import './index.scss';
import { ICategory } from '../../ExamplaeForm/CategoryForm/model';
function Footer() {
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
            <div className="footer_top_area">
                <div className="inner_footer_top">
                    {' '}
                    <img src="https://img5.thuthuatphanmem.vn/uploads/2021/09/22/background-hoat-hinh-de-thuong_094719435.jpg" alt="" />{' '}
                </div>
            </div>
            <div className="footer_bottom_area">
                <div className="footer_menu">
                <ul id="f_menu">
                    {CategoryList.map((category, key) => (
                        <li key={key}>
                            <a href="#">{category.name}</a>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="copyright_text">
                    <p>
                        Copyright &copy; 2045 The News Reporter Inc. All rights reserved | Design by{' '}
                        <a
                            target="_blank"
                            rel="nofollow"
                            href="http://www.graphicsfuel.com/2045/10/wp-magazine-theme-template-psd/"
                        >
                            Rafi MD
                        </a>
                    </p>
                    <p>
                        Trade marks and images used in the design are the copyright of their respective owners and are
                        used for demo purposes only.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
