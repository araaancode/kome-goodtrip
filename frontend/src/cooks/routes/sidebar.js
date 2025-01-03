// *** icons ***
// heroicons
import DashboardIcon from '@heroicons/react/24/outline/Squares2X2Icon'
import CakeIcon from '@heroicons/react/24/outline/CakeIcon'

// iconsscout
import BusIcon from '@iconscout/react-unicons/icons/uil-bus'
import FileSearchIcon from '@iconscout/react-unicons/icons/uil-file-search-alt'
import TicketIcon from '@iconscout/react-unicons/icons/uil-ticket'
import MoneyIcon from '@iconscout/react-unicons/icons/uil-bill'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'
import MoneyStackIcon from '@iconscout/react-unicons/icons/uil-money-bill-stack'
import MeIcon from '@iconscout/react-unicons/icons/uil-grin'
import AdvIcon from '@iconscout/react-unicons/icons/uil-coins'
import BuildingIcon from '@iconscout/react-unicons/icons/uil-building'
import UsersIcon from '@iconscout/react-unicons/icons/uil-users-alt'
import BankIcon from '@iconscout/react-unicons/icons/uil-university'
import cooksIcon from '@iconscout/react-unicons/icons/uil-bus-school'
import CooksIcon from '@iconscout/react-unicons/icons/uil-pizza-slice'
import RoomsIcon from '@iconscout/react-unicons/icons/uil-trees'
import HomeIcon from '@heroicons/react/24/outline/HomeModernIcon'
import AdminsIcon from '@iconscout/react-unicons/icons/uil-user-square'
import CoinsIcon from '@iconscout/react-unicons/icons/uil-coins'
import NewsPaperIcon from '@iconscout/react-unicons/icons/uil-newspaper'
import StarIcon from '@iconscout/react-unicons/icons/uil-star-half-alt'
import ChatIcon from '@iconscout/react-unicons/icons/uil-chat'
import CalendarIcon from '@iconscout/react-unicons/icons/uil-calender'
import DriverIcon from '@iconscout/react-unicons/icons/uil-bus-school'
import CircleIcon from '@iconscout/react-unicons/icons/uil-circle-layer'
import FoodIcon from '@iconscout/react-unicons/icons/uil-pizza-slice'
import { BiListUl } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { PiChefHat, PiBowlFoodLight, PiCoins } from "react-icons/pi";
import { VscVerified } from "react-icons/vsc";
import { TbNewSection } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";



const iconClasses = `h-8 w-8 text-gray-800`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/cooks/orders',
    icon: <BiListUl size="140" className={iconClasses} />,
    name: 'لیست سفارش ها',
  },
  {
    path: '/cooks/cook-info', // url
    icon: <PiChefHat className={iconClasses} />,
    name: 'ثبت اطلاعات غذادار',
  },

  {
    path: '/cooks/comments', // url
    icon: <ChatIcon size="140" className={iconClasses} />,
    name: ' نظرات کاربران ',
  },

  {
    path: '/cooks/create-advertisment', // url
    icon: <TbNewSection className={iconClasses} />,
    name: 'ایجاد آگهی',
  },

  {
    path: '/cooks/advertisments', // url
    icon: <NewsPaperIcon className={iconClasses} />,
    name: ' آگهی ها',
  },

  {
    path: '/cooks/add-food', // url
    icon: <IoFastFoodOutline className={iconClasses} />,
    name: 'افزودن غذا',
  },

  {
    path: '/cooks/rates', // url
    icon: <StarIcon className={iconClasses} />,
    name: 'امتیاز',
  },

  {
    path: '/cooks/create-support-ticket', // url
    icon: <BiSupport className={iconClasses} />,
    name: 'ایجاد تیکت پشتیبانی',
  },

  {
    path: '/cooks/support-tickets', // url
    icon: <BiSupport className={iconClasses} />,
    name: 'تیکت های من',
  },


  {
    path: '/cooks/bank', // url
    icon: <BankIcon className={iconClasses} />,
    name: 'حساب بانکی',
  },


]

export default routes


