import { RelativeTime, RelativeTimeSuffixes } from "../src"
import { test } from "briefest"

test("should be valid relative date time numeric", (t, done) => {
    const h = RelativeTime()
    h.setCurrentDate(new Date("2020-12-24T22:14:00.431Z"))

    const v = h.relativize("2020-12-24T01:28:37Z")
    t.isEqual(v.seconds, 23)
    t.isEqual(v.minutes, 45)
    t.isEqual(v.hours, 20)
    t.isEqual(v.days, 0)
    t.isEqual(v.weeks, 0)
    t.isEqual(v.months, 0)
    t.isEqual(v.years, 0)
    t.isEqual(v.isPast, true)

    done()
})

test("should be valid relative date time string", (t, done) => {
    const suffixes: RelativeTimeSuffixes = {
        second: "segundo",
        seconds: "segundos",
        minute: "minuto",
        minutes: "minutos",
        hour: "hora",
        hours: "horas",
        day: "día",
        days: "dias",
        week: "semana",
        weeks: "semanas",
        month: "mes",
        months: "meses",
        year: "año",
        years: "años",
        past: "atrás",
        yesterday: "ayer",
        future: "desde ahora"
    }

    const h = RelativeTime()
    h.setCurrentDate(new Date("2020-12-24T22:14:00.431Z"))
    h.setSuffixes(suffixes)

    t.isEqual(h.humanize("2020-12-24T01:28:37Z"), "20 horas atrás")
    t.isEqual(h.humanize("2020-12-24T00:00:37Z"), "22 horas atrás")
    t.isEqual(h.humanize("2020-12-23T21:58:37Z"), "ayer")
    t.isEqual(h.humanize("2020-12-20T19:26:10Z"), "4 dias atrás")
    t.isEqual(h.humanize("2021-01-10T23:57:10Z"), "2 semanas desde ahora")
    t.isEqual(h.humanize("2020-02-03T23:57:10Z"), "10 meses atrás")
    t.isEqual(h.humanize("2022-07-31T23:57:10Z"), "1 año desde ahora")

    done()
})
