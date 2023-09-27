import {NotificationAlert} from "../components/general/NotificationAlert";

export const showNotifications = (show = true) => {
    return show ? <NotificationAlert hasUnread={true}/> : null
}