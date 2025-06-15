import ZeroMd from 'https://cdn.jsdelivr.net/npm/zero-md@3'

customElements.define('zero-md', ZeroMd)

const fetchPosts = async () =>{
    const response = await fetch('https://blog-octokit.bambans.workers.dev')

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json()
}

const CDN_PREFIX = 'https://cdn.jsdelivr.net/gh/bambans/blog@main/posts/'

const renderPostList = async posts => {
    const nav = document.getElementById('nav')
    nav.innerHTML = ''
    const ul = document.createElement('ul')
    posts.forEach(post => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = CDN_PREFIX + post
        a.textContent = post.replace('.md', '').replace(/_/g, ' ')
        a.onclick = e => {
            e.preventDefault()
            loadPost(post)
        }
        li.appendChild(a)
        ul.appendChild(li)
    })
    nav.appendChild(ul)
}

const loadPost = async postFile => {
    const article = document.getElementById('article')
    article.innerHTML = ''   
    const zeroMd = document.createElement('zero-md')
    zeroMd.setAttribute('src', CDN_PREFIX + postFile)
    article.appendChild(zeroMd)
}

document.addEventListener('DOMContentLoaded', async () => {
    const posts = await fetchPosts()
    renderPostList(posts)
    if (posts.length) loadPost(posts[0])
})