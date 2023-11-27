import NotificationContext from "../AnecdoteContext"
import { useContext } from "react"
const Notification = ( ) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const [notification, dispatch] = useContext(NotificationContext)
  console.log(notification)
  if (!notification) return null

  return (
    <div style={style}>
      <div>{notification}</div>
    </div>
  )
}

export default Notification
