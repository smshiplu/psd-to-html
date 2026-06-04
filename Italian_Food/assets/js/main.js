( function($) {


    /**************************
    * MAIN NAVIGATION MENU *
    ***************************/
   
    const primaryMenu = document.getElementById('primary-menu');
    const navMenu = primaryMenu.getElementsByClassName('nav-menu')[0];
    //console.log(navMenu);
    const navMenuItems = Array.from(navMenu.getElementsByTagName('li'));
    //console.log(navMenuItems);

    //NO NEED TO ADD itemOnClick FUNCTION, WHEN IMPLEMENTING IN WORDPRESS 
	navMenuItems.forEach(itemOnClick);
    function itemOnClick(item){
        
        item.children[0].onclick = function() {
            //console.log(item.nodeName + ' ' + item.classList);
            
            const currentPageItem = document.getElementsByClassName('current-menu-item');
            //console.log(currentPageItem);
            for(let i = 0; i< currentPageItem.length; i++){
                currentPageItem[i].classList.remove('current-menu-item');
            }
            
            const curentItemParent = document.getElementsByClassName('current-menu-parent');
            //console.log(curentItemParent);
            for(let i = 0; i < curentItemParent.length; i++){
                curentItemParent[i].classList.remove('current-menu-parent');
            }

            const curentItemAncestor = document.getElementsByClassName('current-menu-ancestor');
            //console.log(curentItemParent);
            for(let i = 0; i < curentItemAncestor.length; i++){
                curentItemAncestor[i].classList.remove('current-menu-ancestor');
            }
            
            //WHEN ANY MENU ITEM CLICKED, CLOSE OPENED SUBMENU 
            const childrenArray = document.getElementsByClassName('sub-menu');
            for(let i = 0; i < childrenArray.length; i++){
                //console.log(childrenArray[i])
                //CLOSE OPENED SUBMENU
                childrenArray[i].classList.remove('toggled-on');
                childrenArray[i].previousElementSibling.classList.remove('toggle-on');
                childrenArray[i].previousElementSibling.setAttribute('aria-expanded', 'false');
            }
            
            //WHEN SUBMENU ITEM CLICKED, ADD .current-menu-parent TO IT'S PARENT
            const siblings =  getAllSiblings(this.parentElement);
            //console.log(siblings)
            for( let i = 0; i < siblings.length; i++ ) {
                if(siblings[i].parentElement.parentElement.nodeName == 'LI'
                && siblings[i].parentElement.parentElement.classList == 'menu-item-has-children'){
                    siblings[i].parentElement.parentElement.classList.add('current-menu-parent');
                }
                
                if(siblings[i].parentElement.parentElement.parentElement.parentElement.nodeName == 'LI' 
                && siblings[i].parentElement.parentElement.parentElement.parentElement.classList == 'menu-item-has-children'){
                    siblings[i].parentElement.parentElement.parentElement.parentElement.classList.add('current-menu-ancestor');
                }
            }
            
            this.parentElement.classList.add('current-menu-item');
        }
    }
    
    //Create drop down button

	const subMenu = document.getElementsByClassName('sub-menu');
    for( let i = 0; i < Array.from(subMenu).length; i++) {
        //console.log(subMenu[i]);
		const btn = document.createElement('button');
		btn.setAttribute('class', 'dropdown-toggle');
		btn.setAttribute('aria-expanded', 'false');
		subMenu[i].parentNode.insertBefore(btn, subMenu[i]);
    }

    const toggleBtns = Array.from(document.getElementsByClassName('dropdown-toggle'));
    //console.log(toggleBtns);
    toggleBtns.forEach(dropDownToggle);
    function dropDownToggle(item){
        
        item.onclick = function(){
            
            const allSubUl = document.getElementsByClassName('sub-menu');
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
    const headerSearch = document.getElementsByClassName('header-search')[0];
    
	mobileMenuToggle(mobileMenuBtn);

    function mobileMenuToggle(elem){
       
        elem.onclick = function(){
            if(elem.getAttribute('aria-expanded') == 'false'){
                elem.setAttribute('aria-expanded', 'true');
                elem.parentElement.classList.add('toggled');
                elem.classList.add('open');
               /*  elem.innerHTML = '\u2573'; */
                
                headerSearch.style.display = 'block';
                
            } else {
                elem.setAttribute('aria-expanded', 'false');
                elem.parentElement.classList.remove('toggled');
                elem.classList.remove('open');
                /* elem.innerHTML = '\u2630';
                elem.style.transition = 'all 1s'; */

                headerSearch.style.display = 'none';
            }
        }
    }
    
 /* var isScrolling;
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
    } */
    
    
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


/**************************
* STICKY LOGO AND MENU *
***************************/

const logo = document.getElementsByClassName('logo')[0];
const stickyContent = document.getElementsByClassName('sticky-content')[0];
const logoPosition = logo.offsetTop;

window.onscroll = function() {
    countScroll();
}

function countScroll() {
    if (window.pageYOffset > 600 ) {
       
        stickyContent.classList.add("sticky");
        // stickyDiv.appendChild(logo);
        // stickyDiv.appendChild(siteNavigation);
    } else {
        stickyContent.classList.remove("sticky");
    }
}


/*******************************************
* Initiate owl carousel 
********************************************/
    // $('.owl-carousel').owlCarousel({
    //     stagePadding: 0,
    //     items: 1,
    //     loop: true,
    //     autoPlay: true,
    //     margin: 20,
    //     singleItem: true,
    //     nav: true,
    //     navText: [
            
    //         "&#8592;",
    //         "&#8594;",
    //         //"&#11164;",
    //         //"&#11166;",
    //         //"<i class='fa fa-caret-left'></i>",
    //         //"<i class='fa fa-caret-right'></i>"
    //     ],
    //     dots: true,
    // });

    const tagCloudLink = document.getElementsByClassName('tag-cloud-link');
    // console.log(tagCloudLink);
    if (tagCloudLinks.length > 0) {
        for (let i = 0; i < tagCloudLinks.length; i++) {
            tagCloudLinks[i].style.fontSize = ''; // Use empty string to remove inline style
        }
    }

}) (jQuery);