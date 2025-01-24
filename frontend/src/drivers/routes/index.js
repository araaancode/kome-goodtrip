import Dashboard from '../pages/protected/Dashboard'
import Welcome from '../pages/protected/Welcome'
import Page404 from '../pages/protected/404'
import Blank from '../pages/protected/Blank'
import Bookings from '../pages/Bookings'
import Buses from '../pages/Buses'
import Comments from '../pages/Comments'
import Rates from '../pages/Rates'
import Financials from '../pages/Financials'
import Advertisments from '../pages/Advertisments'
import Prices from '../pages/Prices'
import Support from '../pages/Support'
import Bank from '../pages/Bank'
import Owners from '../pages/Owners'
import Profile from '../pages/Profile'
import DriverInfo from '../pages/DriverInfo'


const routes = [
  
 
  {
    path: '/bookings', // the url
    component: Bookings, // view rendered
  },
  {
    path: '/buses', // the url
    component: Buses, // view rendered
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/comments',
    component: Comments,
  },
  {
    path: '/rates',
    component: Rates,
  },
  {
    path: '/financials',
    component: Financials,
  },
  {
    path: '/advertisments',
    component: Advertisments,
  },
  {
    path: '/price',
    component: Prices,
  },
  {
    path: '/support',
    component: Support,
  },
  {
    path: '/bank',
    component: Bank,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/driver-info',
    component: DriverInfo,
  },
  
]

export default routes
