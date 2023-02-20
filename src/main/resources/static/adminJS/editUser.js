const idEdit = document.getElementById('editId')
const nameEdit = document.getElementById('editName')
const lastNameEdit = document.getElementById('editLastName')
const ageEdit = document.getElementById('editAge')
const emailEdit = document.getElementById('editEmail')
const passwordEdit = document.getElementById('editPassword')
const closeEditBtn = document.getElementById('close-edit-button')
const editModal = document.getElementById('editUser')

editModal.addEventListener('submit', editUser)

async function editUserModal(id) {
    let userEditUrl = '/api/admin/users/' + id

    try {
        let editReq = await fetch(userEditUrl)
        await editReq.json().then(user => {
            idEdit.value = user.id
            nameEdit.value = user.name
            lastNameEdit.value = user.lastName
            ageEdit.value = user.age
            emailEdit.value = user.email
            passwordEdit.value = user.password
        })

    } catch(e) {
        console.error(e)
    }
}

async function editUser(e) {
    e.preventDefault()

    const editForm = document.getElementById('editCurrUser')
    const editFormData = new FormData(editForm)
    let editObject = {}

    editFormData.forEach((value, key) => {
        if (key !== 'roles') {
            editObject[key] = value
        } else {
            if (!Array.isArray(editObject[key])) {
                editObject[key] = []
                editObject[key].push(value)
            } else {
                editObject[key].push(value)
            }
        }
    })
    let editJson = JSON.stringify(editObject)

    let EDIT_URL = '/api/admin/users/update/'+idEdit.value

    let editHttp = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: editJson
    }

    fetch(EDIT_URL, editHttp).then(() => {
        closeEditBtn.click()
        loadUsers()
    })
}