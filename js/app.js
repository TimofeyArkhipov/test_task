'use strict';

(function(){

    let name = document.querySelector(".name");
    let position = document.querySelector(".position");
    let email = document.querySelector(".email");
    let telephone = document.querySelector(".telephone");
    let btnOk = document.querySelector(".btn-ok");
    let btnOkEdit = document.querySelector(".btn-ok-edit");
    let btnDel;
    let btnEdit;


//генератор айдишников для юзеров
    function getRandomId(min, max) {
        let id;
        do {
            id = Math.floor(Math.random() * (max - min)) + min;
        } while (id===Math.floor(Math.random() * (max - min)) + min);
        return id;
    }


//фукнция констуктор создание юзера
    function addUser (name, position, email, tel) {
        this.name = name;
        this.position = position;
        this.email = email;
        this.tel= tel;
        this.id = getRandomId(1, 1000);
    }

    btnOk.addEventListener('click', () => {
        addNewUser();
    });


    //навешивание слушателей на кропки удаление и редактирование
    function liseners(user){
        btnDel = document.btnDel = document.querySelectorAll(".btn-del");
        btnEdit = document.querySelectorAll(".btn-edit");
        btnDel.forEach((item) => {
            item.addEventListener('click', (e) =>{
                deleteUser(e);
            });
        });
        btnEdit.forEach((item) => {
            item.addEventListener('click', (e) =>{
                change(e, user);
            });
        });
    }


//функция добавление
    function addNewUser(){
        btnOk.removeEventListener('click', function () {
        });
        let user = new addUser(name, position, email, telephone);
        if(validation(name, position, email, telephone)) {
            document.querySelector(".container-users").innerHTML += `
        <div class="container-users-info" data="${user.id}">
            <div class="buttons">
                <button class="btn-edit"  data="${user.id}">Ред.</button>
                <button class="btn-del"  data="${user.id}">X</button>
            </div>
            <div class="user-name"> ${name.value}</div>
            <div class="user-position">${position.value}</div>
            <span>email:</span><div class="user-email">${email.value}</div>
            <span>Телефон:</span><div class="user-tel">${telephone.value}</div>
        </div>
        `;
            name.value='';
            position.value='';
            email.value='';
            telephone.value='';
        }
        liseners(user);
    }


// функция удаление
    function deleteUser(e){
        return  e.target.parentNode.parentNode.remove();
    }


// функция редактирования
    function change(e, user) {
        document.querySelector('.title').innerText='Редактирование';
        document.querySelector('.container-users').classList.add("disabled");
        btnOk.classList.add('hidden');
        btnOkEdit.classList.remove("hidden");
        let editableName = e.target.closest('.container-users-info').querySelector('.user-name').innerText;
        let editablePosition = e.target.closest('.container-users-info').querySelector('.user-position').innerText;
        let editableEmail =  e.target.closest('.container-users-info').querySelector('.user-email').innerText;
        let editableTel = e.target.closest('.container-users-info').querySelector('.user-tel').innerText;
        name.value = editableName;
        position.value = editablePosition;
        email.value = editableEmail;
        telephone.value = editableTel;

        btnOkEdit.addEventListener('click', () =>{
            if(validation(name, position, email, telephone)) {
                e.target.closest(".container-users-info").innerHTML = `
               <div class="buttons">
                  <button class="btn-edit"  data="${user.id}">Ред.</button>
                  <button class="btn-del"  data="${user.id}">X</button>
                </div>
                <div class="user-name"> ${name.value}</div>
                <div class="user-position">${position.value}</div>
                <span>email:</span><div class="user-email">${email.value}</div>
                <span>Телефон:</span><div class="user-tel">${telephone.value}</div>
                `;
                name.value = '';
                position.value = '';
                email.value = '';
                telephone.value = '';

                btnOkEdit.classList.add('hidden');
                btnOk.classList.remove("hidden");
                document.querySelector('.title').innerText = 'Добавление';
                document.querySelector('.container-users').classList.remove("disabled");
            }
            liseners(user);
        });
    }


//валидация формы
    function validation(name, position, email, tel){
        let namePattern = new RegExp("^[A-Za-zА-Яа-яЁё]+(\\s+[A-Za-zА-Яа-яЁё])");
        let positionPattern = new RegExp("^[A-Za-zА-Яа-яЁё]{5,}$");
        let telPattern = new RegExp("^([+]?[0-9\\s-\\(\\)]{3,25})$");
        let emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let res = true;

        if(namePattern.test(name.value)) {
            name.classList.remove('alert')
        } else {
            name.classList.add('alert');
            res = false;
        }
        if(positionPattern.test(position.value)){
            position.classList.remove('alert');
        }else{
            position.classList.add('alert');
            res = false;
        }
        if(emailPattern.test(email.value)){
            email.classList.remove('alert');
        }else{
            email.classList.add('alert');
            res = false;
        }
        if (telPattern.test(tel.value)){
            tel.classList.remove('alert');
        }else{
            tel.classList.add('alert');
            res = false;
        }
        return res;
    }

})();
