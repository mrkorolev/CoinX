import {CustomHeaderIcon} from "../components/general/CustomHeaderIcon";

export const showNotifications = (show = true) => {
    return show ? <CustomHeaderIcon hasUnread={true}/> : null
}
