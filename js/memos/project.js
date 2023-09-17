function todolist() {
    fetch('https://memos.443.lol/api/v1/memo?creatorId=1&tag=清单').then(e=>e.json()).then((e=>{
        // 获取并处理数据
        e.forEach((e=>{
            // 处理数据
            let t = e.content,
                l = t.match(/\[(.*?)\]/g)[0].replace(/\[(.*?)\]/, '$1');
            // 去掉多余内容，替换清单内容
            t = t.replace(/#.*\s/g, '').replace(/(-\s\[\s\]\s)(.*)/g, `<li><i style="margin-right: 5px;" class="fa-regular fa-circle"></i>$2</li>`).replace(/(-\s\[x\]\s)(.*)/g, `<li class="achieve"><i style="margin-right: 5px;" class="fa-regular fa-circle-check"></i>$2</li>`);
            // 渲染数据
            let a = document.createElement('div');
            a.className = 'list_item';
            a.innerHTML = `<h3>${1}</h3><ul>${t}</ul>`;
            document.getElementById('todolist').appendChild(a)
        }
        ));
        waterfall('#todolist');
    }    
    )).catch()
}
todolist();

// 清单函数