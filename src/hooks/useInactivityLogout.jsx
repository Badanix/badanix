import { useEffect } from 'react'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useInactivityLogout = (timeout = 1 * 60 * 100000) => { 
  const navigate = useNavigate();
  
  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(async () => {
        let countdown = 5;

        const { isConfirmed } = await Swal.fire({
          title: 'You will be logged out due to inactivity',
          icon: 'warning',
          html: `You will be logged out in <b>${countdown}</b> seconds`,
          showCancelButton: true,
          confirmButtonText: 'Stay logged in',
          cancelButtonText: 'Log out',
          timer: countdown * 100000,
          timerProgressBar: true,
          didOpen: () => {
            const countdownInterval = setInterval(() => {
              countdown -= 1;
              if (Swal.getHtmlContainer()) {
                Swal.getHtmlContainer().querySelector('b').textContent = countdown;
              }
              if (countdown <= 0) {
                clearInterval(countdownInterval);
              }
            }, 100000);
            Swal.getCancelButton().onclick = () => clearInterval(countdownInterval);
          }
        });

        if (isConfirmed) {
          resetTimer();
        } else {
          localStorage.clear();
          navigate('/auth-login');
        }
      }, timeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    
    resetTimer();
    
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(logoutTimer);
    };
  }, [timeout, navigate]);
};

export default useInactivityLogout;
