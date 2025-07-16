import { RiCustomerService2Fill } from "react-icons/ri"
import Chat from "./Chat"
import styles from "./styles"

const AuthChat = () => {
  return (
    <div>
         <Chat ChatIcon={RiCustomerService2Fill} visibleClassName={styles.visibleClassName}
         toggleClassName={styles.toggleClassName}
          size={45} />
    </div>
  )
}

export default AuthChat