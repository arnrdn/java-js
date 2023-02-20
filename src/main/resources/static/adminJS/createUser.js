const createModal = document.getElementById('new-user-form')
const allUsersTab = document.getElementById('all-users-tab')
const newUserTab = document.getElementById('new-user-tab')
const allUsersContent = document.getElementById('all-users')
const newUserContent = document.getElementById('new-user')

createModal.addEventListener('submit', addUser)


const ADD_USER_URL = '/api/admin/users/add'


async function addUser(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    let object = {}

    formData.forEach((value, key) => {
        if (key !== 'roles') {
            object[key] = value
        } else {
            if (!Array.isArray(object[key])) {
                object[key] = []
                object[key].push(value)
            } else {
                object[key].push(value)
            }
        }
    })
    let json = JSON.stringify(object)

    let http = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    }

    await fetch(ADD_USER_URL, http).then(() => {
        createModal.reset()
        loadUsers()
        newUserTab.classList.remove('active')
        newUserTab.ariaSelected = 'false'
        newUserContent.classList.remove('active', 'show')
        allUsersTab.classList.add('active')
        allUsersTab.ariaSelected = 'true'
        allUsersContent.classList.add('active', 'show')
    })

}