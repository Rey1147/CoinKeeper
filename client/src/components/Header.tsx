import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaBtc, FaSignOutAlt} from 'react-icons/fa'
import {useAuth} from "../hooks/useAuth.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/user/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helper/localstorsge.helper.ts";
import {toast} from "react-toastify";

type RouteProps = {
    path: string,
    name: string
}

const Header: FC = () => {
    const RouteComponent = (props: RouteProps) => {
        return (
            <li>
                <NavLink to={props.path} className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>{props.name}</NavLink>
            </li>
        )
    }

    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate =useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out')
        navigate('/')
    }

    return (
        <header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
            <Link to='/' className='pl-5'>
                <FaBtc size={22}/>
            </Link>

            {isAuth && (
                    <nav className='ml-auto mr-10'>
                        <ul className='flex items-center gap-7'>
                            <RouteComponent path={'/'} name={'Home'}/>
                            <RouteComponent path={'/transactions'} name={'Transactions'}/>
                            <RouteComponent path={'/categories'} name={'Categories'}/>
                        </ul>
                    </nav>
            )}

            {
                isAuth ? (
                    <button className='btn btn-red' onClick={logoutHandler}>
                        <span>Log Out</span>
                        <FaSignOutAlt/>
                    </button>
                ) : (
                    <Link to={'auth'} className='py-2 text-white/50 hover:text-white ml-auto mr-10'>
                        Log In / Sing In
                    </Link>
                )
            }
        </header>
    )
}
export default Header