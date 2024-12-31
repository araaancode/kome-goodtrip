import { lazy } from 'react'


const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))


// routes for drivers
const Bookings = lazy(() => import('../pages/Bookings'))
const Cooks = lazy(() => import('../pages/Cooks'))
const Comments = lazy(() => import('../pages/Comments'))
const Rates = lazy(() => import('../pages/Rates'))
const Financials = lazy(() => import('../pages/Financials'))
const Advertisments = lazy(() => import('../pages/Advertisments'))
const Prices = lazy(() => import('../pages/Prices'))
const SupportTickets = lazy(() => import('../pages/SupportTickets'))
const CreateSupportTicket = lazy(() => import('../pages/CreateSupportTicket'))
const Bank = lazy(() => import('../pages/Bank'))
const Owners = lazy(() => import('../pages/Owners'))
const Profile = lazy(() => import('../pages/Profile'))
const CookInfo = lazy(() => import('../pages/CookInfo'))
const Orders = lazy(() => import('../pages/Orders'))
const CreateAds = lazy(() => import('../pages/CreateAds'))
const UpdateAds = lazy(() => import('../pages/UpdateAds'))





const routes = [
  
 
  {
    path: '/orders', // the url
    component: Orders, // view rendered
  },
  {
    path: '/financials',
    component: Financials,
  },
  {
    path: '/cooks', // the url
    component: Cooks, // view rendered
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
    path: '/advertisments',
    component: Advertisments,
  },
  {
    path: '/price',
    component: Prices,
  },
  {
    path: '/support-tickets',
    component: SupportTickets,
  },
  {
    path: '/create-support-ticket',
    component: CreateSupportTicket,
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
    path: '/cook-info',
    component: CookInfo,
  },

  {
    path: '/create-advertisment',
    component: CreateAds,
  },
  
  {
    path: '/advertisments/:adsId/update',
    component: UpdateAds,
  },
  
]

export default routes
