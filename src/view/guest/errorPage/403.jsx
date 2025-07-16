import {  useNavigate } from 'react-router-dom';
import { IMAGE} from '../../../components/Constants';
import AuthHeader from '../../partials/AuthHeader';

const Forbidden = () => {
  const navigate= useNavigate();

  return (
    <div className='' >
      {/* header */}
<AuthHeader/>
{/* end header */}
     <div className='w-full mx-auto my-[80px]'>
     <img src={IMAGE.forbidden} alt="" className='w-3/12 text-center  mx-auto ' />
      <p className='text-center text-[30px] mt-[70px]'>Oops, You don&apos;t have permission to access this page.

      <span className='text-primary underline text-[20px] cursor-pointer' onClick={() => navigate(-1)}
      > Go to Back</span></p>
     </div>
    </div>
  )
}

export default Forbidden
