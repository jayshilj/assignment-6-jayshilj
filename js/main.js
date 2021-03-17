//path for JSON file
const contentsPath="data/todo-list.json";
var coll = document.getElementsByClassName("collapsible");
var i;

//code for toggle effect
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
//ToDolist Class:Represents an item
class ToDolist{
  constructor(title,description,duedate,time){
      this.title =title;
      this.description =description;
      this.duedate=duedate;
      this.time=time;
  }
}

//UI Class:Handle UI tasks

class UI{
 static displayList() {
     //Adding items from JSON on list 
    const xhr= new XMLHttpRequest();
    xhr.addEventListener('load',(evt) => {
        const contents = JSON.parse(evt.target.responseText);
        console.log(contents);
        contents.forEach((items)=>UI.addItemToList(items));
    }
    );
    xhr.open('GET', contentsPath, true);
    xhr.send();
    
    
 }
//Adding items from UI on list 
static addItemToList(items){
    const list = document.querySelector('#dolist');

    const row = document.createElement('tr');
    row.innerHTML=`
    <button class="accordion" onclick="detailFunc()">${items.title}</button>
    <div class="panel">
      <p>Description: ${items.description}</p>
      <span>Due date: ${items.duedate}</span>

      <p>Time: ${items.time}</p>
      <button>complete</button><i class ="fas fa-check"></i> 
      <button>delete</button><i class ="fas fa-trash"></i> 
    </div>
    `;
    list.appendChild(row);
}
static deleteItem(el){
    if(el.outerText==='delete'){
        el.parentElement.parentElement.remove();
        
    }
}

static Tiktask(el){
if (el.outerText==='complete'){
el.parentElement.style.transition = 'all 1s ease';
el.parentElement.style.backgroundColor = 'Chartreuse';
el.parentElement.style.textDecoration = 'line-through';
el.parentElement.style.opacity = 0.5;
}
}


//function to clear textboxes after adding an item
static clearFields(){
    document.querySelector('#title').value='';
    document.querySelector('#description').value='';
    document.querySelector('#duedate').value='';
    document.querySelector('#time').value='';
}
}
//Event to display items
document.addEventListener('DOMContentLoaded',UI.displayList);

//Event to add a new item
document.querySelector('#list-form').addEventListener('submit',(e) => {
    e.preventDefault();
 const title = document.querySelector('#title').value;
 const description = document.querySelector('#description').value;
 const duedate = document.querySelector('#duedate').value;
 const time = document.querySelector('#time').value;

 const todo = new ToDolist(title,description,duedate,time);
 UI.addItemToList(todo);
 UI.clearFields();
});

//Event to remove an item after it is completed
document.querySelector('#dolist').addEventListener('click',(e) => {
    UI.deleteItem(e.target);
})


//Event to complete an item after it is completed
document.querySelector('#dolist').addEventListener('click',(e) => {

  UI.Tiktask(e.target);
  
})
