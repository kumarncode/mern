import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigation = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = () => {
        localStorage.clear();
        navigation('/');
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <LinkContainer to="/">
                        <a className="navbar-brand">Logo</a>
                    </LinkContainer>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <LinkContainer to="/">
                                    <a className="nav-link">Home</a>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/products">
                                    <a className="nav-link">Products</a>
                                </LinkContainer>
                            </li>                            
                            {auth?
                            <>
                            <li className="nav-item">
                                <LinkContainer to="/addproducts">
                                    <a className="nav-link">Add Products</a>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/register">
                                    <a className="nav-link" onClick={logout}>Logout</a>
                                </LinkContainer>
                            </li>
                            </>
                            :
                            <>                            
                            <li className="nav-item">
                                <LinkContainer to="/register">
                                    <a className="nav-link">Register</a>
                                </LinkContainer>
                            </li>
                            <li className="nav-item">
                                <LinkContainer to="/login">
                                    <a className="nav-link">Login</a>
                                </LinkContainer>
                            </li>
                            </>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header;