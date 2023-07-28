const input = document.querySelector("#input");
const btn = document.querySelector(".search_btn a");
const holder = document.querySelector(".holder");
const mode = document.querySelector('.mode_btn a')
mode.addEventListener('click', (e) => {
  e.preventDefault()
})

const handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    btn.click();
  }
};

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
    });

  const upDate = (data) => {
    // input.trim()
    input.value = "";
    holder.innerHTML = "";
    const name = data.name ? data.name : "Not defined";
    const blog = data.blog
      ? `<a href="${blog}">https://github.blog/${data.blog}</a>`
      : `<p>Not defined</p>`;
    const location = data.location ? data.location : "Not defined";
    const company = data.company ? data.company : "Not defined";
    const bio = data.bio ? data.bio : "Not defined";
    const twitter = data.twitter_username
      ? `<a href="${data.twitter}">https://twitter.com/${data.twitter_username}</a>`
      : `<p>Not Available</p>`;
    const createdAt = new Date(data.created_at)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(",", "");
    holder.innerHTML = `
                <div class="info">
                    <div class="info_top">
                        <div class="user_img"><img src="${data.avatar_url}" alt=""></div>
                        <div class="user_bio">
                            <div class="bio_top">
                                <p class="name">${name}</p>
                                <span class="id">@${data.login}</span>
                            </div>
                            <p class="date">Joined ${createdAt}</p>
                        </div>
                    </div>
                    <div class="bio">${bio}</div>
                    <div class="user_stats">
                        <div class="stats_block">
                            <p>Repos</p>
                            <span>${data.public_repos}</span>
                        </div>
                        <div class="stats_block">
                            <p>Followers</p>
                            <span>${data.followers}</span>
                        </div>
                        <div class="stats_block">
                            <p>Following</p>
                            <span>${data.following}</span>
                        </div>
                    </div>
                    <div class="user_moreinfo">
                        <div class="moreinfo_left">
                            <div class="location">
                                <i class="fa-solid fa-location-dot"></i>
                                ${location}
                            </div>
                            <div class="link">
                                <i class="fa-solid fa-link"></i>
                                ${blog}
                            </div>
                        </div>
                        <div class="moreinfo_right">
                            <div class="twitter">
                                <i class="fa-brands fa-twitter"></i>
                                ${twitter}</div>
                        <div class="company">
                            <i class="fa-solid fa-building"></i>
                            ${company}</div>
                        </div>
                    </div>
                </div>`;
  };
});

input.addEventListener("keypress", handleKeyPress);
