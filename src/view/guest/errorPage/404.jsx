import {  useNavigate } from 'react-router-dom';
import { IMAGE} from '../../../components/Constants';
import AuthHeader from '../../partials/AuthHeader';

const NotFound = () => {
  const navigate= useNavigate();

  return (
    <div className='' >
      {/* header */}
<AuthHeader/>
{/* end header */}
     <div className='w-full mx-auto my-[80px]'>
     <img src={IMAGE.notfound} alt="" className='w-3/12 text-center  mx-auto ' />
      <p className='text-center text-[30px] mt-[70px]'>Sorry! The page you’re looking for cannot be found.
      <span onClick={()=>navigate(-1)} className='text-primary underline text-[20px] cursor-pointer'> Go to Back</span></p>
     </div>
    </div>
  )
}

export default NotFound
