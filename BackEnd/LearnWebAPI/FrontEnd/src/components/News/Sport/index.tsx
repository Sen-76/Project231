import { useEffect, useState } from 'react';
import * as newspaperService from '../../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';
import { Link } from 'react-router-dom';
import { Hidden } from '@mui/material';
function FromAroundTheWorld() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    const [cateName, setCateName] = useState<string>('');
    const [cateid, setCateid] = useState<string>('');

    useEffect(() => {
        newspaperService
            .listnewsPaperByCate('88405f11-8391-4f18-9b6e-6d48bcbeb718')
            .then((result) => {
                if (result) {
                    setCateid(result.cate.id);
                    setCateName(result.cate.name);
                    setNewsPaperList(result.news);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="single_left_coloum_wrapper">
            <h2 className="title">{cateName}</h2>
            <Link className="more" key={cateid} to={`/listNews/${cateid}`}>
                more
            </Link>

            {newsPaperList.slice(0, 4).map((item, key) => (
                <div key={key} className="single_left_coloum floatleft">
                    {(() => {
                        try {
                            return <img src={require('../../../ImageSave/' + item.image)} alt={item.title} />;
                        } catch (error) {
                            return (
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                                    alt=""
                                />
                            );
                        }
                    })()}
                    <h3>{item.title}</h3>
                    <p style={{maxHeight: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{item.description}</p>
                    <Link className="readmore" to={`/newsdetail/${item.id}`}>
                        read more
                    </Link>
                </div>
            ))}
        </div>
    );
}
export default FromAroundTheWorld;
