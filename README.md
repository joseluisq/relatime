# Relatime [![Build Status](https://travis-ci.com/joseluisq/relatime.svg?token=qB1iXZPP7iKjyeqfe4pA&branch=master)](https://travis-ci.com/joseluisq/relatime) [![npm](https://img.shields.io/npm/v/relatime.svg)](https://www.npmjs.com/package/relatime) [![npm](https://img.shields.io/npm/dt/relatime.svg)](https://www.npmjs.com/package/relatime) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> Make date times in human readable format.

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add relatime
```

[NPM](https://www.npmjs.com/)

```sh
npm install relatime
```

[UMD](https://github.com/umdjs/umd/) file is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/relatime/relatime.umd.min.js"></script>
```

You can use the library via `window.relatime`.

## Usage

```ts
import { RelativeTime } from "relatime"

const h = RelativeTime()

// NOTE: just skip this line to use system date time
h.setCurrentDate(new Date("2020-12-24T22:14:00.431Z"))

console.log(h.humanize("2020-12-24T01:28:37Z"))
// 20 hours ago
console.log(h.humanize("2020-12-24T00:00:37Z"))
// 22 hours ago
console.log(h.humanize("2020-12-23T21:58:37Z"))
// yesterday
console.log(h.humanize("2020-12-20T19:26:10Z"))
// 4 days ago
console.log(h.humanize("2021-01-10T23:57:10Z"))
// 2 weeks from now
console.log(h.humanize("2020-02-03T23:57:10Z"))
// 10 months ago
console.log(h.humanize("2022-07-31T23:57:10Z"))
// 1 year from now
```

#### Using specific suffixes

```ts
import { RelativeTime } from "relatime"

// Spanish suffixes
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
// NOTE: just skip this line to use system date time
h.setCurrentDate(new Date("2020-12-24T22:14:00.431Z"))
h.setSuffixes(suffixes)

console.log(h.humanize("2020-12-24T01:28:37Z"))
// 20 horas atrás
console.log(h.humanize("2020-12-24T00:00:37Z"))
// 22 horas atrás
console.log(h.humanize("2020-12-23T21:58:37Z"))
// ayer
console.log(h.humanize("2020-12-20T19:26:10Z"))
// 4 dias atrás
console.log(h.humanize("2021-01-10T23:57:10Z"))
// 2 semanas desde ahora
console.log(h.humanize("2020-02-03T23:57:10Z"))
// 10 meses atrás
console.log(h.humanize("2022-07-31T23:57:10Z"))
// 1 año desde ahora
```

#### Returning relative time values

```ts
import { RelativeTime } from "relatime"

const h = RelativeTime()
// NOTE: just skip this line to use system date time
h.setCurrentDate(new Date("2020-12-24T22:14:00.431Z"))

console.log(h.relativize("2020-12-20T01:28:37Z"))
// { seconds: 23, minutes: 45, hours: 20, days: 4, weeks: 0, months: 0, years: 0, isPast: true }
```

## Contributions

Feel free to send some [Pull request](https://github.com/joseluisq/relatime/pulls) or [issue](https://github.com/joseluisq/relatime/issues).

## License

MIT license

© 2020-present [Jose Quintana](http://git.io/joseluisq)
