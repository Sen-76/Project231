import { useEffect, useState } from 'react';
import * as CategoryService from '../../../services/categoryService';
import './index.scss';
import { ICategory } from '../../../interface/category';
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
                <div className="inner_footer_top"></div>
            </div>
            <div className="footer_bottom_area">
                <div className="footer_menu">
                    <ul id="f_menu">
                        {CategoryList.map((category) => (
                            <li key={category.id}>
                                <a href="#">{category.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
