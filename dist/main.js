(()=>{"use strict";const t=function(){const t=function(t,e,n,a,i,c){this.title=t,this.taskDescription=e,this.dueDate=n,this.priority=a,this.notes=i,this.completed=c};return{addNewTask:function(e,n,a,i,c){return new t(e,n,a,i,c,!1)}}}(),e=function(){const t=function(t){this.title=t,this.taskArray=[],this.active=!1},e={"All Projects":{title:"All Projects",taskArray:[],active:!0}};return{projects:e,addNewProject:function(n){e.hasOwnProperty(n)?alert("Project already exists."):e[n]=new t(n)},getAllProjectTitles:function(){let t=[];for(const n in e)e.hasOwnProperty(n)&&t.push(e[n].title);return t},setActiveProject:function(t){for(const t in e)e[t].active=!1;e[t].active=!0},getActiveProject:function(){let t=null;for(const n in e)1==e[n].active&&(t=e[n]);return t},removeTask:function(t,n){e[t].taskArray.splice(n,1)},changeTaskPriority:function(t,n){let a,i=e[t].taskArray[n].priority;a="Low"==i?1:"Medium"==i?2:3,a++,4==a&&(a=1),e[t].taskArray[n].priority={1:"Low",2:"Medium",3:"High"}[a]},toggleCompleted:function(t,n){0==e[t].taskArray[n].completed?e[t].taskArray[n].completed=!0:e[t].taskArray[n].completed=!1},synchronizeAllProjects:function(){let t=[];for(const n in e)e[n].taskArray.forEach((e=>{t.push(e)}));e["All Projects"].taskArray=t}}}(),n=function(){let t=document.getElementById("navbar-project-list");!function(){for(;t.firstChild;)t.removeChild(t.lastChild)}(),e.getAllProjectTitles().forEach((i=>{let c=document.createElement("li");c.dataset.title=i,c.classList.add("list-item"),1==e.projects[i].active&&(c.classList.remove("list-item"),c.classList.add("active-project")),c.textContent=`${i} (${e.projects[i].taskArray.length})`,c.addEventListener("click",(function(t){e.setActiveProject(t.target.dataset.title),a()})),c.addEventListener("click",(function(t){n()})),t.appendChild(c)}))},a=function(){const t=document.getElementById("task-wrapper"),a=function(){for(;t.firstChild;)t.removeChild(t.lastChild)},i=function(){const c=e.getActiveProject();let r=0;!function(){const e=document.createElement("h2");e.textContent=c.title,t.appendChild(e)}();const d=document.createElement("div");d.classList.add("main-task-holder"),c.taskArray.forEach((l=>{let o=document.createElement("div"),s=document.createElement("div");o.classList.add("main-task"),s.classList.add("main-task-hidden"),s.id=l.title+r.toString(),1==l.completed&&o.classList.add("main-task-completed");const u=["Title","Task description","Due date","Priority","Notes"];let p=0;["title","taskDescription","dueDate","priority","notes"].forEach((t=>{let e=document.createElement("p");e.id="field"+l.title+t+r,e.textContent=`${u[p]}: ${l[t]}`,"title"==t?(e.dataset.index=r,e.addEventListener("click",(function(t){let e=l.title+t.target.dataset.index;document.getElementById(e).classList.toggle("main-task-hidden")})),e.classList.add("main-task-title"),o.appendChild(e)):s.appendChild(e),p++}));let m=document.createElement("button"),h=document.createElement("i");h.classList.add("fas"),h.classList.add("fa-trash"),m.appendChild(h),m.dataset.taskIndex=r,m.dataset.projectTitle=c.title,h.addEventListener("click",(function(t){e.removeTask(t.target.parentElement.dataset.projectTitle,t.target.dataset.taskIndex),a(),i(),n()}));let f=document.createElement("button");f.textContent="Change priority",f.dataset.index=r,f.dataset.projectTitle=c.title,f.addEventListener("click",(function(t){e.changeTaskPriority(t.target.dataset.projectTitle,t.target.dataset.index);let n="field"+c.taskArray[t.target.dataset.index].title+"priority"+t.target.dataset.index;document.getElementById(n).textContent="Priority: "+c.taskArray[t.target.dataset.index].priority}));let k=document.createElement("button");1==l.completed?k.textContent="Completed":k.textContent="",k.dataset.index=r,k.dataset.projectTitle=c.title;let E=document.createElement("i");E.classList.add("fas"),E.classList.add("fa-check"),k.appendChild(E),E.addEventListener("click",(function(t){e.toggleCompleted(t.target.parentElement.dataset.projectTitle,t.target.parentElement.dataset.index),t.target.parentElement.parentElement.classList.contains("main-task-completed")?t.target.parentElement.parentElement.classList.toggle("main-task-completed"):t.target.parentElement.parentElement.classList.add("main-task-completed")})),s.appendChild(f),o.appendChild(s),o.appendChild(k),o.appendChild(m),d.appendChild(o),t.appendChild(d),r++}))};a(),i()};!function(){let t=document.querySelector("#h2-create-new-task"),e=document.querySelector("#h2-create-new-project"),n=document.querySelector("#unhide-new-task-div"),a=document.querySelector("#unhide-new-project-div");t.addEventListener("click",(function(t){n.classList.toggle("create-new-div-hidden")})),e.addEventListener("click",(function(t){a.classList.toggle("create-new-div-hidden")}))}(),document.querySelector("#create-task").addEventListener("click",(function(){const i=document.querySelector("#task-wrapper");let c=function(){let i=function(){let t=[];return["Title","Task description","Due date","Priority","Notes"].forEach((e=>{let n=document.getElementById(e).value;t.push(n)})),t}(),c=t.addNewTask(i[0],i[1],i[2],i[3],i[4],!1);e.getActiveProject().taskArray.push(c),e.synchronizeAllProjects(),n(),a()};!function(){for(;i.firstChild;)i.removeChild(i.lastChild)}(),function(){let t=document.createElement("h2");t.textContent="Create new task",i.appendChild(t);let e=document.createElement("div");e.classList.add("task-pop-up");let n=document.createElement("form");e.appendChild(n),["Title","Task description","Due date","Priority","Notes"].forEach((t=>{if("Priority"!=t){let e=document.createElement("label");e.htmlFor=t,e.textContent=t;let a=document.createElement("input");a.name=t,a.id=t,n.appendChild(e),n.appendChild(a)}else{let e=["Low","Medium","High"],a=document.createElement("label");a.htmlFor=t,a.textContent=t;let i=document.createElement("select");i.id=t,e.forEach((t=>{let e=document.createElement("option");e.value=t,e.textContent=t,i.appendChild(e)})),n.appendChild(a),n.appendChild(i)}}));const a=document.createElement("button");a.addEventListener("click",c),a.textContent="Create new task",e.appendChild(a),i.appendChild(e),document.querySelector("#Title").value=document.querySelector("#new-task").value}()})),function(){let t=document.querySelector("#create-project"),a=document.querySelector("#new-project");t.addEventListener("click",(function(){e.addNewProject(a.value),n()}))}(),n(),a()})();