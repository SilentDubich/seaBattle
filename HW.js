function palindrom(word) {
    var str = word.toLowerCase();
    var newStr = str.split("").reverse().join("");
    if (str == newStr){
        console.log(str + ' - Это палиндром')
    } else{
        console.log(str + ' - Это не палиндром')
    }
//hfshfsuihfsuiuhi
}

// palindrom('racecar');
// palindrom('Anna');
// palindrom('jet');
// palindrom('самолет');
// palindrom('Анна');


// Требуется написать функцию, выводящую в консоль числа от 1 до n,
// где n — это целое число, которая функция принимает в качестве параметра, с такими условиями:
//
// вывод fizz вместо чисел, кратных 3;
// вывод buzz вместо чисел, кратных 5;
// вывод fizzbuzz вместо чисел, кратных как 3, так и 5.
//
// Пример
//
// Fizzbuzz(5)
//
// Результат

// 1
// 2
// fizz
// 4
// buzz

function fizz(n) {
    for (var i = 1; i <= n; i++){
        if(i % 5 === 0 && i % 3 === 0){
        console.log(i + ' - FizzBuzz');
        } else if (i % 3 === 0){
            console.log(i + ' - Fizz');
        } else if (i % 5 === 0){
            console.log(i + ' - Buzz');
        }
        else{
            console.log(i + ' - Ничему не кратно');
        }
    }
}


// fizz(100);

// //     Шахматная доска.
// //     Напишите программу, создающую строку,
// //     содержащую решётку 8х8, в которой линии разделяются символами новой строки.
// //     На каждой позиции либо пробел, либо #.
// //     В результате должна получиться шахматная доска.

function chess(size) {
    var board = '';
    for (var y = 0; y < size; y++){
        for (var x = 0; x < size; x++){
            if ((x + y) % 2 === 0){
                board += '#';
            }else{
                board += ' ';
            }
        }
        board += '\n';
    }
    console.log(board);
}

// chess(16);

// Минимум.

// Напишите функцию min, принимающую два аргумента, и возвращающую минимальный из них.

function min(x, y) {
        var min = Math.min(x, y);
        console.log('Min = ' + min);
}

// min(10,20);

//     Рекурсия.

//     Ноль чётный.
//     Единица нечётная.
//     У любого числа N чётность такая же, как у N-2.
//     Напишите рекурсивную функцию isEven согласно этим правилам.
//     Она должна принимать число и возвращать булевское значение.
//     Потестируйте её на 50 и 75.
//     Попробуйте задать ей -1.
//     Почему она ведёт себя таким образом?
//     Можно ли её как-то исправить?

function iseven(x) {
    if (x % 2 !== 0){
        return false;
    } else if (x % 2 === 0){
        return true;
    } else{
        return iseven(x - 2);
    }
}

// console.log(iseven(-1));

//     Считаем бобы.

//     Символ номер N строки можно получить, добавив к ней .charAt(N) ( “строчка”.charAt(5) ) –
//     схожим образом с получением длины строки при помощи .length.
//     Возвращаемое значение будет строковым, состоящим из одного символа (к примеру, “к”).
//     У первого символа строки позиция 0, что означает, что у последнего символа
//     позиция будет string.length – 1. Другими словами, у строки из двух символов длина 2,
//     а позиции её символов будут 0 и 1.Напишите функцию countBs, которая принимает строку в качестве аргумента,
//     и возвращает количество символов “B”, содержащихся в строке.
//     Затем напишите функцию countChar, которая работает примерно как countBs,
//     только принимает второй параметр — символ, который мы будем искать в строке
//     (вместо того, чтобы просто считать количество символов “B”). Для этого переделайте функцию countBs.

function countBs(x, search) {
    var count = 0;
    search = search.toUpperCase();
    x = x.toUpperCase();
    console.log(x);
    for (var i = 0; i < x.length; i++){
        if (x.charAt(i) === search){
             count++;
        } else{
            // count++;
        }
    }
    console.log('count = ' + count);
}

// countBs('a bBbbBBbb sdfes b sf', 'f');

//     Сумма диапазона.

//     Напишите функцию range, принимающую два аргумента,
//     начало и конец диапазона, и возвращающую массив,
//     который содержит все числа из него,
//     включая начальное и конечное.
//     Затем напишите функцию sum, принимающую массив чисел и возвращающую их сумму.
//     Запустите указанную выше инструкцию и убедитесь, что она возвращает 55.
//     В качестве бонуса дополните функцию range,
//     чтобы она могла принимать необязательный третий аргумент – шаг для построения массива.
//     Если он не задан, шаг равен единице. Вызов функции range(1, 10, 2) должен будет вернуть [1, 3, 5, 7, 9].
//     Убедитесь, что она работает с отрицательным шагом так, что вызов range(5, 2, -1) возвращает [5, 4, 3, 2].

function range(start, last, step) {
    var massiv = [];
    if (step < 0){
        for (var i = start; i >= last; i += step){
            massiv.push(i);
        }
    } else{
        for (var i = start; i <= last; i += step){
            massiv.push(i);
        }
    }

    console.log(massiv);
    return massiv ;
}

// range(1,5,2);

function sum(massiv) {
    var sum = 0;
    for (var i = 0; i < massiv.length; i++){
        sum += massiv[i];
    }
    console.log(sum);

}

// range(1,10,1);

//     Обращаем массив вспять.

//     Напишите две функции, reverseArray и reverseArrayInPlace.
//     Первая получает массив как аргумент и выдаёт новый массив, с обратным порядком элементов.
//     Вторая работает как оригинальный метод reverse – она меняет порядок элементов на обратный в том массиве,
//     который был ей передан в качестве аргумента. Не используйте стандартный метод reverse.

function reverseArray(array) {
    var newArray = [];
    for (var i = array.length; i > 0; i--){
        newArray.push(i);
    }
    console.log(array);
    console.log(newArray);
}

// reverseArray([1,2,3,4,5]);

function reverseArrayInPlace(array) {
    array.reverse();
    console.log(array);
}

// reverseArrayInPlace([1,2,3,4,5,6]);

function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) {
        array.push(node.value);
    }
    return array;
}

function prepend(value, list) {
    return {value, rest: list};
}

function nth(list, n) {
    if (!list) return undefined;
    else if (n == 0) return list.value;
    else return nth(list.rest, n - 1);
}

// console.log(arrayToList([10, 20]));
// // → {value: 10, rest: {value: 20, rest: null}}
// console.log(listToArray(arrayToList([10, 20, 30])));
// // → [10, 20, 30]
// console.log(prepend(10, prepend(20, null)));
// // → {value: 10, rest: {value: 20, rest: null}}
// console.log(nth(arrayToList([10, 20, 30]), 1));
// // → 20

function numberToString(n, base) {

let result = "", sign ='';
if (n < 0) {
    sign = "-";
    n = -n;
}

do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
} while (n > 0);
return sign + result;
}
// console.log(numberToString(13, 8));


//     Свертка.
//     Используйте метод reduce в комбинации с concat для свёртки
//     массива массивов в один массив, у которого есть все элементы входных массивов.
function reduse(arr) {
    var array = arr;

    console.log(array.reduce((flat, current) => flat.concat(current), []));
}

// reduse([[1, 2, 3] , [4, 5, 6] , [7, 8, 9]]);


