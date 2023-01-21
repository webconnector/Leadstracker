// creating the tracked leads and input_Element variable 
let trackedLeads = [];
const inputElement = document.getElementById("input_element");
const saveElement = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const deleteleadBtn = document.querySelector("delete_btn");

// grabbing the trackedLeadslist element
const tllist = document.getElementById("tracked_leadslist")

let saveTab = document.getElementById("saveTab-btn");


//pulling the saved leads in the localstorage to be rendered
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myTrackedLeads"))

if(leadsFromLocalStorage) {
    trackedLeads = leadsFromLocalStorage
    render(trackedLeads)
}


// listening to clicks on saveTab btn 
saveTab.addEventListener("click", function() {
    // Grabbing the url of the current browswer 
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        trackedLeads.push(tabs[0].url)
        localStorage.setItem("myTrackedLeads", JSON.stringify(trackedLeads))
        render(trackedLeads)
    })
})

// the render function 
function render(leads) {

    // variable to hold all html for list of tracked leads 
    let trackedLeadsItems = ""
    
    // rendering the list from the array to the leads list element
    for (let i = 0; i < leads.length; i++) {
        // trackedLeadsItems += "<li><a target='_blank' href='" + trackedLeads[i] + "'>" + trackedLeads[i] + "</a></li>" 
        trackedLeadsItems += `
                                <li>
                                    <a target='_blank' href='${leads[i]}'>
                                    ${leads[i]}
                                    </a> <button id='delete_btn'>X</button>
                                </li>
                                `   
    }
    tllist.innerHTML = trackedLeadsItems
    
}
    

//Using the delete all button
deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    trackedLeads = []
    render(trackedLeads)
})

//using the delete individual leads button
// deleteleadBtn.addEventListener("click", function(){
    
//     trackedLeads = leadsFromLocalStorage
//     render(trackedLeads)
// })


// implement the save button 
saveElement.addEventListener("click", function() {
    trackedLeads.push(inputElement.value)
    inputElement.value = ""

    // pushing the trackedLeads array into the localstorage (JSON.stringify converts it to strings) 
    localStorage.setItem("myTrackedLeads", JSON.stringify(trackedLeads))
    render(trackedLeads)   
})

