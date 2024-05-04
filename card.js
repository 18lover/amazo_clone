export let card=JSON.parse(localStorage.getItem('card'));
if(!card)
{
    card=[{
        id : 1,
        Quantity : 2,
        deliveryOptionId : '3-day',
    },{
        id : 2,
        Quantity : 1,
        deliveryOptionId : '1-day',
    }]
}


function addToStorage()
{
    localStorage.setItem('card',JSON.stringify(card));
}

export function addToCart(productId)
{
    let itemRepeat;
    card.forEach((index)=>{
        if(productId === index.id)
        {
            itemRepeat = index;
        }
    });
    
    if(itemRepeat)
    {
        itemRepeat.Quantity+=1;
    }
    else
    {
        card.push({
            id : productId,
            Quantity : 1,
            deliveryOptionId : '1-day',
        });
    }
    addToStorage();
}

export function removeFromCard(productId)
{
    let newCard=[];
    card.forEach((cardItem)=>{
        if(cardItem.id != productId)
        {
            newCard.push(cardItem);
        }
    });
    card=newCard;
    addToStorage(); 
}

export function updateDeliveryOption(productId,deliveryId)
{
    let matchingItem;
    card.forEach((cardItem)=>{
        if(productId == cardItem.id)
        {
            matchingItem = cardItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryId;
    addToStorage();
}

export function cartQuantity(){
    let count=0;
    card.forEach((product)=>{
        count += product.Quantity;
    });
    // document.querySelector(".count").innerHTML=count;
    return count;
}

