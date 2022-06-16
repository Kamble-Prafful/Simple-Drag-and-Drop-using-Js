const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-btn');

const RichestPersons = [
    'Elon Musk',
    'Bernard Arnaut',
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Gautam Adani',
    'Mukesh Ambani',
    'Larry Page',
    'Larry Ellison',
    'Sergey Brin'
];

//Store listitems
const listItems = [];

let dragStartIndex;

createList();

function createList() {
    [...RichestPersons]
    .map((a) => ({value: a, sort : (Math.random() * 10 + 1 ).toFixed(2)}))
    .sort((a, b)=> a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index)=>{
        const listItem = document.createElement('li');


        listItem.setAttribute('data-index', index);
        // console.log(Number(listItem.getAttribute('data-index'))+1);

        listItem.innerHTML = ` 
            <span class='number'>${index+1}</span>
            <div class="draggable" draggable=true >
                <p class='person-name'>${person}</p>
                <i class='fas fa-grip-lines'></i>
            </div>
            `;

            listItems.push(listItem);

            draggableList.appendChild(listItem); 
    });
    addEventListeners();
}

function dragStart(){
    // console.table('dragStart');
    // dragStartIndex = Number(this.closest('li').getAttribute('data-index'));
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

// setTimeout(() => {
//     console.log(dragStartIndex);
// }, 3000);

function dragEnter(){
    // console.table('dragEnter');
    this.classList.add('over')
    
}

function dragOver(e){
    // console.table('dragOver');
    e.preventDefault();
}

function dragLeave(){
    // console.table('dragLeave');
    this.classList.remove('over')
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    // console.table(dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over')
}

//Swap list items that are drag and drop
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].append(itemTwo);
    listItems[toIndex].append(itemOne);

}

//Check the order of list items

function checkOrder(){
     listItems.forEach((listItem, index)=>{
         const person = listItem.querySelector('.draggable').innerText.trim();
         console.log(person);

         if(person!==RichestPersons[index]){
             listItem.classList.add('wrong');
         }
         else{
             listItem.classList.remove('wrong');
             listItem.classList.add('right');
         }
     })
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItem = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    dragListItem.forEach(item => {
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
    })
}

//Check Btn configuration

checkBtn.addEventListener('click', checkOrder);