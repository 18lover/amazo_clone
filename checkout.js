import {card,removeFromCard, updateDeliveryOption,cartQuantity} from './card.js'; 
import {products} from './products.js';
import { deliveryOption}  from './deliveryOption.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function allHtmlCheckoutPage()
{
    let html2='';
    card.forEach((cardItem)=>{
        let matchingItem;
        products.forEach((product) => {
            if(cardItem.id == product.id)
            {
                matchingItem = product;
            }
        });
    
        let deliveryDay;
        deliveryOption.forEach((option)=>{
            if(option.id == cardItem.deliveryOptionId)
            {
                deliveryDay=option;
            }
        });
        let dateString;
        if(deliveryDay){
            let today = dayjs();
            const deliveryDate=today.add(deliveryDay.deliveryDays,'days');
            dateString=deliveryDate.format('dddd, MMMM D');
        }
        html2 +=`
        <div class="add-card pb-5 pt-4 ps-2 pe-2 add-card-id-${matchingItem.id} " >
        <div class="delivery-date">
            <p>Delivery date: ${dateString}</p>
        </div>
    
        <div class="row image-info">
            <div class="col-6 col-lg-4" >
                <img src=".${matchingItem.image}" alt="" class="card-image img-fluid">
            </div>
            <div class="card-info d-flex flex-column col-6 col-lg-3" >
                <p class="fw-bolder">${matchingItem.name}</p>
                <p class="text-danger fw-bold">Price : ${matchingItem.price}</p>
                <p class="d-flex">Quantity : ${cardItem.Quantity}</p>
                <div class="link-row d-flex " >
                    <a href="#">Update</a>
                    <a href="#" class="delete" data-product-id=${matchingItem.id}>Delete</a>
                </div>
            </div>
    
            <div class="col-12 col-lg-5 delivery-option">
                <p class="fw-bold text-center text-lg-start">choose a delivery option</p>
                <div class="row">
                    ${deliveryOptionHTML(matchingItem,cardItem)}
                </div>
            </div>
        </div>
    </div>
        `
    });
    document.querySelector("#card-section").innerHTML=html2;
    
    document.querySelectorAll(".delete").forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCard(productId);
            const removeCard=document.querySelector(`.add-card-id-${productId}`);
            removeCard.remove();
            OrderSummery();
            document.querySelector(".header-items").innerHTML=cartQuantity();
        });
    });
    
    
    
    function deliveryOptionHTML(matchingItem,cardItem)
    {
        let html = '';
        deliveryOption.forEach((option)=>{
    
            let today = dayjs();
            const deliveryDate=today.add(option.deliveryDays,'days');
            const dateString=deliveryDate.format('dddd, MMMM D');
            const price =option.price === 0 ?`FREE`:`${option.price}`;
            const isChecked = (option.id==cardItem.deliveryOptionId);
            
            html+=`
            <div data-product-id="${matchingItem.id}" data-delivery-id="${option.id}" class="radio-group d-flex flex-lg-column flex-sm-row flex-column col-sm-4 col-lg-12 col-12 justify-content-center align-items-center align-items-sm-start">
                <div class="d-flex align-items-center" >
                    <input type="radio" ${isChecked ? 'checked' : ''}  name="${matchingItem.id}">
                    <div class="1st ms-2">
                        <p class="mb-0 text-success fw-bold">${dateString}</p>
                        <p class="mb-0">${price} Shipping</p>
                    </div>  
                </div>
            </div>
            `;
        });
        return html;
    }
    
    document.querySelectorAll(".radio-group")
        .forEach((radioBtn)=>{
            radioBtn.addEventListener('click',()=>{
                const {productId,deliveryId} = radioBtn.dataset; 
                updateDeliveryOption(productId,deliveryId);
                allHtmlCheckoutPage();
                OrderSummery();
            })
        });
}

allHtmlCheckoutPage();
document.querySelector(".header-items").innerHTML=cartQuantity();



// ORDER SUMMERY

function htmlOrderSummery()
{
    let html=[];
    let itemPrice=0;
    let Shipping=0;
    let total=0;
    let withTax=0;
    let orderTotal=0;
    let matchingProduct;
    card.forEach((cardItem)=>{
        products.forEach((product)=>{
            if(cardItem.id == product.id)
            {
                matchingProduct = product;
            }
        });
        let matchingOption=0;
        itemPrice += matchingProduct.price * cardItem.Quantity;
        deliveryOption.forEach((option)=>{
            if(cardItem.deliveryOptionId === option.id)
            {
                matchingOption=option;
            }
        });
        Shipping += matchingOption.price;
    });
    total = itemPrice + Shipping;
    withTax = (total / 10);
    orderTotal = total + withTax;

    html += `
    <p class="fw-bold fs-5">Order Summery</p>
    <div class="summery-card row ">
    <div class="card-left col-12">
        <div class="items row">
            <p class="col-6 col-sm-10 col-lg-8 fw-bold">Items(<a class=" order-items"> 0 </a>)</p>
            <p class="col-4 col-sm-2 col-lg-4">${itemPrice}</p>
        </div>
        <div class="shipping row ">
            <p class="col-6 col-sm-10 col-lg-8 fw-bold">Shipping & Handling</p>
            <p class="col-4 col-sm-2 col-lg-4">${Shipping}</p>
        </div>
        <div class="total-tax row">
            <p class="col-6 col-sm-10 col-lg-8 fw-bold">Total before Tax</p>
            <p class="col-4 col-sm-2 col-lg-4">${total}</p>
        </div>
        <div class="estimated-tax row">
            <p class="col-6 col-sm-10 col-lg-8 fw-bold">Estimated Tax(10%)</p>
            <p class="col-4 col-sm-2 col-lg-4">${withTax}</p>
        </div>
    </div>
    <hr class="text-danger">
    <div class="order-total">
        <div class="row fw-bold fs-5 text-danger">
            <p class="col-6 col-sm-10 col-lg-8">Order Total:</p>
            <p class="col-4 col-sm-2 col-lg-4">${orderTotal}</p>
        </div>
        <div class="placeorder row d-flex justify-content-center">
            <button class="bg-warning text-center btn-order col-10 rounded-pill mb-3 py-2">Place your Order</button>
        </div>
    </div>
</div>
    `;
    return html;
}
OrderSummery();
const placeOrder=document.querySelector(".btn-order");
placeOrder.addEventListener('click',(evt)=>{
        placeOrder.innerHTML='Thanks! But project is not yet Complete';
        setTimeout(()=>{
            placeOrder.innerHTML='Place Your Order';
        },2000)
    })
function OrderSummery()
{
    document.querySelector(".order-summery").innerHTML=htmlOrderSummery();
    document.querySelector(".order-items").innerHTML=cartQuantity();
}
