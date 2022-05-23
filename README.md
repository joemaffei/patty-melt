# patty-melt
Pattern matching in JavaScript and Typescript made simple.

## Examples

### Assign values conditionally

```js
import { pattyMelt } from 'patty-melt';

const today = (new Date()).getDay();

const dayOfTheWeek = pattyMelt(today, [
  [0, 'Sunday'],
  [1, 'Monday'],
  [2, 'Tuesday'],
  [3, 'Wednesday'],
  [4, 'Thursday'],
  [5, 'Friday'],
  [6, 'Saturday'],
]);

console.log(`Have a fantastic ${dayOfTheWeek}!`);
```

### Simplify switch statements

```js
import { pattyMelt } from 'patty-melt';
import getDayOfYear from 'date-fns/getDayOfYear';

const today = getDayOfYear(new Date());

// switch (today) {
//   case 1:
//     console.log('Happy New Year!');
//     break;
// 
//   case 45:
//     console.log('Happy Valentine\'s Day');
//     break;
//   
//   default:
//     console.log('Have a great day!');
// }

pattyMelt(today, [
  [1, () => console.log('Happy New Year!')],
  [45, () => console.log('Happy Valentine\'s Day')],
]) || console.log('Have a great day!');
```

Or, if you prefer a more familiar syntax: 

```js
import { defaultCase, pattyMelt } from 'patty-melt';
import getDayOfYear from 'date-fns/getDayOfYear';

const today = getDayOfYear(new Date());

pattyMelt(today, [
  [1, () => console.log('Happy New Year!')],
  [45, () => console.log('Happy Valentine\'s Day')],
  [defaultCase, () => console.log('Have a great day!')],
]);
```

### Match values using regular expressions

```js
import { pattyMelt } from 'patty-melt';

const today = (new Date()).toString();

pattyMelt(today, [
  [/^(Mon|Tue|Wed|Thu|Fri)/, () => console.log('Have a productive weekday!')],
  [/^(Sat|Sun)/, () => console.log('Enjoy your weekend!')],
]);
```

### Match values using functions

```js
import { pattyMelt } from 'patty-melt';

const today = (new Date()).getDay();

pattyMelt(today, [
  [day => (day > 0 && day < 6), () => console.log('Have a productive weekday!')],
  [day => ([0, 6].includes(day)), () => console.log('Enjoy your weekend!')],
]);
```

### Refactor variable reassignment with a declarative syntax

Before:

```js
const value = Math.ceil(Math.random() * 20)  - 10;

let message = '';

if (value > 0) {
    message = 'value is positive';
} else {
    message = 'value is zero or negative';
}
```

First refactor:

```js
import { pattyMelt } from 'patty-melt';

const value = Math.ceil(Math.random() * 20)  - 10;

const message = pattyMelt(value > 0, [
    [true, 'value is positive'],
    [false, 'value is zero or negative']
]);
```

Second refactor (way more declarative!):

```js
import { pattyMelt } from 'patty-melt';

const value = Math.ceil(Math.random() * 20)  - 10;

const message = pattyMelt(value, [
    [x => (x > 0), 'value is positive'],
    [x => (x <= 0), 'value is zero or negative']
]);
```
