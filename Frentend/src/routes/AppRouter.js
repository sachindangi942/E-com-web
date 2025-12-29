import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import MainLayout from '../layout/MainLayout'
import { PublicRoute } from './PublicRouter'
import Singin from '../components/MyForms/Singin'
import MyForm from '../components/MyForms/MyForm'
import { PrivateRoute } from './PrivateRouter'
import AddProduct from '../components/Products/AddProduct'
import { ProductList } from '../components/Products/ProductList'
import CreateUser from '../components/UserComponets/CreateUser'
import Showusers from '../components/UserComponets/Showusers'
import { Cart } from '../pages/Cart'
import { ViewDetails } from '../pages/ViewDetails'
import ForgotPassword from '../components/PasswordAPI/ForgotPassword'
import { ChangePassword } from '../components/PasswordAPI/ChangePassword'

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    <Route element={<PublicRoute />}>
                        <Route path="/registration" element={<MyForm />} />
                        <Route path="/singIn" element={<Singin />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                    </Route>

                    <Route element={<PrivateRoute />}>

                        <Route path="addProduct" element={<AddProduct />} />
                        <Route path="listProduct" element={<ProductList />} />
                        <Route path="createuser" element={<CreateUser />} />
                        <Route path="showusers" element={<Showusers />} />
                        <Route path="cartdata" element={<Cart />} />
                        <Route path="changePassword" element={<ChangePassword />} />
                    

                    </Route>
                </Route>
            </Routes>
        </Suspense>
    )
}
