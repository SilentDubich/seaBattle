

// var obj = {
//     a: 1
// };
//
// (function(obj) {
//     obj = {
//         a: 2
//     };
//
// })(obj);
//
// console.log(obj.a);
// var arr = [2, 4, 3, 1, 2, 5, 3];
//
// function arrRepeat(arr) {
//     var count = 0;
//     for (let i = 0; i < arr.length; i++){
//         for (let j = 0; j < arr.length; j++){
//             if (arr[i] === arr[j]){
//                 count++
//             }
//         }
//         console.log('Число', arr[i], 'повторяется = ', count);
//         count = 0;
//     }
// }
//
// arrRepeat(arr);

// var str1 = 'hello';
// var str2 = 'Eho ll';
//
// function f(str1, str2) {
//     if (str1.length !== str2.length){
//         console.log('Длины не совпадают');
//     }
//     if (str1.split('').sort().join().toLowerCase() === str2.split('').sort().join().toLowerCase()){
//         console.log('Есть перестановка')
//     } else {
//         console.log('Разные слова')
//     }
//     console.log(str2.split(''));
// }
//
// f(str1,str2);

// var s = 'Mr john Smith';
// //
// // function spaceToSymbol(str) {
// //     str = str.split('');
// //     for (let i = 0; i < str.length; i++){
// //         if (str[i] === ' '){
// //             str[i] = '%20'
// //         }
// //     }
// //     str = str.join('');
// //     console.log(str)
// // }
// //
// // spaceToSymbol(s);

// var s = ['racecar'];

// function f (str) {
//     var newStr = str.split('').reverse().join('');
//     console.log(newStr);
//     if (str == newStr){
//         console.log('yes');
//     } else {
//         console.log('no')
//     }
// }
//
// f(s);

// alert(typeof s);

// var arru = [3, 5, 1, 3, 7];

// function del(arr) {
//     for (let i = 0; i < arr.length; i++){
//         if (!arr[i] === ''){
//             for (let j = 0; j < arr.length; j++){
//                 if (arr[i] === arr[j]){
//                     delete arr[j]
//                 }
//             }
//         } else {
//             arr.splice(i, 1)
//         }
//     }
//     console.log(arr)
//
// }
//
// del(arr);

// function doSmth(a) {
//     for (var q=1, i=1; q<a.length; ++q) {
//         if (a[q] !== a[q-1]) {
//             a[i++] = a[q];
//         }
//     }
//
//     a.length = i;
//     console.log(a);
//     return a;
// }
//
// doSmth(arru);
// uniqueArray = arru.filter(function(item, pos) {
//     return arru.indexOf(item) == pos;
// });

// var arr = [1, 4, 2, 5, 3];
//
// function find(arr, n) {
//     for (let i = arr.length - 1; i >= 0; i--){
//         if (arr[i] == n){
//             console.log(arr.indexOf(arr[i]));
//         }
//     }
//
// }
//
// find(arr, 2);

// const person = new Object({
//    name: 'Kirill',
//    age: 21,
//    job: 'No job',
//    iAm: function (){
//        console.log(`I am is ${this.name} and i ${this.age} years old `)
//    }
// });
//
//
// Object.prototype.sayHello= function () {
//     console.log(`Hello ${this.name}`)
// };

// let animal = {
//     eats: true
// };
//
// function Rabbit(name) {
//     this.name = name;
// }
//
// Rabbit.prototype = animal;
//
// let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
//
//
// console.log(animal);
// console.log('rab ', rabbit);

// let human = {
//     head: 1,
//     leg: 2,
//     hand: 2
// };
//
// function humanChar(name, age, job) {
//     this.name = name;
//     this.age = age;
//     this.job = job;
//
// }
//
// humanChar.prototype = human;
//
// let first = new humanChar('Kirill', 21, 'no-job');
// let second = new humanChar('Yana',21,'mother');
//
// console.log(human);
// console.log('rab ', first);
// console.log(typeof first);
// console.log(typeof humanChar);

// function hello () {
//     console.log('Hello ', this)
// }
//
// const person = {
//     name: 'kirill',
//     age: 21,
//     sayHello: hello,
// };
//
// const yana = {
//     name: 'Yana',
//     age: 21
// };
//
// person.sayHello.bind(yana)();

// var array = [1, 2, 3, 4, 5];
//
// function f(arr, n) {
//     return arr.map(function (i) {
//         return n * i;
//     })
// }
//
// console.log(f(array, 10));
//
// Array.prototype.mult = function (n) {
//     return this.map(function (i) {
//         return n * i;
//     })
// };
//
// console.log(array.mult(10));
// console.log(array.mult(20));
// console.log(array.mult(30));

