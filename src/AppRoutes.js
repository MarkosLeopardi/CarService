import { Home } from './Components/Home/Home';
import { Customers } from './Components/Customers/Customers';
import { Cars } from './Components/Cars/Cars';
import { CarEdit } from './Components/Cars/CarEdit'

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/Customers',
        element: <Customers />
    },
    {
        path: '/Cars',
        element: <Cars />
    },
    {
        path:'/Cars/CarEdit',
        element: <CarEdit />
    }
];

export default AppRoutes;
