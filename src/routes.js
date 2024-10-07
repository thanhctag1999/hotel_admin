
import { Icon } from '@chakra-ui/react';
import {
  MdEmojiFoodBeverage,
  MdHome,
  MdLock,
  MdHotel ,
  MdPerson,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Hotels from 'views/admin/hotels';
import HotelDetails from 'views/admin/hotels/detail.js';
import Profile from 'views/admin/profile';
import RTL from 'views/admin/rtl';
import Services from 'views/admin/services';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Manage Hotels',
    layout: '/admin',
    path: '/hotels',
    icon: (
      <Icon
        as={MdHotel }
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Hotels />,
    secondary: true,
  },
  {
    name: 'Hotel Details',
    path: '/hotel/:hotelId',
    component: <HotelDetails />,
    layout: '/admin',
  },
  {
    name: 'Services',
    layout: '/admin',
    icon: <Icon as={MdEmojiFoodBeverage } width="20px" height="20px" color="inherit" />,
    path: '/services',
    component: <Services />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];

export default routes;