// const sleep = ms => {
//     return new Promise(resolve => setTimeout(() => resolve(), ms))
// };
//
// sleep(2000).then(() => console.log('after 2 seconds'));
//
// const p = new Promise(function (resolve, reject) {
//     console.log('preparing data...');
//     setTimeout(() => {
//         const data = {
//             server: 'newServer',
//             PORT: 8080,
//             work: true
//         };
//         resolve(data)
//     }, 5000);
//
// });
//
// p.then((data) => console.log('resolved ', data));

// let array1 = [1, 2, 3, 4, 5];

// =========== bubble sort ===========
// function bubble(arr) {
//     for (let i = 0; i < arr.length; i++){
//         for (let j = 0; j < arr.length; j++){
//             if (arr[j] < arr[j + 1]){
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
//     console.log(arr);
// }
//
// bubble(array1);

// ==============================================

// const person = Object.create({
//     calculate(){
//         console.log(new Date().getFullYear() - this.birth)
//     }
// }, {
//     name:{
//         value: 'Kirill',
//         enumerable: true,
//         writable: true,
//     },
//     birth:{
//         value: 1998,
//         enumerable: true,
//         writable: true
//     },
//     age:{
//         get() {
//             return new Date().getFullYear() - this.birth
//         },
//         set(v) {
//             if (v > 1940){
//                 this.birth = v;
//                 console.log(new Date().getFullYear() - v)
//             } else {
//                 console.log('Возраст не валиден')
//             }
//         }
//     }
//
//
//
//
// });
//
// person.name = 'Yana';
//
// for (key in person){
//     if (person.hasOwnProperty(key)){
//         console.log('Key', key, person[key])
//     }
// }

//Шейкерная сортировка

// function shakeSort(arr) {
//     var left = 0;
//     var right = arr.length - 1;
//
//     while (left <= right){
//         for (let i = left; i < arr.length; i++){
//             if (arr[i] > arr[i + 1]){
//                 [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
//             }
//         }
//         left++;
//         for (let j = right; j >= 0; j--){
//             if (arr[j - 1] > arr[j]){
//                 [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
//             }
//         }
//         right--;
//     }
//     console.log(arr);
// }
//
// shakeSort(someArr);

//Сортировка расческой

// const combSort = arr => {
//     const l = arr.length;
//     const factor = 1.247;
//     let gapFactor = l / factor;
//     while (gapFactor > 1) {
//         const gap = Math.round(gapFactor);
//         for (let i = 0, j = gap; j < l; i++, j++) {
//             if (arr[i] > arr[j]) {
//                 [arr[i], arr[j]] = [arr[j], arr[i]];
//             }
//         }
//         gapFactor = gapFactor / factor;
//     }
//     console.log(arr)
// };
//
// combSort(someArr);


// Сортировка вставками

// const insertionSort = arr => {
//     for (let i = 1, l = arr.length; i < l; i++) {
//         const current = arr[i];
//         let j = i;
//         while (j > 0 && arr[j - 1] > current) {
//             arr[j] = arr[j - 1];
//             j--;
//         }
//         arr[j] = current;
//     }
//     console.log(arr);
// };
//
// insertionSort(someArr);


// class Component {
//     constructor(selector) {
//         this.$el = document.querySelector(selector)
//     }
//     hide() {
//         this.$el.style.display = 'none'
//     }
//     show() {
//         this.$el.style.display = 'block'
//     }
// }
//
// class Box extends Component{
//     constructor(options) {
//         super(options.selector);
//         this.$el.style.width = this.$el.style.height = options.size + 'px';
//         this.$el.style.background = options.color
//     }
//
//     set(value, color) {
//         this.$el.style.width = this.$el.style.height = value + 'px';
//         this.$el.style.background = color;
//     }
//
// }
//
// const box1 = new Box({
//     selector: '#box1',
//     size: 150,
//     color: 'red'
// });
//
// class Circle extends Box{
//     constructor(options) {
//         super(options);
//         this.$el.style.borderRadius = '50%'
//     }
//
//     set(value, color, radius) {
//         super.set(value, color);
//         this.$el.style.borderRadius = radius;
//     }
// }
//
// const circle = new Circle({
//     selector: '#circ1',
//     size: 300,
//     color: 'blue'
// });


