var romItem = document.querySelectorAll('h3')

for (var i = 0; i < romItem.length; ++i) {
    romItem[i].onclick = function(e) {
        console.log(e.target)
        e.target.addEventListener
    }
}