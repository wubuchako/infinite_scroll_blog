const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

//fetch posts from API　APIからデータとる
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  
  return data;
}


//show posts in DOM 得たデーターをwebに出す
async function showPosts(){
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
    `;

    postsContainer.appendChild(postEl);
  })
}

//Show loader & fetch more posts
function showLoading(){
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    },300);

  }, 1000);
}

//Filter posts by input　入力するとそれの単語によるものが表示される。
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  //入力したものと該当するところが大文字で出る。
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      //入力と該当するものない時、表示しない
      post.style.display = 'none';
    }

  });
}

//Show initial posts　
showPosts();　//最初の５つの内容を出す

window.addEventListener('scroll', () => {
  const {
    scrollTop, scrollHeight, clientHeight
  } = document.documentElement;

  if(scrollTop + clientHeight >= scrollHeight - 5){
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);