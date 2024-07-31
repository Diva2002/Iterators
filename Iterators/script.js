// Smooth scrolling for navigation links
// document.querySelectorAll('nav ul li a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();

//         const targetId = this.getAttribute('href').substring(1);
//         const targetElement = document.getElementById(targetId);

//         if (targetElement) {
//             window.scrollTo({
//                 top: targetElement.offsetTop,
//                 behavior: 'smooth'
//             });
//         }
//     });
// });

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Redirect to news page when "Blogs" link is clicked
document.getElementById('blogsLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = 'https://newsapi.org/v2/everything?q=financial+stability&apiKey=990d4c82c30746f0ad715e151ca28b18'; // News API URL
});

// Fetch news based on search query
async function searchNews() {
    const apiKey = '990d4c82c30746f0ad715e151ca28b18';
    const query = document.getElementById('newsSearch').value;

    // Add specific keywords related to financial advice, projections, and stability
    const keywords = 'financial projections OR financial stability OR company financials OR investor insights OR financial advice OR economic forecasts OR market analysis';
    const apiUrl = `https://newsapi.org/v2/everything?q=${query || keywords}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const title = article.title || 'No title available';
        const description = article.description || 'No description available';
        const url = article.url || '#';

        // Filter out articles with the title '[Removed]'
        if (title !== '[Removed]' && description !== 'No description available' && url !== '#') {
            const articleElement = document.createElement('div');
            articleElement.className = 'news-article';
            articleElement.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(articleElement);
        }
    });
}

document.getElementById('fetchRatios').addEventListener('click', function() {
    const symbol = document.getElementById('symbol').value;
    fetch(`/api/ratios?symbol=${symbol}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('ratiosOutput').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function searchNews() {
    const query = document.getElementById('newsSearch').value;