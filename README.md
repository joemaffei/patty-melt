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
  [day => ([0, 6].contains(day)), () => console.log('Have a productive weekday!')],
  [day => (day > 0 && day < 6), () => console.log('Enjoy your weekend!')],
]);
```
