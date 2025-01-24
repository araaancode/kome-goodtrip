import Dashboard from '../pages/protected/Dashboard'
import Welcome from '../pages/protected/Welcome'
import Page404 from '../pages/protected/404'
import Blank from '../pages/protected/Blank'
import Rents from '../pages/Rents'
import Bookings from '../pages/Bookings'
import House from '../pages/House'
import Comments from '../pages/Comments'
import Rates from '../pages/Rates'
import Financials from '../pages/Financials'
import Advertisments from '../pages/Advertisments'
import Prices from '../pages/Prices'
import Support from '../pages/Support'
import Bank from '../pages/Bank'
import Profile from '../pages/Profile'
import OwnersInfo from '../pages/OwnersInfo'


const routes = [
  
  {
    path: '/owners-info', // the url
    component: OwnersInfo, // view rendered
  },
  {
    path: '/bookings', // the url
    component: Bookings, // view rendered
  },

  {
    path: '/financials',
    component: Financials,
  },
  {
    path: '/house', // the url
    component: House, // view rendered
  },
  {
    path: '/advertisments',
    component: Advertisments,
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
    path: '/price',
    component: Prices,
  },

  {
    path: '/support',
    component: Support,
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
    path: '/bank',
    component: Bank,
  },
  {
    path: '/profile',
    component: Profile,
  },
  
]

export default routes
