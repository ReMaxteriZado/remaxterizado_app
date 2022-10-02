import moment from "moment";
import state from "./store/state";

export const func = {
	formatFilters(id) {
		const form = document.getElementById(id)
		let formProps = null

		if (form != undefined) {
			const formData = new FormData(form)

			formProps = Object.fromEntries(formData)
		}

		return formProps
	},
    checkUserHasPermission(permission) {
        if (state.userLogged.role.name == "super_admin") {
            return true;
        }

        if (permission != "all") {
            let hasPermission = false;
            const module = permission.split("-")[0];
            const action = permission.split("-")[1];

            JSON.parse(localStorage.getItem("user_permissions")).forEach(
                (user_permission) => {
                    if (
                        user_permission.permission.name.toUpperCase() ==
                            module.toUpperCase() &&
                        user_permission[action]
                    ) {
                        hasPermission = true;
                    }
                }
            );

            return hasPermission;
        } else {
            return true;
        }
    },
    exportCSV(target) {
        target.exportCSV();
    },
    formatDate(date, format = "DD/MM/YYYY HH:mm:ss") {
        moment.locale("es");

        if (typeof date === "string") {
            if (date.includes("/")) {
                return moment(date, "DD/MM/YYYY").format(format);
            }

            if (date.includes(":")) {
                return moment(date, "HH:mm:ss").format(format);
            }

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
    dayOfTheYear(date) {
        if (typeof date === "string") {
            date = new Date(date);
        }

        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);

        return day;
    },
    differenceBetweenDates(date1, date2) {
        if (typeof date1 === "string") {
            date1 = new Date(date1);
        }

        if (typeof date2 === "string") {
            date2 = new Date(date2);
        }

        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    },
    addOneDay(date) {
        if (typeof date === "string") {
            date = new Date(date);
        }

        let date_edited = date.setHours(0, 0, 0, 0);
        date_edited = new Date(date_edited);

        date_edited.setDate(date_edited.getDate() + 1);

        return date_edited;
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