// Сортировка выборкой
// var someArr = [5, 3, 2, 4, 6, 1];

// if (someArr.length % 3 !== 0){
//     console.log('Error');
// }

// console.log(Math.max.apply(null, someArr));

// function choosSort(arr) {
//     let itemToInsert;
//     let count = 0;
//     for (let i = 0; i < arr.length; i++){
//         itemToInsert = i;
//         for (let j = count; j < arr.length; j++){
//             if (arr[j] < arr[itemToInsert]){
//                 itemToInsert = j;
//             }
//         }
//         [arr[i], arr[itemToInsert]] = [arr[itemToInsert], arr[i]];
//         count++;
//     }
//     console.log(arr);
// }
//
// choosSort(someArr);

//alert(~~((4+17)/10));


// Проект эйлера
// 1-ая задача
// Если выписать все натуральные числа меньше 10, кратные 3 или 5, то получим 3, 5, 6 и 9. Сумма этих чисел равна 23.
// Найдите сумму всех чисел меньше 1000, кратных 3 или 5.

// function cratno(num, count) {
//     if (num - 1 <= 0){
//         console.log(count);
//         return;
//     }
//     if ((num - 1) % 3 === 0 || (num - 1) % 5 === 0){
//         count += num - 1;
//     }
//     return cratno(num - 1, count)
// }
//
// cratno(1000,0);


//2-ая задача
//Четные числа Фибоначчи
//Каждый следующий элемент ряда Фибоначчи получается при сложении двух предыдущих. Начиная с 1 и 2, первые 10 элементов будут:
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
// Найдите сумму всех четных элементов ряда Фибоначчи, которые не превышают четыре миллиона.

// function fibb(one, limit, count) {
//     if (count >= limit || count + one >= limit){
//         console.log(count);
//         return ;
//     }
//     if (one % 2 === 0){
//         count += one;
//     }
//     return fibb(one + 1, limit, count);
// }
//
// fibb(1, 4000000, 0);

//Задача 3
// Наибольший простой делитель
//Простые делители числа 13195 - это 5, 7, 13 и 29.
// Каков самый большой делитель числа 600851475143, являющийся простым числом?

// def simpleDividers(n):
// answer = []
// d = 2
// while d * d <= n:
// if n % d == 0:
// answer.append(d)
// n //= d
// else:
// d += 1
// if n > 1:
// answer.append(n)
// return answer

// function simpleDiv(n) {
//     let answer = [];
//     let d = 2;
//     while (d * d <= n){
//         if (n % d === 0){
//             answer.push(d);
//             n /= d;
//         } else {
//             d++;
//         }
//     }
//     if (n > 1){
//         answer.push(n);
//     }
//     console.log(answer);
// }
//
// simpleDiv(13195);

// let str = "abcabcbb";
//
// function maxLength(st) {
//     let count = 0, max = 0, arr = [];
//     for (let i = 0; i < st.length; i++){
//         if (arr.indexOf(st[i]) >= 0){
//             count = 0;
//             arr.splice(0);
//         } else {
//             count++;
//             max = Math.max(max, count);
//             arr.push(str[i]);
//         }
//     }
//     return max
// }


// 1305
//Given two binary search trees root1 and root2.
// Return a list containing all the integers from both trees sorted in ascending order.
//Input: root1 = [2,1,4], root2 = [1,0,3]
// Output: [0,1,1,2,3,4]
// let arr1 = [2, 1, 4];
// let arr2 = [1, 0, 3];
//
// function getElements(array1, array2) {
//     return array1.concat(array2).sort((a,b) => {
//         return a - b
//     });
// }


// function divide(arr, n) {
//     let newArr1 = [], newArr2 = [];
//     if (arr.length % n !== 0){
//         throw 'Impossible '
//     }
//     while (arr.length > 0){
//         if (newArr1.length < n && newArr1.indexOf(arr[0]) === -1){
//             newArr1.push(arr[0]);
//             arr.shift();
//         } else if (newArr2.length < n && newArr2.indexOf(arr[0]) === -1){
//             newArr2.push(arr[0]);
//             arr.shift();
//         }
//     }
// }
//
// divide(nums, k);

// const numbers = {
//     low: 100,
//     high: 300
// };
//
// console.log(numbers.low[0]);


