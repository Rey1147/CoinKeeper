import {FC} from "react";
import {Link} from "react-router-dom";

const ErrorPage: FC = () => {
    return (
        <div className='min-h-screen bg-slate-900 text-white flex justify-center items-center flex-col gap-7'>
            <h1 className='font-bold text-6xl'>404</h1>
            <h2 className='text-3xl'>Page not found</h2>
            <Link to={'/'} className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
                Go Back
            </Link>
        </div>
    )
}
export default ErrorPage