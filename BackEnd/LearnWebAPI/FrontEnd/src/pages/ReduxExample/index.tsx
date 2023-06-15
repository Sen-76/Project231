import { useDispatch } from "react-redux";
import { IHobby } from "../../store/hobbySlice";
import { useAppSelector } from "../../store/hook";
import { increment } from "../../store/counterSlice";
import { add } from "../../store/hobbySlice";
function ReduxExample() {
    const dispatch = useDispatch();
    const count = useAppSelector((state) => state.counter.value)
    const hobbyList: IHobby[] = useAppSelector((state) => state.hobby.list)
    const handlePlusClick = () => {
        dispatch(increment())
    }
    const addHobby = () => {
        var newHobby = {
            id: 'test',
            title: 'test',
        }
        dispatch(add(newHobby))
    }
    return (
        <div>
            <h1>Redux Example Page</h1>
            <span>{count}</span>
            <br />
            <button onClick={handlePlusClick}>Plus</button>
            <ul>
                {
                    hobbyList.map((hobby, index) => {
                        return <li key={index}>{hobby.title}</li>
                    })
                }
            </ul>
            <button onClick={addHobby}>add hobby</button>
        </div>
    );
}

export default ReduxExample;