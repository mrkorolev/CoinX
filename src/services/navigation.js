import {CustomHeaderIcon} from "../components/general/components/CustomHeaderIcon";

export const showNotifications = (show = true) => {
    return show ? <CustomHeaderIcon hasUnread={true}/> : null
}
