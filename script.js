'use strict';
window.addEventListener("DOMContentLoaded", () => {
    const englishInput = document.querySelector('#english');
    const russianInput = document.querySelector('#russian');
    const add = document.querySelector('#add');
    const table = document.querySelector('.table');
    let storageArray = [];



    add.addEventListener('click', () => {
        storageArray.push(localStor());
        localStorage.setItem('key', JSON.stringify(storageArray));
        englishInput.value = '';
        russianInput.value = '';
        table.innerHTML = '';
        takeDataFromLocal();
    });

    function takeDataFromLocal() {
        storageArray = JSON.parse(localStorage.getItem('key'))
        if (storageArray != null) {
            storageArray.forEach(elem => {
                let ul = document.createElement('ul');
                ul.id = elem.id;
                table.appendChild(ul);
                createLI(elem.englishWord, ul);
                createLI(elem.russianWord, ul);
                createLIChecked(ul);
                createLIDelete(ul);
                checkMark(ul);
            });
        } else if (storageArray == null) {
            storageArray = [];
        }
    }
    takeDataFromLocal();

    function localStor() {
        return {
            englishWord: englishInput.value ? englishInput.value : 'Введите слово на английском',
            russianWord: russianInput.value ? russianInput.value : 'Введите слово на русском',
            id: (Math.random() * 15.72).toFixed(2),
            done: false
        };
    }

    function createLI(input, ul) {
        let li = document.createElement('li');
        li.innerHTML = input;

        ul.appendChild(li);
        editLI(li);
    }

    function createLIDelete(ul) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        ul.appendChild(li);
        a.href = '#';
        a.innerHTML = 'удалить';
        li.appendChild(a);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            ul.remove();
            storageArray = JSON.parse(localStorage.getItem('key'))
            for (let elem of storageArray) {
                if (elem.id == ul.id) {
                    storageArray.splice(storageArray.indexOf(elem), 1);
                }
            }
            localStorage.setItem('key', JSON.stringify(storageArray));
        });
    }

    function createLIChecked(ul) {
        let li = document.createElement('li');
        let button = document.createElement('button');
        ul.appendChild(li);
        button.innerHTML = 'отметить';
        li.appendChild(button);
        button.addEventListener('click', () => {
            storageArray = JSON.parse(localStorage.getItem('key'))
            for (let item of storageArray) {
                if (!item.done && item.id == ul.id) {
                    item.done = true;
                    checked(ul);
                } else if (item.done && item.id == ul.id) {
                    item.done = false;
                    notChecked(ul);
                }
            }
            localStorage.setItem('key', JSON.stringify(storageArray));
        });

    }

    function checkMark(ul) {
        storageArray = JSON.parse(localStorage.getItem('key'))
        for (let item of storageArray) {
            if (!item.done && item.id == ul.id) {
                notChecked(ul);
            } else if (item.done && item.id == ul.id) {
                checked(ul);
            }
        }
    }

    function notChecked(ul) {
        for (let li of ul.children) {
            li.classList.remove('blackColor');
            li.classList.remove('blackBorder');
            if (li.firstChild.tagName == 'A') {
                li.firstChild.classList.remove('blackColor');
            }
            ul.classList.remove('wheatBack');
        }
    }

    function checked(ul) {
        for (let li of ul.children) {
            li.classList.add('blackColor');
            li.classList.add('blackBorder');
            if (li.firstChild.tagName == 'A') {
                li.firstChild.classList.add('blackColor');
            }
            ul.classList.add('wheatBack');
        }
    }

    function editLI(li) {
        li.addEventListener('dblclick', function func(e) {
            let input = document.createElement('input');
            if (li.innerHTML != '<input>' && e.target.tagName != 'A') {
                storageArray = JSON.parse(localStorage.getItem('key'))
                for (let elem of storageArray) {
                    if (elem.englishWord == li.innerHTML) {
                        input.value = li.innerHTML;
                        li.innerHTML = '';
                        li.appendChild(input);
                        input.addEventListener('blur', () => {
                            li.innerHTML = input.value;
                            elem.englishWord = input.value;
                            li.addEventListener('dblclick', func);
                            localStorage.setItem('key', JSON.stringify(storageArray));
                        });
                    } else if (elem.russianWord == li.innerHTML) {
                        input.value = li.innerHTML;
                        li.innerHTML = '';
                        li.appendChild(input);
                        input.addEventListener('blur', () => {
                            li.innerHTML = input.value;
                            elem.russianWord = input.value;
                            li.addEventListener('dblclick', func);
                            localStorage.setItem('key', JSON.stringify(storageArray));
                        });
                    }
                }
            }
            li.removeEventListener('dblclick', func);
        });

    }

});