/*
1. Load Category
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
            <h1>${singleNews.title}</h1>
        `
        newsContainer.appendChild(divNews)

    })
}