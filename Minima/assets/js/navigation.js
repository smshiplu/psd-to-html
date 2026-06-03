const primaryMenu = document.getElementById('primary-menu');
const navMenu = primaryMenu.getElementsByClassName('nav-menu')[0]; 
//console.log(navMenu);
const navMenuItems = Array.from(navMenu.getElementsByTagName('li'));
//console.log(navMenuItems);

navMenuItems.forEach(itemOnClick);

function itemOnClick(item){
	
	item.children[0].onclick = function() {
		//console.log(item.nodeName + ' ' + item.classList);
		
		const currentPageItem = document.getElementsByClassName('current_page_item');
		//console.log(currentPageItem);
		for(let i = 0; i< currentPageItem.length; i++){
			currentPageItem[i].classList.remove('current_page_item');
		}
		
		const curentItemParent = document.getElementsByClassName('current_page_parent');
		//console.log(curentItemParent);
		for(let i = 0; i < curentItemParent.length; i++){
			curentItemParent[i].classList.remove('current_page_parent');
		}
		
		//WHEN SUBMENU ITEM TOGGLE BUTTON CLICKED, KEEP OPEN IT'S PARENT TOGGLE BUTTON
		const childrenArray = document.getElementsByClassName('children');
		for(let i = 0; i < childrenArray.length; i++){
			//console.log(childrenArray[i])
			//CLOSE OPEN SUBMENU
			childrenArray[i].classList.remove('toggled-on');
			childrenArray[i].previousElementSibling.classList.remove('toggle-on');
			childrenArray[i].previousElementSibling.setAttribute('aria-expanded', 'false');
		}
		
		//WHEN SUBMENU ITEM CLICKED, ADD .current_page_parent TO IT'S PARENT
		const siblings =  getAllSiblings(this.parentElement);
		//console.log(siblings)
		for( let i = 0; i < siblings.length; i++ ) {
			if(siblings[i].parentElement.parentElement.nodeName == 'LI'
			&& siblings[i].parentElement.parentElement.classList == 'page_item_has_children'){
				siblings[i].parentElement.parentElement.classList.add('current_page_parent');
			}
			
			if(siblings[i].parentElement.parentElement.parentElement.parentElement.nodeName == 'LI' 
			&& siblings[i].parentElement.parentElement.parentElement.parentElement.classList == 'page_item_has_children'){
				siblings[i].parentElement.parentElement.parentElement.parentElement.classList.add('current_page_parent');
			}
		}
		
		this.parentElement.classList.add('current_page_item');
	}
}


const toggleBtns = Array.from(document.getElementsByClassName('dropdown-toggle'));
//console.log(toggleBtns);
toggleBtns.forEach(dropDownToggle);

function dropDownToggle(item){
	
	item.onclick = function(){
		
		const allSubUl = document.getElementsByClassName('children');
		for(let i = 0; i < allSubUl.length; i++){
			if( this.classList != allSubUl[i].previousElementSibling.classList){
				allSubUl[i].classList.remove('toggled-on')
				allSubUl[i].previousElementSibling.classList.remove('toggle-on');
				allSubUl[i].previousElementSibling.setAttribute('aria-expanded', 'false');
				
				//console.log(this.nextElementSibling.parentElement.parentElement)//This is second level submenu
				
				if(this.nextElementSibling.parentElement.parentElement.classList == allSubUl[i].classList) {
					allSubUl[i].classList.add('toggled-on')
					allSubUl[i].previousElementSibling.classList.add('toggle-on');
					allSubUl[i].previousElementSibling.setAttribute('aria-expanded', 'true');
				}
			}
		}
		
		if( this.classList != 'dropdown-toggle toggle-on' ){
			this.classList.add('toggle-on');
			this.setAttribute('aria-expanded', 'true');
			this.nextElementSibling.classList.add('toggled-on'); 
		} else {
			this.classList.remove('toggle-on');
			this.setAttribute('aria-expanded', 'false');
			this.nextElementSibling.classList.remove('toggled-on'); 
		}
		
	}
}

const mobileMenuBtn = document.getElementsByClassName('menu-toggle')[0];
mobileMenuToggle(mobileMenuBtn);
function mobileMenuToggle(elem){
	elem.onclick = function(){
		if(elem.getAttribute('aria-expanded') == 'false'){
			elem.setAttribute('aria-expanded', 'true');
			elem.parentElement.parentElement.classList.add('toggled');
		} else {
			elem.setAttribute('aria-expanded', 'false');
			elem.parentElement.parentElement.classList.remove('toggled');
		}
	}
}

var isScrolling;
window.onscroll = function(e) {
  
  //console.log(this.oldScroll > this.scrollY);// print "false" if direction is down and "true" if up
	if(this.oldScroll > this.scrollY) {
		mobileMenuBtn.classList.remove('hide');
		mobileMenuBtn.classList.add('show');
	} else {
		mobileMenuBtn.classList.remove('show');
		mobileMenuBtn.classList.add('hide');
	}
  
	this.oldScroll = this.scrollY;
	
	/* window.clearTimeout( isScrolling );
	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		//console.log( 'Scrolling has stopped.' );
		mobileMenuBtn.style.bottom = '50px';
	}, 150); */
}


//STACKOVERFLOW SOLUTIONS
function getAllSiblings(elem, filter) {
    var sibs = [];
    elem = elem.parentNode.firstChild;
    do {
        if (elem.nodeType === 3) continue; // text node
        if (!filter || filter(elem)) sibs.push(elem);
    } while (elem = elem.nextSibling)
    return sibs;
}

//STACKOVERFLOW SOLUTION OF CONCATING MULTIPLE ARRAYS IN AN ONE ARRAY
/* 	var subUl = document.getElementsByClassName('children');
	var newArrays = [];
	for(var i = 0; i < subUl.length; i++){
		newArrays[i] = Array.from(subUl[i].children);
		var allSubItems = Array.prototype.concat.apply([], newArrays,); 
	}
	//console.log(allSubItems); 
*/