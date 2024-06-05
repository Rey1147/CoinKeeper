import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useAppDispatch} from "./store/hooks.ts";
import {getTokenFromLocalStorage} from "./helper/localstorsge.helper.ts";
import {toast} from "react-toastify";
import {AuthService} from "./services/auth.service.ts";
import {login, logout} from "./store/user/userSlice.ts";
import {useEffect} from "react";

function App() {
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if (token) {
        const data = await AuthService.getProfile()
        data ? dispatch(login(data)) : dispatch(logout())
      }
    } catch (e: any) {
      const error = e.response?.data.message
      toast.error(error.toString())
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return <RouterProvider router={router}/>
}

export default App
