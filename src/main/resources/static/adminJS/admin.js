const email = document.getElementsByClassName("navbar-email")
const usersTable = document.getElementById("admin-tbody")

const ALL_USERS_URL = '/api/admin'

document.addEventListener('DOMContentLoaded', loadUsers)

async function getData() {
    let res = await fetch(ALL_USERS_URL)
    return res.json()
}

async function loadUsers() {
    let usersList = await getData()
    let tableHtml = ''
    for (let user of usersList) {
        let roles = []
        for (let role of user.roles) {
            roles.push(role.role.toString().replaceAll('ROLE_', ''))
        }

        tableHtml +=
            `<tr>
                    <th class="users-list-id">${user.id}</th>
                    <td class="users-list-name">${user.name}</td>
                    <td class="users-list-last-name">${user.lastName}</td>
                    <td class="users-list-age">${user.age}</td>
                    <td class="users-list-email">${user.email}</td>
                    <td><span class="users-list-roles"/>${roles}</td>
                    <td>
                        <a type="button" class="btn btn-sm btn-primary"
                           data-bs-toggle="modal"
                           data-bs-target="#editUser"
                           onclick="editUserModal(${user.id})"
                           >
                            Edit
                        </a>
                    </td>
                    <td>
                        <a type="button" id="open-delete-modal" class="btn btn-sm btn-danger"
                           data-bs-toggle="modal"
                           data-bs-target="#deleteUser"
                           onclick="deleteUserModal(${user.id})"
                          >
                            Delete
                        </a>
                    </td>
                </tr>`
    }
    usersTable.innerHTML = tableHtml
}




