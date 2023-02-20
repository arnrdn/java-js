const userDetails = document.getElementById('user-tbody')

const FIND_CURR_USER_URL = '/api/currUser'

document.addEventListener('DOMContentLoaded', loadUser)

async function getUserData() {
    let res = await fetch(FIND_CURR_USER_URL)
    return res.json()
}

async function loadUser() {
    let {id, name, lastName, age, email, roles} = await getUserData()

    let userTableHtml = ''
    let userRoles = []
    for (let role of roles) {
        userRoles.push(role.role.toString().replaceAll('ROLE_', ''))
    }
    userTableHtml +=
        `<tr>
            <td class="user-id">${id}</td>
            <td class="user-name">${name}</td>
            <td class="user-last-name">${lastName}</td>
            <td class="user-age">${age}</td>
            <td class="user-email">${email}</td>
            <td><span class="user-roles"/>${userRoles}</td>
        </tr>`
    userDetails.innerHTML = userTableHtml
}