// var sequentialDigits = function(low, high) {
//     let result = [];
//     for (let i = 1; i < 9; i++) {
//         helper(0, i);
//         console.log(i)
//     }
//     return result.sort((a, b) => a - b);
//
//     function helper(num, digit) {
//         if (num > high) return;
//         if (num >= low && num <= high) {result.push(num)}
//         if (digit <= 9) {
//             helper(num * 10 + digit, digit + 1)
//
//         }
//         console.log(result);
//     }
//
// };
//
// sequentialDigits(10,13000)
// let array = [10, 2, 5 , 3];
// function double(arr) {
//     for (let i = 0; i < arr.length; i++){
//         for (let j = 0; j < arr.length; j++){
//             if (arr[i] !== arr[j] && arr[i] === 2 * arr[j]){
//                 console.log('+', arr[i], arr[j]);
//                 return true;
//             }
//         }
//     }
//     console.log('-');
//     return false
// }
//
// double(array);

// let num = 14;
// function roadToZero(num) {
//     let step = 0;
//     while (num > 0){
//         if (num % 2 === 0){
//             num /= 2;
//         } else {
//             num--;
//         }
//         step++;
//     }
//     console.log(step);
//     return step;
// }
//
// roadToZero(num);

//let n = 1001;

// function noZero(n) {
//     let arr = [1, n - 1];
//     while(arr[0].toString().includes('0') || arr[1].toString().includes('0')){
//         arr[0]++;
//         arr[1]--;
//     }
//     return arr;
// }
// let s = "15#11#12";
//
// var freqAlphabets = function(s) {
//     const CHAR_CODE_OFFSET = 96;
//     let solStr = '';
//
//     for (let i = 0; i < s.length; i++) {
//         let currNumber = s[i];
//
//         if (s[i + 2] === '#') {
//             currNumber = s.slice(i, i + 2);
//             i += 2;
//         }
//
//         solStr += String.fromCharCode(parseInt(currNumber) + CHAR_CODE_OFFSET);
//     }
//
//     return solStr;
// };

// let n = 5;
// function array(n) {
//     let arr = [];
//     if (n > 2){
//         arr.push(Math.floor(Math.random() * (n * 2)));
//         arr.push(Math.floor(Math.random() * ((-n) * 2)));
//     }
//     let length = arr.length;
//     if (n !== 1){
//         for (let i = 0; i < n - length; i++){
//             let random = Math.random();
//             if (random > 0.5){
//                 arr.push(Math.floor(Math.random() * (n * 2)));
//             } else {
//                 arr.push(Math.floor(Math.random() * ((-n) * 2)));
//             }
//         }
//     }
//     return arr.sort(((a, b) => {return a - b}))
// }

// function array(n) {
//     let arr = [];
//     let count = 0;
//     let random;
//     for (let i = 0; i < n; i++){
//         random = Math.floor((((Math.random() < 0.5) ? -1 : 1)*Math.random()) * n);
//         arr.push(random);
//         count += random;
//     }
//     if (count !== 0){
//        arr[n - 1] -= count
//     }
//     return arr.sort(((a, b) => {return a - b}))
// }

// let arr = [12,345,2,6,7896];
// function f(arr) {
//     const newArr = arr.map( arr => {return arr.toString()});
//     let count = 0;
//     for (let i = 0; i < newArr.length; i++){
//         if (newArr[i].length % 2 === 0){
//             count++;
//         }
//     }
//     return count
// }


// function replace(arr) {
//     let count = 1;
//     for (let i = 0; i < arr.length; i += 1) {
//         if (i !== arr.length - 1) {
//             arr[i] = Math.max.apply(null, arr.slice(i + 1))
//         } else {
//             arr[i] = -1;
//         }
//         count++;
//     }
//
//     return arr;
// }

// let bin = [1, 0, 1];
// function binary(arr) {
//     let decim = 0;
//     for (let i = 0; i < arr.length; i++){
//         decim += arr[i] * 2 ** (arr.length - 1 - i);
//     }
//     return decim
// }

// let arr = [1,1,2,2,3,3,3,3];
//
// function quert(arr) {
//     let count = 1;
//     if (arr.length === 1){
//         return arr[0];
//     }
//     for (let i = 1; i < arr.length; i++){
//         if (arr[i] === arr[i - 1]){
//             count++;
//             if (count / arr.length > 0.25){
//                 return [count, arr[i - 1]]
//             }
//         }  else {
//             count = 1;
//         }
//     }
// }

// let n = 234;
//
// function sumMulty(n) {
//     let sum = 0, mult = 1;
//     let arr = n.toString().split('');
//     for (let i = 0; i < arr.length; i++){
//         sum += parseInt(arr[i]);
//         mult *= parseInt(arr[i]);
//     }
//     return mult - sum
// }

