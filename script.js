var searchQuery;
$(document).ready(function () {
    $('#drinkSearchBtn').on('click', function () {
        dumpDivs()
        searchQuery = $('#drinkSearch').val().trim();
        console.log(searchQuery);
        getDrinkInfo('search.php?s=' + searchQuery);
    })
    $('#randomDrinkBtn').on('click', function () {
        dumpDivs()
        searchQuery = 'random.php';
        console.log(searchQuery);
        getDrinkInfo(searchQuery);
    })

});
function dumpDivs() {
    $('#cocktailName').html(" ")
    $('#image').html(" ")
    $('#ingredients').html(" ")
    $('#instructions').html(" ")
}
function getDrinkInfo(param) {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/' + param;
    response = $.getJSON(url, function (data) {
        console.log('data', data)
        if (data.drinks != null) {
            drinkData = data.drinks[0]
            // ============
            ing = [];
            mea = [];
            ings = [];
            meas = [];
            ing.push(drinkData.strIngredient1, drinkData.strIngredient2, drinkData.strIngredient3, drinkData.strIngredient4,
                drinkData.strIngredient5, drinkData.strIngredient6, drinkData.strIngredient7, drinkData.strIngredient8,
                drinkData.strIngredient9, drinkData.strIngredient10, drinkData.strIngredient11, drinkData.strIngredient12,
                drinkData.strIngredient13, drinkData.strIngredient14, drinkData.strIngredient15
            )
            mea.push(drinkData.strMeasure1, drinkData.strMeasure2, drinkData.strMeasure3, drinkData.strMeasure4,
                drinkData.strMeasure5, drinkData.strMeasure6, drinkData.strMeasure7, drinkData.strMeasure8,
                drinkData.strMeasure9, drinkData.strMeasure10, drinkData.strMeasure11, drinkData.strMeasure12,
                drinkData.strMeasure13, drinkData.strMeasure14, drinkData.strMeasure15
            )
            sliceNulls(ing, mea);

            function sliceNulls(ingArr, meaArr) {
                for (var i = 0; i < ingArr.length; i++) {
                    if (ingArr[i] != null) {
                        ings.push(ingArr[i]);
                        if (meaArr[i] != null) {
                            meas.push(meaArr[i])
                        } else {meas.push('')}
                    } else{}
                }
            }
            drinkId = drinkData.idDrink;
            name = drinkData.strDrink;
            image = drinkData.strDrinkThumb;
            instructions = drinkData.strInstructions;
            ingredients = ings;
            measurements = meas;
            // ============
            $("#cocktailName").append(`<div class="data" data="${drinkId}">${name}</div>`);
            $("#image").append(`<img src="${image}"/>`);
            for (var i = 0; i < ings.length; i++) {
                    $("#ingredients").append(`<span>${meas[i]} ${ings[i]} </span>`);
            };
            $("#instructions").append(`<p>${instructions}</p>`);
            searchVideo(name)
            $('#contentName').attr("name", "cocktailName");
            $('#contentName').attr("value", name);
        } else {
            $('#cocktailName').append(`<div class='data'>Nothing Found</div>`);
        };
    })
}
// ========================
function searchVideo(qry) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://youtube-search.p.rapidapi.com/search?q=${qry}%20recipe&part=snippet&key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "youtube-search.p.rapidapi.com",
            "x-rapidapi-key": "1bb40a3f2cmsh737e756f49ff562p1d4980jsn6537251a9bc1"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        $('#content2').html(`
        <iframe src="https://www.youtube.com/embed/${response.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);
    });
};
$(document).ready( // this may run before searchVideo()
    $('#drinkSearchBtn').on('click', function (event) {
        event.preventDefault();
        var input = $('#drinkSearch').val().trim();
        searchVideo(input)
    })
);