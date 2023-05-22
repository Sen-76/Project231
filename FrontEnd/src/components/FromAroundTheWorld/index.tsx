import { useEffect, useState } from 'react';
import * as newspaperService from '../../services/newsPaperService';
import { INewsPaper } from '../PopularNews/model';
// import DashBoard from '../../pages/DashBoard';
import { Link } from 'react-router-dom';
function FromAroundTheWorld() {
    const [newsPaperList, setNewsPaperList] = useState<INewsPaper[]>([]);
    useEffect(() => {
        newspaperService
            .getnewsPaperList(1)
            .then((result: INewsPaper[]) => {
                if (result) {
                    setNewsPaperList(result);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <>
            {newsPaperList.map((item, key) => (
                <div key={key} className="single_left_coloum floatleft">
                    <img src="https://cdn.pixabay.com/photo/2023/05/10/16/46/butterfly-7984538_640.jpg" alt="" />
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    {/* <DashBoard newId={"021F1D43-6141-4042-B556-0BE7B81443F8"}></DashBoard> */}
                    <Link className="readmore" to="/newsdetail/021F1D43-6141-4042-B556-0BE7B81443F8">
                        read more
                    </Link>
                </div>
            ))}
        </>
    );
}
export default FromAroundTheWorld;