// let z = 3;
// let funId = 1;
//
// function result(z, funId) {
//     let result = [];
//     // let first = [1, z - 1];
//     let s = 1;
//     let e = z;
//     if (funId === 1) {
//         for (let i = 0; i < z - 1; i++){
//             if (s + e - 1 === z) {
//                 let first = [s, e - 1];
//                 result.push(first)
//             }
//             s++;
//             e--
//         }
//     } else if (funId === 2) {
//         for (let i = 0; i < z; i++){
//             if (s * e === z) {
//                 let first = [s, e];
//                 result.push(first)
//             }
//             s++;
//             e--
//         }
//     }
//     return result;
// }

// let coordinates = [[-2, -2], [-1, -1], [0, 0]];
//
// function line(coordinates) {
//     for (let i = 1; i < coordinates.length - 1; i++){
//         if (
//             coordinates[i][0] - coordinates[i - 1][0] !== coordinates[i + 1][0] - coordinates[i][0] ||
//             coordinates[i][1] - coordinates[i - 1][1] !== coordinates[i + 1][1] - coordinates[i][1]
//         ){
//             return false
//         }
//     }
//     return true
// }

// let s = "RLRRLLRLRL";
// console.log(s.match(/[R]/g).length);
//
//
// function str(s) {
//     let res = [], newStr = '';
//     for (let i = 0; i < s.length; i++){
//         newStr += s[i];
//         console.log(newStr);
//         if (newStr.indexOf('R') >= 0 && newStr.indexOf('L') >= 0){
//             if (newStr.match(/[R]/g).length === newStr.match(/[L]/g).length){
//                 res.push(newStr);
//                 newStr = '';
//             }
//         }
//     }
//     return res.length
// }

// const arr = [1, 2];
//
// function unique(arr) {
//     const newArr = [];
//     let count = 1;
//     arr.sort( (a, b) => a - b);
//     console.log(arr);
//     for (let i = 1; i < arr.length; i++){
//         if (arr[i] === arr[i - 1]){
//             count++;
//             if (i === arr.length - 1){
//                 newArr.push(count)
//             }
//         } else {
//             newArr.push(count);
//             count = 1;
//             if (i === arr.length - 1){
//                 newArr.push(count)
//             }
//         }
//     }
//     newArr.sort( (a, b) => a - b);
//     console.log(newArr);
//     for (let i = 0; i < newArr.length; i++){
//         if (newArr[i] === newArr[i + 1]){
//             return false
//         }
//     }
//     return true
// }

// const arr = [4, 2, 1, 3];
//
// function minDif(arr) {
//     const sortArr = arr.sort( (a, b) => a - b);
//     let min = sortArr[1] - sortArr[0], minDif = [];
//     if (sortArr.length !== 2){
//         for (let i = 1; i < sortArr.length; i++){
//             if (sortArr[i + 1] - sortArr[i] < min){
//                 min = sortArr[i + 1] - sortArr[i]
//             }
//         }
//     } else {
//         return sortArr
//     }
//     for (let j = 0; j < sortArr.length; j++){
//         if (sortArr[j + 1] - sortArr[j] === min){
//             minDif.push([sortArr[j], sortArr[j + 1]])
//         }
//     }
//     return minDif
// }

// let text = "nlaebolko";
// let newText = text.match(/[balloon]/g);
// console.log('new ', newText);
// let mainText = text.split('');
// console.log('main', mainText);
// for (let i = 0; i < mainText.length; i++){
//     while(mainText.indexOf(newText[i]) >= 0){
//         mainText.splice(i, 1)
//     }
// }
// console.log('main', mainText);

// let day = 17, month = 8, year = 1998;
// function date (day, month, year) {
//     let d = new Date(year, month - 1, day);
//     const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days[d.getDay()]
// }


// const distance = [1, 2, 3, 4];
// let start = 0, destination = 1;
// function minDistance(distance, start, destination) {
//     if (start > destination){
//         [start, destination] = [destination, start]
//     }
//     const total = distance.reduce((sum, current) => sum + current);
//     const cruise = distance.slice(start, destination).reduce((sum, current) => sum + current);
//     return Math.min(cruise, total - cruise)
// }

// let s = 'a', j = 'b';
//
// function includes(s, j) {
//     let count = 0;
//     for (let i = 0; i < j.length; i++){
//         if (s.includes(j.charAt(i))){
//             count++
//         }
//     }
//     return count
// }

