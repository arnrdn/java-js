const idDel = document.getElementById('id1')
const nameDel = document.getElementById('name1')
const lastNameDel = document.getElementById('lastName1')
const ageDel = document.getElementById('age1')
const emailDel = document.getElementById('email1')
const rolesDel = document.getElementById('roles1')
const closeBtn = document.getElementById('close-delete-btn')
const deleteModal = document.getElementById('deleteUser')

deleteModal.addEventListener('submit', deleteUser)


async function deleteUserModal(id) {
    let userUrl = '/api/admin/users/' + id

    try {
        let deleteReq = await fetch(userUrl)
        await deleteReq.json().then(user => {
            idDel.value = user.id
            nameDel.value = user.name
            lastNameDel.value = user.lastName
            ageDel.value = user.age
            emailDel.value = user.email
            let rolesHtml = ``
            user.roles.forEach(role => {
                rolesHtml += `<option>${role.role}
                                </option>`
            })
            rolesDel.innerHTML = rolesHtml
        })

    } catch (e) {
        console.error(e)
    }
}

async function deleteUser(e) {
    e.preventDefault()

    let DELETE_URL = '/api/admin/users/delete/' + idDel.value
    let http = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(DELETE_URL, http).then(() => {
        closeBtn.click()
        loadUsers()
    })
}