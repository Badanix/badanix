import { IMAGE } from './constants';
import './Preloader.css'; // Add your styles

function Preloader() {
  return (
    <div className="preloader">
    <img src={IMAGE.preloader} alt="Loading" className="spinner" />
  </div>
  );
}

export default Preloader;