// const arr = [1, 1, 1];
// let k  = 1;
//
// function vector(arr, k) {
//     let count = 0, max = 0;
//     if (arr.length === 1 && arr[0] === k){
//         return max + 1
//     }
//     for (let i = 0; i < arr.length; i++){
//         if (count > max){
//             max = count;
//         }
//         if (arr[i] === k){
//             count++;
//             if (i === arr.length - 1 && count > max){
//                 return max = count;
//             }
//         } else {
//             count = 0
//         }
//     }
//     return max
// }

// const arr = [2, 4, 8, 8, 8];
// function delDuplicate(arr) {
//     const someArr = [];
//     for (let i = 0; i < arr.length; i++){
//         if (someArr.indexOf(arr[i]) === -1){
//             someArr.push(arr[i])
//         }
//     }
//     return someArr
// }

// let s1 = 'qiu', s2 = 'iuq';
//
// function anagrams(s1, s2) {
//     if (s1.length !== s2.length){
//         return false
//     }
//     for (let i = 0; i < s1.length; i++){
//         if (!s1.split('').includes(s2.charAt(i))){
//             return false
//         }
//     }
//     return true
// }

// const arr1 = [6, 2 , 26, 64, 88, 96, 96],
//     arr2 = [4, 8, 20, 65, 86],
//     arr3 = [7, 1, 4, 16, 42, 58, 61, 69],
//     arr4 = [1, 84];
//
// function f(...args) {
//     let fullArr = [];
//     for (let i = 0; i < args.length; i++){
//         fullArr = fullArr.concat(args[i])
//     }
//     return fullArr.sort( ((a, b) => a - b))
// }


// Реализация односвязного списка
// function Node(data) {
//     this.data = data;
//     this.next = null;
// }
//
// function SinglyList() {
//     this._length = 0;
//     this.head = null;
// }
//
// Object.prototype.add = function(value) {
//     var node = new Node(value),
//         currentNode = this.head;
//
//     // 1-ый случай: пустой список
//     if (!currentNode) {
//         this.head = node;
//         this._length++;
//
//         return node;
//     }
//
//     // 2-ой случай: не пустой список
//     while (currentNode.next) {
//         currentNode = currentNode.next;
//     }
//
//     currentNode.next = node;
//
//     this._length++;
//
//     return node;
// };
//
// Object.prototype.searchNodeAt = function(position) {
//     var currentNode = this.head,
//         length = this._length,
//         count = 1,
//         message = {failure: 'Failure: non-existent node in this list.'};
//
//     // 1-ый случай: неверная позиция
//     if (length === 0 || position < 1 || position > length) {
//         throw new Error(message.failure);
//     }
//
//     // 2-ой случай: верная позиция
//     while (count < position) {
//         currentNode = currentNode.next;
//         count++;
//     }
//
//     return currentNode;
// };
//
// Object.prototype.remove = function(position) {
//     var currentNode = this.head,
//         length = this._length,
//         count = 0,
//         message = {failure: 'Failure: non-existent node in this list.'},
//         beforeNodeToDelete = null,
//         nodeToDelete = null,
//         deletedNode = null;
//
//     // 1-ый случай: неверная позиция
//     if (position < 0 || position > length) {
//         throw new Error(message.failure);
//     }
//
//     // 2-ой случай: первый узел удален
//     if (position === 1) {
//         this.head = currentNode.next;
//         deletedNode = currentNode;
//         currentNode = null;
//         this._length--;
//
//         return deletedNode;
//     }
//
//     // 3-ий: все прочие узлы удалены
//     while (count < position) {
//         beforeNodeToDelete = currentNode;
//         nodeToDelete = currentNode.next;
//         count++;
//     }
//
//     beforeNodeToDelete.next = nodeToDelete.next;
//     deletedNode = nodeToDelete;
//     nodeToDelete = null;
//     this._length--;
//
//     return deletedNode;
// };

// let arr = [-1,4,2,3];
//
// function nonDec(arr) {
//     let count = 0;
//     if (arr.length === 1){
//         return true
//     }
//     for (let i = 0; i < arr.length; i++){
//         if (arr[i] < arr[i + 1]){
//             count++;
//             [arr[i], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i]]
//         }
//     }
//     if (count === 1){
//         return true
//     } else {
//         return false
//     }
// }

