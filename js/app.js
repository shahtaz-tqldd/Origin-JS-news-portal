/*
1. Load All Categories
*/
const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    } catch (error) {
        const messageContainer = document.getElementById('total-news-item');
        messageContainer.innerText = error
    }

}

const displayCategory = categories => {
    const categoryContainer = document.getElementById('news-category');
    categories.forEach(category => {
        // console.log(category)
        const li = document.createElement('li')
        li.classList.add('category-list')
        li.innerHTML = `<span onclick="btnCategory('${category.category_id}', '${category.category_name}')">${category.category_name}</span>`
        categoryContainer.appendChild(li)
    })

}

loadCategory();

/*
2. Load News from the Category
*/
const btnCategory = async (id, catName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    try {
        const res = await fetch(url);
        toggleLoader(true);
        const data = await res.json();
        displayNews(data.data, catName);
    } catch (error) {
        const messageContainer = document.getElementById('total-news-item');
        messageContainer.innerText = error
    }
}
const displayNews = (news, catName) => {
    console.log(news)
    const newsTotalContainer = document.getElementById('total-news-item')
    newsTotalContainer.innerText = news.length ? news.length + ' News Items Found' : 'No News Items Found'

    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``

    const newsCategory = document.getElementById('news-category-name')
    newsCategory.innerText = catName

    news.sort((a,b) => {
        return b.total_view - a.total_view
    })

    news.forEach(singleNews => {
        const divNews = document.createElement('div')
        divNews.innerHTML = `
        <div class="card mb-3 blog-card shadow border-0">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${singleNews.image_url}" class="img-fluid post-image" alt="${singleNews.title}">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title pb-3">${singleNews.title}</h5>
                    <p class="card-text">${singleNews.details.slice(0, 300) + '...'}</p>

                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                        <div class="d-flex align-items-center p-1">
                            <img src="${singleNews.author.img}" class="author-img">
                            <div class="ms-2">
                                <p class="mb-0">${singleNews.author.name ? singleNews.author.name : 'Annonymus Author'}</p>
                                <p class="card-text"><small class="text-muted">${singleNews.author.published_date ? singleNews.author.published_date.slice(0, 10) : 'No Published Date Found'}</small></p>
                            </div>
                        </div>
                        <div class="p-1">
                            <i class="fa fa-light fa-eye"></i>
                            ${singleNews.total_view ? singleNews.total_view : 'No Data Found'}
                        </div>
                        <div class="p-1">${singleNews.rating.number}</div>

                        <div data-bs-toggle="modal" data-bs-target="#newsModal" onclick="loadNews('${singleNews._id}')" class="text-primary pointer p-2">Read Full Story<i class="fa-solid fa-arrow-right-long ms-2"></i></div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(divNews)
    })
    toggleLoader(false);
}

btnCategory('01', 'Breaking News');

/*
3. Modal on Each News Items
*/

const loadNews = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayWholeNews(data.data[0]);
}

const displayWholeNews = news => {
    const newsTitle = document.getElementById('newsModalLabel')
    newsTitle.innerText = news.title

    const newsDetailsContainer = document.getElementById('news-details');
    newsDetailsContainer.innerHTML = `
    <div class="d-flex align-items-center mt-3">
        <img src="${news.author.img}" class="author-img">
        <p class="mb-0 ms-2 me-4">By ${news.author.name ? news.author.name : 'Annonymus Author'}</p>
        <i class="fa-regular fa-clock"></i>
        <small class="text-muted ms-1 me-4 pb-0">Last Updated: ${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No Published Date Found'}</small>
    </div>
    `

    const newsContainer = document.getElementById('news-body')
    newsContainer.innerHTML = `
    <img src="${news.image_url}" class="container-fluid" >
    <p class="mt-4 p-3">${news.details}</p>
    `


    console.log(news)
}

/*
4. spinner/toggle loader
*/

const toggleLoader = isLoading => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}
