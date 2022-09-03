/*
1. Load All Categories
*/ 
const loadCategory =async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';

    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories =>{
    const categoryContainer = document.getElementById('news-category');
    categories.forEach(category => {
        // console.log(category)
        const li = document.createElement('li')
        li.classList.add('category-list')
        li.innerHTML = `<span onclick="btnCategory('${category.category_id}')">${category.category_name}</span>`
        categoryContainer.appendChild(li)

    })
}

loadCategory();

/*
2. Load News from the Category
*/
const btnCategory =async(id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = news =>{
    console.log(news)
    const newsTotalContainer = document.getElementById('total-news-item')
    newsTotalContainer.innerText = news.length? news.length : 'No News'

    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML =  ``
    news.forEach(singleNews =>{
        const divNews = document.createElement('div')
        divNews.innerHTML = `
        <div class="card mb-3 blog-card shadow border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${singleNews.image_url}" class="img-fluid post-image" alt="${singleNews.title}">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${singleNews.title}</h5>
                    <p class="card-text">${singleNews.details.slice(0,400)+'...'}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex">
                            <img src="${singleNews.author.img}" class="author-img">
                            <div class="ms-2">
                                <p class="mb-0">${singleNews.author.name? singleNews.author.name : 'Annonymus Author'}</p>
                                <p class="card-text"><small class="text-muted">${singleNews.author.published_date? singleNews.author.published_date.slice(0,10) : 'No Published Date Found'}</small></p>
                            </div>
                        </div>
                        <div>
                            <i class="fa fa-light fa-eye"></i>
                            ${singleNews.total_view? singleNews.total_view : 'No Data Found'}
                        </div>
                        <div>${singleNews.rating.number}</div>

                        <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadNews('${singleNews._id}')" class="text-primary pointer">Read Full Story<i class="fa-solid fa-arrow-right-long ms-2"></i></div>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(divNews)

    })
}

btnCategory('01')

/*
3. Modal on Each News Items
*/

const loadNews = async(news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayWholeNews(data.data[0]);
}

const displayWholeNews = news =>{
    console.log(news)
}