// const arr = [1];
//
// function maxDecr(arr) {
//     let count = 1, max = 1;
//     if (arr.length === 0){
//         return max - 1
//     }
//     for (let i = 0; i < arr.length; i++){
//         if (arr[i] < arr[i + 1]){
//             count++;
//             if (count > max){
//                 max = count
//             }
//         } else {
//             if (count > max){
//                 max = count
//             }
//             count = 1
//         }
//     }
//     return max
// }



// let s = 'abca';
//
// function palin(s) {
//     const sArr = s.split('');
//     if(sArr.length === 0) {
//         return false
//     } else if (s === sArr.reverse().join('')){
//         return true
//     }
//     for (let i = 0; i < sArr.length; i++){
//         // console.log(sArr.splice(i, 1), sArr.splice(i, 1).reverse());
//         let notRev = sArr.splice(i, 1);
//         console.log(sArr);
//         if (sArr.join('') === sArr.reverse().join('')){
//
//             return true
//         }
//     }
//
//     return false
// }


// let n = 7;
// function s(n) {
//     let binary =n.toString(2).split('');
//     if (binary.length === 1){
//         return true
//     }
//     for (let i = 0; i < binary.length; i++){
//         if (binary[i] === binary[i + 1]){
//             return false
//         }
//     }
//     return true
// }

// let nums = [-1, 0, 3, 5, 9, 12];
// let target = 9;
//
// function search(nums, target) {
//     let first = 0;
//     let last = nums.length - 1;
//     let mid;
//     let found = false;
//     while(!found && first <= last){
//         mid = Math.floor((first + last) / 2);
//         if (nums[mid] === target){
//             found = true;
//             return mid
//         } else if (nums[mid] > target){
//             last = mid - 1;
//         } else {
//             first = mid + 1
//         }
//     }
//     return -1
// }

// let bits = [1, 1, 1, 0];
//
// function oneBit(bits) {
//     if (bits.length === 1){
//         return true
//     } else if (bits.length % 2 === 0 && bits[bits.length - 2] === 1){
//         return false
//     } else {
//         return true
//     }
// }

// const nums = [1, 7, 3, 6, 5, 6];
//
// function pivot(nums) {
//     let sum = nums.reduce( (total, current) => total += current);
//     for (let i = 0; i < nums.length; i++){
//         if ((sum - nums[i]) % 2 === 0){
//             if (nums.slice(0, i).reduce((total, current) => total += current) === nums.slice(i + 1, nums.length).reduce((total, current) => total += current)){
//                 return i
//             }
//         }
//     }
//     return -1
// }

// let pointer = 0;
// let s1 = 0, s2 = nums.slice(-nums.length + 1).reduce((sum, num) => sum + num, 0);
//
// while (pointer <= nums.length -1) {
//     if (s1 !== s2) {
//         s1 += nums[pointer];
//         s2 -= nums[++pointer];
//     } else {
//         return pointer;
//     }
// }
//
// return -1;


// const nums = [3, 6, 1, 0];
//
// function f(nums) {
//     if ( nums.length !== 1){
//         let newNums = nums.slice().sort((a, b) => a - b);
//         let max = newNums[newNums.length - 1];
//         if (max / newNums[newNums.length - 2] >= 2 || newNums[newNums.length - 2] === 0){
//             return nums.indexOf(max)
//         } else {
//             return -1
//         }
//     } else {
//         return 0
//     }
// }

// var rotateString = function(A, B) {
//     if (A.length !== B.length) return false;
//     if (!A && !B) return true;
//
//     for (let i = 0; i < A.length; i++) {
//         A = A.slice(1, A.length) + A.slice(0, 1); // Переносит первый символ на последнее место
//         if (A === B) return true;
//     }
//
//     return false;
// };

// let points = [[0,0],[0,1],[1,0],[0,2],[2,0]];
//
// function triangle(points) {
//     let x = [0, 0], y = [0, 0], s = 0;
//     for (let i = 0; i < points.length; i++){
//         if (points[i][1] > y[1]){
//             y = points[i]
//         }
//         if (points[i][0] > x[0]){
//             x = points[i]
//         }
//     }
//     s = (x[0] * y[1]) / 2;
//     return s
// }

// let arr = [1, 2, 2, 3];
//
// function Mono(arr) {
//     if (arr[0] < arr[arr.length - 1]){
//         for (let i = 0; i < arr.length; i++){
//             if (arr[i] > arr[i + 1]){
//                 return false
//             }
//         } return true
//     } else {
//         for (let i = 0; i < arr.length; i++){
//             if (arr[i] < arr[i + 1]){
//                 return false
//             }
//         } return true
//     }
// }

