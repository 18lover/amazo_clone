import {card,addToCart,cartQuantity} from './card.js';
import {products} from './products.js';

AOS.init();
document.querySelector(".count").innerHTML=cartQuantity();
let html=''; 
    
products.forEach((product)=>{
    html+=`
    <div class="col-md-4 col-xl-3 col-sm-6  mt-5 mb-3 col-12 " data-aos="fade-right" data-aos-duration="600">
        <div class="container bg-white p-0">
            <div class="image" data-aos="flip-up" data-aos-duration="900">
                <img class="image img-flui card-image" src=".${product.image}">
            </div>
            <hr class="text-primary m-0">
            <div class="info px-2 " data-aos="fade-right" data-aos-duration="600">
            <div class="card-name mt-1 ">
                <p class="font mb-0 mt-1 fw-bold">${product.name}</p>
            </div>
            <div class="rating mt-3 m-0  row">
                <img src="images/star.png" alt="rating" class="col-8 p-0 img-rating">
                <p class="col">${product.rating.response}</p>
            </div>
            <div class="price fw-bolder d-flex align-items-center ">
            <p class="me-3 fs-3" >&#8377;${product.price}</p>  
            <p class="fw-light">M.R.P:
            <p class="fw-light price-line">12334</p></p>
            </div>
            <div class="mt-2">
                <select class="rounded-pill select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div class="">
                <p class="invisible success success-${product.id}">Success</p>
            </div>
            <button type="button" class=" rounded-pill addtobtn mb-2" data-add-btn="${product.id}">Add to card</button>
        </div>
        </div>
        </div>
    `;
});

const mainPageHtml=document.querySelector(".data");
mainPageHtml.innerHTML=html;


    


const addToBtn=document.querySelectorAll(".addtobtn");
addToBtn.forEach((Name)=>{
    Name.addEventListener('click',()=>{
        const productId=Name.dataset.addBtn;
        addToCart(productId);
        const success=document.querySelector(`.success-${productId}`);
        success.classList.remove('invisible');
        setTimeout(()=>{
            success.classList.add('invisible');
        },1000)
        document.querySelector(".count").innerHTML=cartQuantity();
    });
});















// let cardHtml='';

// card.forEach((cardItem)=>{
//     let matchingItem;
//     products.forEach((product) => {
//         if(cardItem.itemName === product.name)
//         {
//             matchingItem = product;
//         }
//     });
//     cardHtml +=`
//     <div class="add-card pb-5 pt-4 ps-2 pe-2">
//     <div class="delivery-date">
//         <p>Delivery date: Tuesday, June 21</p>
//     </div>

//     <div class="row image-info">
//         <div class="col-6 col-lg-4" >
//             <img src="${matchingItem.image}" alt="" class="card-image img-fluid">
//         </div>
//         <div class="card-info d-flex flex-column col-6 col-lg-3">
//             <p class="fw-bolder">${matchingItem.name}</p>
//             <p class="text-danger fw-bold">${matchingItem.price}</p>
//             <p class="d-flex">${cardItem.cardQuantity}</p>
//             <div class="link-row d-flex " >
//                 <a href="#">Update</a>
//                 <a href="#">Delete</a>
//             </div>
//         </div>

//         <div class="col-12 col-lg-5 delivery-option">
//             <p class="fw-bold text-center text-lg-start">choose a delivery option</p>
//             <div class="row">
//             <div class="radio-group d-flex flex-lg-column flex-sm-row flex-column col-sm-12 col-12 justify-content-center align-items-center">
//                     <div class="d-flex align-items-center">
//                         <input type="radio" id="First" name="option" value="a">
//                         <div class="1st ms-2">
//                             <p class="mb-0 text-success fw-bold">Tuesday, June 21</p>
//                             <p class="mb-0">Free Shipping</p>
//                         </div>  
//                     </div>

//                     <div class="d-flex align-items-center">
//                         <input type="radio" id="Second" name="option" value="a">
//                         <div class="1st ms-2">
//                             <p class="mb-0 text-success fw-bold">Tuesday, June 21</p>
//                             <p class="mb-0">$4.99-Shipping</p>
//                         </div>  
//                     </div>

//                     <div class="d-flex align-items-center">
//                         <input type="radio" id="Third" name="option" value="a">
//                         <div class="1st ms-2">
//                             <p class="mb-0 text-success fw-bold">Tuesday, June 21</p>
//                             <p class="mb-0">$9.99-Shipping</p>
//                         </div>  
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
//     `;
    
// });

// const dynamichtml=document.querySelector(".first-section");
// console.log(dynamichtml);
// // if(){
// //     dynamichtml.innerHTML=cardHtml;
// //     console.log(true);
// // }
// // else{
// //     console.log(false);
// // }












