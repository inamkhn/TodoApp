import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/userSlice";


const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutHandler = async()=>{
    try {
      dispatch(signOutStart());
      const res = await axios.post("/api/v1/signout", {
        method: "POST",
        Authentication: `Brearer ${currentUser.access_token}`,
      });
      if (res.success === false) {
        dispatch(signOutFailure(res.message));
        return;
      }
      navigate('/sign-in')
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  }

  return (
    <div className="">
      <div className="navbar flex items-center bg-base-100">
        <div className="flex-1">
          <Link to="/"><a className="btn btn-ghost text-xl">ToDo-App</a></Link>
        </div>
        <div className="flex-none gap-2">

          {currentUser ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a onClick={logoutHandler}>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/sign-in">
              <p className="cursor-pointer">SignIn</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
