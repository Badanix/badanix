import { IMAGE} from './Constants';


const styles = {
  
  bgImg: `bg-[url("${IMAGE.auth_bg_image}")] bg-cover bg-center h-screen`,
  overflowXHidden: 'overflow-x-hidden', 
    registerHeader: 'flex justify-between mx-[20px]  my-[10px]',
    mainContainer:'flex justify-between w-full',
    mainImage :'hidden  lg:block w-1/2 mt-[100px] text-center',
     mainRegister :'w-3/4 mx-auto lg:w-4/12 my-[10px] sm:mt-6 sm:mx-[100px] sm:ml-[150px] sm:my-[100px] ',
    
   userImg: ' sm:block mt-6',
subHeading: 'font-bold text-start text-lg   mt-6  ml-[1px] sm:text-2xl text-center  sm:text-start sm:mr-[100px] mb-2 sm:mb-3 uppercase  ',
toggleClassName:'fixed right-6 bottom-24 text-3xl border-2 p-2 rounded-full primary-bgcolor text-white cursor-pointer z-50 -mt-9',
  visibleClassName:'fixed right-0 bottom-24 mb-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-11/12 sm:w-4/12 z-50 max-h-[70vh] flex flex-col',
  chatToggle: 'fixed right-0 bottom-24 mb-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-11/12 sm:w-4/12 z-50 max-h-[70vh] flex flex-col',
  inputStyle:'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
  buttonClass:'text-primary dark:text-secondary  font-bold py-2 px-4 rounded hover:bg-primary dark:bg-secondary  hover:text-white'
  }


export default styles
