const queryId = (id) => document.getElementById(id);
const BASE_API = "https://api.github.com/users";
// const endpointCharacter =

// const getUsers = async () => {
//     const response = await fetch(`${BASE_API}`)
//     const data = await response.json()
//     console.log(data)
// }

const getUsers = () => {
    fetch(`${BASE_API}`)
    .then(response => response.json())
    .then(data => showData(data))
    .catch(err => console.log(err))
}

getUsers()
    // .then(data => showData(data))
    // .catch(err => console.log(err))

const getUser = (login) => {
    fetch(`${BASE_API}/${login}`)
    // console.log(login)
        .then(res => res.json())
        .then(data => showDetail(data))
        .catch(err => console.log(err))
}

const showData = (users) => {
    for (const user of users) {
        const { login, id, avatar_url } = user;
        queryId("container").innerHTML += `
            <div class="card m-3" style="width: 18rem;" onclick="getUser('${login}')">
                <img src="${avatar_url}" class="card-img-top" alt="Imagen de ${login}">
                <div class="card-body">
                    <h5 class="card-title">${login}</h5>
                </div>
            </div>
            `
    }
}

const showDetail = (user) => {
    queryId("back").classList.remove("d-none")

    const { login, name, id, avatar_url, html_url, location } = user
    queryId("container").innerHTML = "";
        queryId("container").innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${avatar_url}" class="img-fluid rounded-start" alt="Imagen de ${login}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <a href="${html_url}" target="_blank" class="card-text">My GitHub</a>
                            <p class="card-text">${location}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
}

queryId("back").addEventListener('click', () => {
    queryId("container").innerHTML = "";
    getUsers()
    queryId("back").classList.add("d-none")
})

// showData()
//     .then(data => showData(data))