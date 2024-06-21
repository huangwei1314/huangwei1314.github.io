async function todolist() {
    try {
      const response = await fetch('https://memos.meetc.top/api/v1/memo?creatorId=1&tag=清单');
      const data = await response.json();
      
      data.forEach(item => {
        let content = item.content;
        let title = content.match(/\[(.*?)\]/g)[0].replace(/\[(.*?)\]/, '$1');
        
        content = content.replace(/#.*\s/g, '')
                         .replace(/(-\s\[\s\]\s)(.*)/g, `<li><i style="margin-right: 5px;" class="fa-regular fa-circle"></i>$2</li>`)
                         .replace(/(-\s\[x\]\s)(.*)/g, `<li class="achieve"><i style="margin-right: 5px;" class="fa-regular fa-circle-check"></i>$2</li>`);
        
        const div = document.createElement('div');
        div.className = 'list_item';
        div.innerHTML = `<h3>${title}</h3><ul>${content}</ul>`;
        document.getElementById('todolist').appendChild(div);
      });
      
      waterfall('#todolist');
    } catch (error) {
      console.error(error);
    }
  }
  
  todolist();
  // 清单函数