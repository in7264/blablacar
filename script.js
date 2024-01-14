// Функція для відображення вкладок
function openTab(tabName) {
    var i, tabContent;

    // Отримати всі елементи з класом "tab-content"
    tabContent = document.getElementsByClassName("tab-content");

    // Перебрати всі елементи і приховати їх
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Показати вибрану вкладку
    document.getElementById(tabName).style.display = "block";

    // Викликати функцію для відображення всіх поїздок на активній вкладці
    displayAllTrips();
}

// Функція для додавання нової поїздки
function addTrip(event) {
    event.preventDefault();

    // Отримати значення з форми
    var departure = document.getElementById("departure").value;
    var destination = document.getElementById("destination").value;
    var departureTime = document.getElementById("departureTime").value;
    var smokingAllowed = document.getElementById("smokingAllowed").checked;
    var petsAllowed = document.getElementById("petsAllowed").checked;

    // Створити об'єкт поїздки
    var trip = {
        departure: departure,
        destination: destination,
        departureTime: departureTime,
        smokingAllowed: smokingAllowed,
        petsAllowed: petsAllowed
    };

    // Зберегти поїздку в локальному сховищі браузера
    var trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));

    // Повідомлення користувача про успішне додавання поїздки
    alert("Поїздка додана успішно!");
}

// Функція для пошуку поїздок
function searchTrips() {
    // Отримати значення фільтрів пошуку
    var departureSearch = document.getElementById("departureSearch").value.toLowerCase();
    var destinationSearch = document.getElementById("destinationSearch").value.toLowerCase();
    var smokingSearch = document.getElementById("smokingSearch").checked;
    var petsSearch = document.getElementById("petsSearch").checked;

    // Отримати всі поїздки з локального сховища
    var trips = JSON.parse(localStorage.getItem("trips")) || [];
    
    // Фільтрація поїздок відповідно до введених критеріїв
    var searchResults = trips.filter(function (trip) {
        return trip.departure.toLowerCase().includes(departureSearch) &&
            trip.destination.toLowerCase().includes(destinationSearch) &&
            (!smokingSearch || trip.smokingAllowed === smokingSearch) &&
            (!petsSearch || trip.petsAllowed === petsSearch);
    });

    // Відображення результатів пошуку
    displaySearchResults(searchResults);
}

// Функція для відображення результатів пошуку
function displaySearchResults(results) {
    var searchResultsContainer = document.getElementById("searchResults");

    // Очистити попередні результати
    searchResultsContainer.innerHTML = "";

    if (results.length === 0) {
        // Відобразити повідомлення, якщо пошук не дав результатів
        searchResultsContainer.innerHTML += "<p>Пошук не дав результатів.</p>";
    } else {
        // Відобразити кожен знайдений результат
        results.forEach(function (trip) {
            searchResultsContainer.innerHTML += "<div><strong>Відправлення:</strong> " + trip.departure +
                "<br><strong>Призначення:</strong> " + trip.destination +
                "<br><strong>Час відправлення:</strong> " + trip.departureTime +
                "<br><strong>Куріння:</strong> " + (trip.smokingAllowed ? "Дозволено" : "Не дозволено") +
                "<br><strong>Тварини:</strong> " + (trip.petsAllowed ? "Дозволено" : "Не дозволено") +
                "</div><hr>";
        });
    }
}

// Функція для відображення всіх поїздок
function displayAllTrips() {
    var trips = JSON.parse(localStorage.getItem("trips")) || [];
    var allTripsContainer = document.getElementById("allTrips");

    // Очистити контейнер перед відображенням нових результатів
    allTripsContainer.innerHTML = "";

    if (trips.length === 0) {
        // Відобразити повідомлення, якщо немає доступних поїздок
        allTripsContainer.innerHTML = "<p>На жаль, немає доступних поїздок.</p>";
    } else {
        // Відобразити кожну збережену поїздку
        trips.forEach(function (trip, index) {
            var tripContainer = document.createElement("div");
            tripContainer.innerHTML = "<strong>Відправлення:</strong> " + trip.departure +
                "<br><strong>Призначення:</strong> " + trip.destination +
                "<br><strong>Час відправлення:</strong> " + trip.departureTime +
                "<br><strong>Куріння:</strong> " + (trip.smokingAllowed ? "Дозволено" : "Не дозволено") +
                "<br><strong>Тварини:</strong> " + (trip.petsAllowed ? "Дозволено" : "Не дозволено") +
                "<br><button onclick='deleteTrip(" + index + ")'>Видалити</button><hr>";
            allTripsContainer.appendChild(tripContainer);
        });
    }
}

// Функція для видалення поїздки
function deleteTrip(index) {
    var trips = JSON.parse(localStorage.getItem("trips")) || [];

    if (index >= 0 && index < trips.length) {
        // Видалити поїздку за вказаним індексом
        trips.splice(index, 1);

        // Оновити локальне сховище
        localStorage.setItem("trips", JSON.stringify(trips));

        // Відобразити оновлені поїздки
        displayAllTrips();
    }
}