// let binary = [5, 3, 6, 2, 4, null, 8, 1, null, null, null, 7, 9];
//
// function binaryTree(binary) {
//     let binRightTree = [];
//     for (let i = 0; i < binary.length; i++){
//         if (binary[i] !== null){
//             binRightTree.push(binary[i])
//         }
//     }
//     binRightTree.sort((a, b) => a - b);
//     for (let i = 0; i < binRightTree.length; i++){
//         if (i % 2 !== 0){
//             binRightTree.splice(i, 0, null)
//         }
//     }
//     return binRightTree
// }

// let arr = [3, 1, 2, 4];
//
// function evenUnevenArr(arr) {
//     let even = [];
//     let unEven = [];
//     for (let i = 0; i < arr.length; i++){
//         if (arr[i] % 2 === 0){
//             even.push(arr[i])
//         } else {
//             unEven.push(arr[i])
//         }
//     }
//     let result = even.concat(unEven);
//     return result
// }

// let arr = [3, 1, 10], k = 4;
//
// function f(arr, k) {
//     for(let i = 0; i < arr.length; i++){
//         if(arr[i] < arr[i - 1] || arr[i] < arr[i + 1]){
//             arr[i] += k;
//
//         } else if (arr[i + 2] > arr[i + 1]) {
//             arr[i + 2] -= k;
//         } else {
//             arr[i] -= k
//         }
//     } return Math.max.apply(null, arr) - Math.min.apply(null, arr)
//
// }




// function sort(nums) {
//     for (let i = 0; i < nums.length; i++){
//         let insert = i, min = i;
//         for (let j = insert; j < nums.length; j++){
//             if (nums[min] > nums[j]){
//                 min = j;
//             }
//         }
//         [nums[insert] , nums[min]] = [nums[min], nums[insert]]
//     } return nums
//
// }
//
// function QuickSort(A)
// {
//     if (A.length == 0) return [];
//     var a = [], b = [], p = A[0];
//     for (var i = 1; i < A.length; i++)
//     { if (A[ i ] < p) a[a.length] = A[ i ];
//     else b[b.length] = A[ i ];
//     }
//     return QuickSort(a).concat( p,QuickSort(b) );
// }

// let nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
//
// function f(nums) {
//     if (nums.length === 1) return nums[0]
//
//     let left = 0; // 0 0 0 1
//     let right = nums.length - 1; // 8 4 2 2
//     let mid;
//
//     while (left < right) {
//         mid = Math.floor((right + left) / 2) | 0; // 4 2 1 1
//
//         // to stopping our while loop from running infinitely.
//         // when left and right will have a difference of 1
//         // and we calculate the mid then it will always be the same and our loop will run infinitely
//         if (left === mid) {
//             return nums[left] === nums[left-1] ? nums[right] : nums[left] // . . .
//         }
//
//         if (mid % 2 === 0) {
//
//             nums[mid] === nums[mid+1] ? (left = mid) : (right = mid) // f f
//
//         } else {
//
//             nums[mid] === nums[mid-1] ? (left = mid) : (right = mid) // . . 1
//
//         }
//
//         console.log(mid, left, right)
//     }
//     return nums[mid]
// }

// const arr = [1, 2, 3, 4, 5];
// let s = 3;
//
// function binarySearch(arr, s) {
//     let left = 0, right = arr.length - 1;
//     let mid;
//     while (left < right){
//         mid = Math.floor((left + right) / 2);
//         if (arr[mid] === s){
//             return mid
//         }
//         if (arr[mid] > s){
//             right = mid - 1;
//         } else {
//             left = mid + 1
//         }
//     }
//     return -1
// }


// let num = 14;
//
// function roadToZero(num) {
//     let count = 0;
//     while (num > 0) {
//         if (num % 2 === 0) {
//             num /= 2;
//         } else {
//             num--;
//         }
//         count++
//     }
//     return count
// }

// const arr = [0, 0];
// const arr = [-2,0,10,-19,4,6,-8];
//
// function check(arr) {
//     let double, index;
//     for (let i = 0; i < arr.length; i++){
//         double = 2 * arr[i];
//         index = arr.indexOf(double);
//         console.log(double)
//         console.log(arr.indexOf(double), i, index)
//         if (index >= 0 && index !== i){
//             return true
//         }
//     }
//     return false
// }

const grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]];

function negative(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            if (grid[i][j] < 0){
                count++
            }
        }
    }
    return count
}












