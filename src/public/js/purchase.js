
var btnDelivered = document.getElementById('btnDelivered')
var btnDelivering = document.getElementById('btnDelivering')
var btnAll = document.getElementById('btnAll')
var listProducts = document.getElementById('listProduct')

window.onload = () => {
    console.log('page is fully loaded');
    var api = "http://localhost:3000/purchase/all"
    fetch(api, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            listProducts.innerHTML = render(json)
        })
};

btnAll.onclick = function loadAll() {
    btnAll.style.backgroundColor = "black"
    document.getElementById('tagaAll').style.color = "white"
    btnDelivered.style.backgroundColor = "white"
    document.getElementById('tagaDelivered').style.color = "black"
    btnDelivering.style.backgroundColor = "white"
    document.getElementById('tagaDelivering').style.color = "black"
    var api = "http://localhost:3000/purchase/all"
    fetch(api, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            // console.log(render(json))
            listProducts.innerHTML = render(json)
        })
}


btnDelivered.onclick = function changBgColor() {
    btnDelivered.style.backgroundColor = "black"
    document.getElementById('tagaDelivered').style.color = "white"
    btnAll.style.backgroundColor = "white"
    document.getElementById('tagaAll').style.color = "black"
    btnDelivering.style.backgroundColor = "white"
    document.getElementById('tagaDelivering').style.color = "black"

    var api = "http://localhost:3000/purchase/delivered"
    fetch(api, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            listProducts.innerHTML = render(json);

        })
}

btnDelivering.onclick = function changBgColor() {
    btnDelivering.style.backgroundColor = "black"
    document.getElementById('tagaDelivering').style.color = "white"
    btnDelivered.style.backgroundColor = "white"
    document.getElementById('tagaDelivered').style.color = "black"
    btnAll.style.backgroundColor = "white"
    document.getElementById('tagaAll').style.color = "black"

    var api = "http://localhost:3000/purchase/delivering"
    fetch(api, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            listProducts.innerHTML = render(json);

        })
}






function render(json) {
    var output;
    for (let i in json) {

        for (let j in json[i].list) {

            output += `
            <div class="products">
        <div class="single_product">
            <div class="info">
                <div class="brand_status">
                    <div class="brand">

                        <p>Thương hiệu: <strong id="brandProduct">`+ json[i].list[j].optionID.item.brand + `</strong> | Ngày mua:
                            <strong id="dateProduct">`+ json[i].date + `</strong>
                        </p>
                    </div>
                    <div class="status">
                        <p>Trạng thái: <strong id="statusProduct">`+ json[i].status + `</strong></p>
                    </div>

                </div>
                <hr>
                <a href="/phone/iphone11-256GB" class="name_price">
                    <div class="img_name">
                        <img id="imgProduct" src="`+ json[i].list[j].optionID.color[0].image + `" alt="">
                        <div class="name_num">
                            <p class="name" id="nameProduct">`+ json[i].list[j].optionID.item.name + `</p>
                            <p class="num">x<strong id="numProduct">`+ json[i].list[j].num + `</strong></p>
                            <p class="num">Màu: <strong id="colorProduct">`+ json[i].list[j].color + `</strong></p>


                        </div>
                    </div>

                    <div class="price_one_product">
                        <p><strong id="priceProduct">`+ json[i].list[j].optionID.color[0].price + `</strong> </p>
                    </div>
                </a>
                <hr>
            </div>
            <div class="price">
                <p id="totalPrice">Tổng số tiền: <strong id="totalPriceProduct"> `+ json[i].list[j].optionID.color[0].price * json[i].list[j].num + `</strong></p>
            </div>

            <div class="action">
                <button class="btn btn_repurchase">Mua lại</button>
                <button class="btn btn_delete">Xóa</button>
            </div>
        </div>

    </div>
             
            `
        }
    }
    return output
}

