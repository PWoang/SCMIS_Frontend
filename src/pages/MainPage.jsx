import { NavLink } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <NavLink to="/teacher">Teacher Layout</NavLink>
            <br/>
                        <NavLink to="/parent">parent Layout</NavLink>
                         <br/>
            <NavLink to="/student">student Layout</NavLink>

        </div>
    )
}
export default MainPage;