/** It represents the relative time result object. */
export interface RelativeTime {
    seconds: number
    minutes: number
    hours: number
    days: number
    weeks: number
    months: number
    years: number
    isPast: boolean
}

/** It represents the relative time suffixes. */
export interface RelativeTimeSuffixes {
    second?: string
    minute?: string
    hour?: string
    day?: string
    week?: string
    month?: string
    year?: string
    seconds?: string
    minutes?: string
    hours?: string
    days?: string
    weeks?: string
    months?: string
    years?: string
    past?: string
    future?: string

    [key: string]: string | undefined
}

const SUFFIXES: RelativeTimeSuffixes = {
    second: "second",
    minute: "minute",
    hour: "hour",
    day: "day",
    week: "week",
    month: "month",
    year: "year",
    seconds: "seconds",
    minutes: "minutes",
    hours: "hours",
    days: "days",
    weeks: "weeks",
    months: "months",
    years: "years",
    yesterday: "yesterday",
    past: "ago",
    future: "from now"
}

function getDaysInMonth (year: number, month: number) {
    const ndate = new Date(0)
    ndate.setFullYear(year, month, 0)
    ndate.setHours(0, 0, 0, 0)
    return ndate.getDate()
}

function format (v: number, s1: string, s2: string, s3: string) {
    const s = v === 0 || v === 1 ? s1 : s2
    return v + " " + s + " " + s3
}

/** It returns a new instance of the relative time library. */
export function RelativeTime () {
    let suffixes: RelativeTimeSuffixes
    let currentDate: number | string | Date

    /** It sets current datetime value. */
    function setCurrentDate (value: number | string | Date) {
        currentDate = value
    }

    /** It sets the relative suffixes for the readable format. */
    function setSuffixes (value: RelativeTimeSuffixes) {
        suffixes = value
    }

    /** It returns the relative time object with their numeric values. */
    function relativize (datetime: number | string | Date, short = false): RelativeTime {
        const date = new Date(datetime)
        const then = date.getTime()

        let now = new Date().getTime()
        if (currentDate) {
            now = new Date(currentDate).getTime()
        }

        const secs = (now - then) / 1000 * -1
        const isPast = secs < 0

        const second = 1000
        const minute = 60 * second
        const hour = minute * 60
        const day = hour * 24
        const week = day * 7
        const month = day * getDaysInMonth(date.getFullYear(), date.getMonth())
        const year = month * 12
        let ms = Math.abs(then - now)

        let years = 0
        let months = 0
        let weeks = 0

        if (!short) {
            years = parseInt((ms / year).toString(), 10)
            ms -= years * year

            months = parseInt((ms / month).toString(), 10)
            ms -= months * month

            weeks = parseInt((ms / week).toString(), 10)
            ms -= weeks * week
        }

        const days = parseInt((ms / day).toString(), 10)
        ms -= days * day

        const hours = parseInt((ms / hour).toString(), 10)
        ms -= hours * hour

        const minutes = parseInt((ms / minute).toString(), 10)
        ms -= minutes * minute

        const seconds = parseInt((ms / second).toString(), 10)
        ms -= seconds * second

        return { seconds, minutes, hours, days, weeks, months, years, isPast }
    }

    /** It returns the relative time in human readable format. E.g. 2 days ago, yesterday, 3 months from now */
    function humanize (datetime: number | string | Date, short = false) {
        const v = relativize(datetime, short)

        const opts: Required<RelativeTimeSuffixes> = [ SUFFIXES, suffixes || {} ].reduce((a, b) => {
            Object.keys(b).forEach((k) => (a[k] = b[k]))
            return a
        }, {}) as Required<RelativeTimeSuffixes>

        const s2 = v.isPast ? opts.past : opts.future

        if (!short) {
            if (v.years) return format(v.years, opts.year, opts.years, s2)
            if (v.months) return format(v.months, opts.month, opts.months, s2)
            if (v.weeks) return format(v.weeks, opts.week, opts.weeks, s2)
        }

        if (v.days) {
            if (short) {
                return v.days + "d"
            }
            if (v.days === 1) {
                return opts.yesterday
            }
            return format(v.days, opts.day, opts.days, s2)
        }
        if (v.hours) {
            if (short) {
                return v.hours + "h"
            }
            return format(v.hours, opts.hour, opts.hours, s2)
        }
        if (v.minutes) {
            if (short) {
                return v.minutes + "min"
            }
            return format(v.minutes, opts.minute, opts.minutes, s2)
        }
        // seconds by default
        if (short) {
            return v.seconds + "s"
        }
        return format(v.seconds, opts.second, opts.seconds, s2)
    }

    return {
        humanize,
        relativize,
        setCurrentDate,
        setSuffixes
    }
}
