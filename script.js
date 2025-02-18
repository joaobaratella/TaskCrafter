document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const input = document.getElementById("write");
  const ul = document.getElementById("myUL");
   const all = document.getElementById("deleteall");
   const cont = document.getElementById("all");
   const feito = document.getElementById("cont");
   const dataa = document.getElementById("data").value;
   
   let count = 0;
   let did = 0;
   function updatecont2(){
    feito.innerHTML = did;
  };
   function updatecont(){
    cont.innerHTML = count;
  };
  
  function createListItem(listName, isInitialLoad = false) {
    const dataa = document.getElementById("data").value;
      const li = document.createElement("li");
      const contentDiv = document.createElement("div");
      li.style.cursor = 'default';
      contentDiv.className = "content";
     
      const inputEl = document.createElement("input");
      inputEl.id = "listname";
      inputEl.type = "text";
      inputEl.value = listName;
      inputEl.setAttribute("readonly", "readonly");

    
      const dataul = document.createElement("input");
      dataul.id = "dateul";
      dataul.type = "date";
      dataul.value = dataa;
      dataul.setAttribute("readonly", "readonly");

      contentDiv.appendChild(inputEl);
      contentDiv.appendChild(dataul);

      const actionsDiv = document.createElement("div");
      actionsDiv.id = "active";
      
      const okbutton = document.createElement("button");
      okbutton.id = "ok";
      okbutton.textContent = ".";
      okbutton.style.color = '#232930';

      const editButton = document.createElement("button");
      editButton.id = "edit";
      editButton.textContent = "✏️";

      const deleteButton = document.createElement("button");
      deleteButton.id = "delete";
      deleteButton.textContent = "X";
      
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
      li.appendChild(okbutton);
      li.appendChild(contentDiv);
      li.appendChild(actionsDiv);
       count +=1;
      ul.appendChild(li);
      updatecont();
      

      editButton.addEventListener("click", function(event) {
           
          if (editButton.textContent === "✏️") {
              inputEl.removeAttribute("readonly");
              inputEl.focus();
              inputEl.style.cursor='text';
              editButton.innerHTML = "✔️";

          } else {
              inputEl.setAttribute("readonly", "readonly");
              editButton.innerHTML = "✏️";
              saveList();
          }
      });

      deleteButton.addEventListener("click", function(event) {
        const resultado = confirm('Do you sure you want delete this task?')
        if(resultado==true){
            ul.removeChild(li);
            if(did < 1){
                did == 0;
                count -=1;
                updatecont2();
                updatecont();
            }
            else{
                count -=1;
                did -=1;
                updatecont2();
            updatecont();
            }
            
            
            
            
            saveList();
        }

        
          
      });

      if (!isInitialLoad) {
          saveList();
      }

      okbutton.addEventListener("click", function(event){
           if(okbutton.textContent === "."){
            inputEl.style.textDecoration = "line-through";
            inputEl.style.color = "green";
            okbutton.style.backgroundImage = 'url("correct-removebg-preview.png")';
            okbutton.style.backgroundSize = 'cover';
            okbutton.textContent = '';
            okbutton.style.color="#00a100";
            did +=1;
            updatecont2();
           } else{
            inputEl.style.textDecoration = "none";
            inputEl.style.color = "white";
            okbutton.style.backgroundImage = 'none';
            okbutton.innerHTML = ".";
            okbutton.style.color = '#232930';
            did -=1
            updatecont2();
            saveList();
           }
           if(did == count){
            alert("Congratulations! You completed all the tasks.");
        }
        
           });
           
           
  }
       all.addEventListener("click", function(){
        
    
        if(ul.textContent == ""){
            alert('Your tasks list is empty already.');
        }
        else{
    const result = confirm('Do you sure you want delete all the tasks?');
     if(result == true){
        ul.innerHTML="";
        count = 0;
        did = 0;
        updatecont2();
        updatecont();
        saveList();
     }
        }
        
       });
    
 
  function saveList() {
      const items = [];
      
      ul.querySelectorAll('li').forEach(li => {
          const inputEl = li.querySelector('input[type="text"]');
          items.push(inputEl.value);
          
      });
      localStorage.setItem('lista', JSON.stringify(items));
      
  }

  
  function loadList() {
      const savedItems = JSON.parse(localStorage.getItem('lista')) || [];
      savedItems.forEach(item => createListItem(item, true));
  }

  form.addEventListener("submit", function(event) {
      event.preventDefault();
      const listName = input.value.trim();
      if (listName !== "") {
          createListItem(listName);
          input.value = "";
          data.value = "";
      } else {
          alert('Invalid name.');
      }
  });

  
  loadList();
});