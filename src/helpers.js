import store from "./store";
import moment from "moment";

export const func = {
    checkUserHasPermission(permission, action = "read") {
        if (store.state.userLogged.role.name == "super_admin") {
            return true;
        }

        const permissions = store.state.userLogged.role.permissions;
        let hasPermission = false;

        permissions.forEach(p => {
            if (p.permission.name == permission && p[action] == 1) {
                hasPermission = true;
            }
        });

        return hasPermission;
    },
    formatFilters(id) {
        const form = document.getElementById(id)
        let formProps = null

        if (form != undefined) {
            const formData = new FormData(form)

            formProps = Object.fromEntries(formData)
        }

        return formProps
    },
    formatDate(date, format = "DD/MM/YYYY HH:mm:ss") {
        moment.locale("es");

        if (typeof date === "string") {
            date = new Date(date);
        }

        return moment(date).format(format);
    },
    convertDateTimeZone(date, format = "DD/MM/YYYY HH:mm:ss") {
        // const moment = require("moment-timezone");
        moment.locale("es");

        const timezone = this.currentTimeZone();
        let format_date = moment.tz(date, timezone).format();

        format_date = new Date(
            format_date.toLocaleString("en-US", {
                timeZone: timezone,
            })
        );

        return moment(format_date).format(format);
    },
    currentTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    pushIdsToArray(array, rows) {
        let ids = [];

        array.forEach((item, index) => {
            if (index < rows) {
                ids.push(item.id);
            }
        });

        return ids;
    },
};
