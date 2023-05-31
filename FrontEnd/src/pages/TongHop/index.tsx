import CategoryForm from "../../components/CategoryForm";
import NewsPaperForm from "../../components/NewsPaperForm";
import UserForm from "../../components/UserForm";

function TongHop() {
    return (
        <div>
            <CategoryForm />
            <hr style={{ margin: 10 }} />
            <NewsPaperForm />
            <hr style={{ margin: 10 }} />
            <UserForm />
        </div>
    );
}

export default TongHop;