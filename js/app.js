const loadCategory =async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'

    const res = await fetch(url)
    const data = await res.json()
    displayCategory(data.data.news_category);
}

const displayCategory = categories =>{
    const categoryContainer = document.getElementById('news-category')
    categories.forEach(category => {
        console.log(category)
        const li = document.createElement('li')
        li.classList.add('category-list')
        li.innerHTML = `<span onclick="btnCategory('${category.category_id}')">${category.category_name}</span>`
        categoryContainer.appendChild(li)

    })
}

loadCategory();

const btnCategory =id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    console.log(url)
}