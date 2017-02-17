$(function() {

    $("#city").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "https://api.teleport.org/api/cities/",
                dataType: "json",
                data: {
                    term: request.term
                },
                success: function(data) {
                    response(data._links.self)
                    console.log('data is ', data)
                }
            })
        },
        minLength: 2,
        select: function(event, ui) {
            alert('you have just selected an item')
        }
    })

    let todayDate = new Date()
    let day = todayDate.getDate()
    let month = todayDate.getMonth() + 1

    let year = todayDate.getFullYear()
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    todayDate = month + '/' + day + '/' + year

    $("#datepicker").datepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1,
        minDate: todayDate,
        onClose: function(selectedDate) {
            let minCheckoutDate = new Date(Date.parse(selectedDate))
            minCheckoutDate.setDate(minCheckoutDate.getDate() + 1)
            $("#datepicker2").datepicker("option", "minDate", minCheckoutDate)
        }
    })
    $("#datepicker2").datepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1,
        onClose: function(selectedDate) {
            $("#datepicker").datepicker("option", "maxDate", selectedDate)
        }
    })

})

validateForm = () => {
    let city = $('#city').val()
    let checkInDate = $('#datepicker').val()
    let checkOutDate = $('#datepicker2').val()
    if (city == "") {
        alert("Please select a city")
        return false
    } else if (checkInDate == "") {
        alert("Please select a check in date")
        return false
    } else if (checkOutDate == "") {
        alert("Please select a check out date")
        return false
    }
}
