// const items = require("../models/Item");

function ChangeRom(type, element) {
    let item = document.getElementsByClassName("item")

    for (i = 0; i < item.length; i++) {

        item[i].style.background = '#828282'

    }
    element.style.background = '#222'
        // console.log(type)

}