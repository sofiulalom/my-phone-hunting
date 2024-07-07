const phonesHunter = async(searchText="13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displeayPhone(phones, isShowAll)

}

const displeayPhone = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    // console.log(phones)
    const showAllBtn = document.getElementById('show-all-btn');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden')
    }
    if (!isShowAll) {
        
        phones =phones.slice(0,12)
    }
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-gray-100 w-96 shadow-xl';
        phoneCard.innerHTML = `
            <figure>
                <img
                src="${phone.image}"
                alt="phone" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-ceneter items-center">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Buy Now</button>
            </div>
        `
        phoneContainer.appendChild(phoneCard)
        
    });
    // sppner stop or hidden 
    togoleLoadingSpener(false)
}

const showDetailsHandler = async(id) => {
   
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    showModalData(phone)
}

const showModalData = (phone) => {
    console.log(phone)
    

    const showDetailContainer = document.getElementById('show-Details-Phone-container');

    showDetailContainer.innerHTML = `
      <img class='my-4 mx-auto' src="${phone.image}" alt="" />
      <h3  class="text-3xl font-bold">${phone.name}</h3>
      <p><span class='font-bold'>storage: </span>${phone.mainFeatures.storage}</p>
      <p><span class='font-bold'>displaySize: </span>${phone.mainFeatures.displaySize}</p>
      <p><span class='font-bold'>chipSet: </span>${phone.mainFeatures.chipSet}</p>
      <p><span class='font-bold'>Memory: </span>${phone.mainFeatures.memory}</p>
      <p><span class='font-bold'>slug: </span>${phone.slug}</p>
      <p><span class='font-bold'>releaseDate: </span>${phone.releaseDate}</p>
      <p><span class='font-bold'>brand: </span>${phone.brand}</p>
      <p><span class='font-bold'>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
      
    `
    
    



    show_modal_details.showModal()
}



function searchPhone(isShowAll) {
    togoleLoadingSpener(true)
    const seearchFiled = document.getElementById('search-filed');
    const searchText = seearchFiled.value;
    phonesHunter(searchText, isShowAll)
}



const togoleLoadingSpener = (isLoading) => {
    const loadingSpener = document.getElementById('loading-spener');
    if (isLoading) {
         loadingSpener.classList.remove('hidden')
    } else {
        loadingSpener.classList.add('hidden')
     }
    
}

const showAllBtnhendler = () => {
    searchPhone(true)
}

phonesHunter()