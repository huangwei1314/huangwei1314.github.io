function whenDOMReady() {
    if (location.pathname == '/photos/') photos();
  }
  
  whenDOMReady();
  document.addEventListener("pjax:complete", whenDOMReady);
  
  // 适配pjax
  
  window.onresize = () => {
    if (location.pathname == '/photos/') waterfall('.gallery-photos');
  };
  
  // 自适应
  
  function photos() {
    let url = 'https://memos.443.lol'; // 修改api
    let cacheKey = 'photosCache';
    let cacheData = sessionStorage.getItem(cacheKey);
  
    if (cacheData) {
      renderPhotos(JSON.parse(cacheData));
    } else {
      fetch(url + '/api/v1/memo?creatorId=1&tag=相册')
        .then(res => res.json())
        .then(data => {
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
          renderPhotos(data);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }
  }
  
  function renderPhotos(data) {
    let html = '';
    let imgs = [];
  
    data.forEach(item => {
      let ls = item.content.match(/\!\[.*?\]\(.*?\)/g);
      if (ls) imgs = imgs.concat(ls);
      if (item.resourceList.length) {
        item.resourceList.forEach(t => {
          if (t.externalLink) imgs.push(`![](${t.externalLink})`);
          else imgs.push(`![](${url}/o/r/${t.id}/${t.publicId}/${t.filename})`);
        });
      }
    });
  
    if (imgs) {
      imgs.forEach(item => {
        let img = item.replace(/!\[.*?\]\((.*?)\)/g, '$1');
        let time, title, tat = item.replace(/!\[(.*?)\]\(.*?\)/g, '$1');
        if (tat.indexOf(' ') != -1) {
          time = tat.split(' ')[0];
          title = tat.split(' ')[1];
        } else {
          title = tat;
        }
  
        html += `<div class="gallery-photo"><a href="${img}" data-fancybox="gallery" class="fancybox" data-thumb="${img}"><img class="no-lazyload photo-img" loading='lazy' decoding="async" src="${img}"></a>`;
        if (title) html += `<span class="photo-title">${title}</span>`;
        if (time) html += `<span class="photo-time">${time}</span>`;
        html += `</div>`;
      });
    }
  
    document.querySelector('.gallery-photos.page').innerHTML = html;
    imgStatus.watch('.photo-img', () => {
      waterfall('.gallery-photos');
    });
    window.Lately && Lately.init({ target: '.photo-time' });
  }