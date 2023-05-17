import CategoryForm from "../../components/CategoryAddForm";
import NewsPaperForm from "../../components/NewsPaperForm";

function TongHop() {
    return (
        <div>
            <CategoryForm />
            <hr style={{ margin: 10 }} />
            <NewsPaperForm />
        </div>
    );
}

export default TongHop;