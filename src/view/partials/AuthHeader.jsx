import { IMAGE } from '../../components/Constants';
import styles from "../../components/styles";

const AuthHeader = () => {
  return (
    <div>
      <div className={styles.registerHeader}>
        <a href="/">
          <img
            src={IMAGE.site_logo}
            alt="Logo"
            className="sm:absolute w-32 -mt-9 mr-5 sm:w-36 sm:h-auto sm:-mt-8"
          />
        </a>

        <div className={styles.registerHeader}>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
