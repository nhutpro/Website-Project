// localStorage.setItem("match", 0)

window.onload = () => {
<<<<<<< HEAD
	var searchProduct = document.getElementById("searchBox");
	// var countProduct = document.querySelectorAll('div[id=countProduct]')
	var count = document.getElementById("count");
	var key = document.getElementById("key");
	var sortAsc = document.getElementById("sort-asc");
	var sortDesc = document.getElementById("sort-desc");
	searchProduct.onchange = () => {
		var api = "http://localhost:3000/search/match?key=" + searchProduct.value;
		fetch(api, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				localStorage.setItem("match", json);
			});
		localStorage.setItem("count", searchProduct.value);

		console.log(searchProduct.value);
		window.history.pushState(
			{},
			"",
			"http://localhost:3000/search/global?key=" + searchProduct.value
		);

		window.location.reload();
	};

	if (count != null) {
		count.innerHTML = localStorage.getItem("match");

		key.innerHTML = "'" + localStorage.getItem("count") + "'";
		// sort price
		sortAsc.onclick = () => {
			window.history.pushState(
				{},
				"",
				"http://localhost:3000/search/global?key=" +
					localStorage.getItem("count") +
					"&sort=asc"
			);
			window.location.reload();
		};
		sortDesc.onclick = () => {
			window.history.pushState(
				{},
				"",
				"http://localhost:3000/search/global?key=" +
					localStorage.getItem("count") +
					"&sort=desc"
			);
			window.location.reload();
		};
	} else {
		var temp = "true";
	}
};
=======
    var searchProduct = document.getElementById('searchBox')
    // var countProduct = document.querySelectorAll('div[id=countProduct]')
    var count = document.getElementById('count')
    var key = document.getElementById('key')
    var sortAsc = document.getElementById('sort-asc')
    var sortDesc = document.getElementById('sort-desc')
    searchProduct.onchange = () => {
        var api = "http://localhost:3000/search/match?key=" + searchProduct.value
        fetch(api, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem("match", json)
            })
        localStorage.setItem("count", searchProduct.value)

        console.log(searchProduct.value)
        window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + searchProduct.value);

        window.location.reload();

    }

    if (count != null) {
        count.innerHTML = localStorage.getItem("match")

        key.innerHTML = "'" + localStorage.getItem("count") + "'"
        // sort price
        sortAsc.onclick = () => {
            window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + localStorage.getItem("count") + "&sort=asc");
            window.location.reload();
        }
        sortDesc.onclick = () => {
            window.history.pushState({}, "", "http://localhost:3000/search/global?key=" + localStorage.getItem("count") + "&sort=desc");
            window.location.reload();
        }

    }
    else {
        var temp = "true"
    }



}

>>>>>>> 8a3259e12cc123d6e9fa69250d3561e7ed9802a9
