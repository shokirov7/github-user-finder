const input = document.querySelector("#search");
const btn = document.querySelector(".search-btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const API = `https://api.github.com/users/${input.value}`;
  let countries;

  fetch(API)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      countries = data;
      upDate(data);
      console.log(countries);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector('.search-bar input').style.width = '59%'
      document.querySelector('.search-bar input').style.transition = '0s'
      document.querySelector('.search-error').style.display = 'block';
      document.querySelector('.search-error').innerHTML = "Not found";
    });

  const upDate = (data) => {
    const name = data.name ? data.name : "Not defined";
    const blog = data.blog
      ? `<a class="twitter-in" href="${data.blog}">https://github.blog/${data.blog}</a>`
      : `<p>Not defined</p>`;
    const location = data.location ? data.location : "Not defined";
    const company = data.company ? data.company : "Not defined";
    const bio = data.bio ? data.bio : "Not defined";
    const twitter = data.twitter_username
      ? `<a class="twitter-in" href="https://twitter.com/${data.twitter_username}">https://twitter.com/${data.twitter_username}</a>`
      : `<p>Not Available</p>`;
    const createdAt = new Date(data.created_at)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");

    if (data.login.includes(input.value)) {
      document.querySelector(".name").innerHTML = name;
      document.querySelector(".date").innerHTML = `Joined ${createdAt}`;
      document.querySelector(".info-id").innerHTML = `@${data.login}`;
      document.querySelector(".info-desc").innerHTML = bio;
      document.querySelector(".repos").innerHTML = data.public_repos;
      document.querySelector(".followers").innerHTML = data.followers;
      document.querySelector(".following").innerHTML = data.following;
      document.querySelector(".location").innerHTML = location;
      document.querySelector(".twitter").innerHTML = twitter;
      document.querySelector(".url").innerHTML = blog;
      document.querySelector(".office").innerHTML = company;
      document.querySelector(".info-img img").setAttribute("src", data.avatar_url);
      document.querySelector('.search-error').style.display = 'none';
      document.querySelector('.search-bar input').style.width = '74%'
    }
  };
});

const mode = document.querySelector('.mode');

mode.addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark-mode');
  const modeText = document.querySelector('.mode-text');
  const sunIcon = document.querySelector('.sun');

  if (document.querySelector('body').classList.contains('dark-mode')) {
    modeText.innerHTML = 'LIGHT';
    sunIcon.classList.add('switch-off');
  } else {
    modeText.innerHTML = 'DARK';
    sunIcon.classList.remove('switch-off');
  }

  document.querySelector('.moon').classList.toggle('switch');
});
