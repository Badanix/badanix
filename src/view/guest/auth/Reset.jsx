import AuthHeader from '../../partials/AuthHeader';
import { IMAGE } from '../../../components/Constants';


import { FaUserTie } from "react-icons/fa";


import styles from '../../../components/styles';



import AuthChat from '../../../components/AuthChat';
import { useFormValidation } from './formValidation';




const Reset = () => {
  const { formData, errors,  handleChange,handleSubmit  } = useFormValidation(true,);
 

  return (
   <div>
{/* header */}
<AuthHeader/>
{/* end header */}
      <main className={styles.mainContainer}>
      <section className={`${styles.mainImage} flex flex-col items-center justify-center h-screen`}>   
         <div className="flex-grow">
         <img src={IMAGE.patientImg} alt=""className=' inset-0 w-full max-h-full object-cover -mt-[170px]' />
        </div>
        </section>
    <section className={styles.mainRegister}>
         <div className=' flex justify-between border-b border-gray-200 sm:max-w-[30rem] mr-7 mb-4 primary-color'>
  <h1 className='font-bold text-2xl text-start sm:mr-4 mb-3 '>
  Reset your password

  </h1>
< FaUserTie className='mt-2 ' size={25}/>
</div>
  
    <form className="w-full max-w-lg" autoComplete="off" onSubmit={handleSubmit}>
  

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-[14px] font-bold mb-2  font-[DM Serif Text] font-[500]" htmlFor="grid-password">
            Password
          </label>
          <input
    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    autoComplete="off"
    id="grid-password"
    type="password"
    placeholder="******************"
    name="password"
    value={formData.password}
    onChange={handleChange}
/>


        {formData.password === '' && <p className="text-red-500 text-xs italic">Password is required</p>}
        
        {formData.password.length > 4 && !errors.password && <p className="text-green-500 text-xs italic">Your password looks good</p>}
        
        {formData.password.length > 0 && formData.password.length <= 4 && !errors.password && <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you like</p>}
   
    
    
        </div>
        <div className="w-full px-3 mt-6">
          <label className="block uppercase tracking-wide text-gray-700 text-[14px] font-bold mb-2  font-[DM Serif Text] font-[500]" htmlFor="grid-confirm">
          Confirm  Password
          </label>
          <input
    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    autoComplete="off"
    id="grid-confirm"
    type="password"
    placeholder="******************"
    name="confirm"
    value={formData.confirm}
    onChange={handleChange}
/>


        
        {formData.confirm === formData.password && <p className="text-green-500 text-xs italic">Confirm Password matches password</p>}
        
        {formData.confirm !== formData.password &&<p  className="text-red-500 text-xs italic">Password confirmation doesn&apos;t match Password</p>}
   
    
    
        </div>
      </div>
      



     
      <button type="submit" className={`w-full p-3 rounded-[20px] bg-transparent border-2 primary-border-color border-b-[9px]  mt-9  ${styles.buttonClass}`}>
      Reset Password
</button>
<p className='text-end'>want to cancel? <a href="auth-login" className='primary-color'>Click Here</a></p>

       
    </form>
    </section>
  
 

    


      </main>
      <div className="relative">
      <AuthChat/>

    </div>
      </div>
  );
};

export default Reset;
