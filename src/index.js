// import { v4 as uuidv4 } from "../src/uuid";

const addButton = document.getElementById('add');
const input = document.querySelector('.inputValue');
const itemUL = document.querySelector('.item-list');

let itemArray = [];

const insertIntoToDo = (value) =>{
    if(value === ''){
        console.log("Hey!! Add and Item.");
    }else{
        const itemObject ={
            id: uuidv4(), 
            text: value, 
            completed: false
    }
    itemArray.push(itemObject);
        
    addToLocalStorage(itemArray);
    
    input.value ='';
    }
}

addButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const val = input.value;
    insertIntoToDo(val);
    
});

const displayToScreen = (value) =>{
    itemUL.innerHTML ='';

    value.forEach(items =>{
        const complete = items.completed ? 'complete': null;
        
        const div = document.createElement('div');
        div.setAttribute("class", "item");
        div.setAttribute("data-id", items.id);
        
        div.innerHTML = `<h5 class="itemName fl ${complete}">${items.text}</h5>
        <div class="icons-container fl">
            <a class="icons delete"><i class="far fa-trash-alt"></i></a>
            <a class="icons check" id="check"><i class="far fa-check-circle"></i></a>
        </div>`;

        if(items.completed === true){
            div.firstChild.classList.add('complete');
        }
        itemUL.append(div);      

    })
}

const getFromLocalStorage = () =>{
    const ref = localStorage.getItem('itemArray');

    if(ref === 'undefined' || ref === null){
        itemArray = [];
    }else{
        itemArray = JSON.parse(ref);
        displayToScreen(itemArray); 
    }
}

const addToLocalStorage = (itemArray) =>{
    localStorage.setItem('itemArray', JSON.stringify(itemArray));
    displayToScreen(itemArray);
}


getFromLocalStorage();

const check = id =>{
    itemArray.forEach(items =>{
        if(items.id == id){
            items.completed = !items.completed;
        }
    });
    // items.parentNode.parentNode
    addToLocalStorage(itemArray);
}

const DeleteItems = id =>{
    itemArray = itemArray.filter(item =>{
        return item.id != id;
    });
    addToLocalStorage(itemArray);
}

itemUL.addEventListener('click', e =>{  

    // console.log(e.target.parentNode.classList)
    // console.log(e.target.parentNode.parentNode.parentNode.getAttribute('data-id'))
    if(e.target.parentNode.classList.contains ('delete')){
        DeleteItems((e.target.parentNode.parentNode.parentNode.getAttribute('data-id')));

    }
    if(e.target.parentNode.classList.contains('check')){
        check((e.target.parentNode.parentNode.parentNode.getAttribute('data-id')));
        e.target.parentNode.parentNode.parentNode.setAttribute('class','complete')
    }
});
