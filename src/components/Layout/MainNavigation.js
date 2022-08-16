import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./MainNavigation.scss";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    navigate("./auth");
  };

  return (
    <header className="nav-header">
      <div className="nav-logo">Admin Page</div>
      <nav>
        <ul className="nav-ul">
          {!isLoggedIn && (
            <li className="nav-li">
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-li">
                <Link to="/products">Products</Link>
              </li>
              <li className="nav-li">
                <Link to="/orders">Orders</Link>
              </li>
              <li className="nav-li">
                <button className="logout-btn" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
