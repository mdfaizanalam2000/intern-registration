const loadUser = async () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch("http://127.0.0.1:8000/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const data = await response.json()
        alert(data.message)
        if (data.message === "login successful!") {
            delete data.details.password
            localStorage.setItem("data", JSON.stringify(data.details))
            window.location.href = "loginSuccess.html"
        }
    } catch (e) {
        alert(e)
    }
}

if (window.location.pathname === "/frontend/loginSuccess.html" && localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"))
    let name = document.getElementById("card-name")
    let email = document.getElementById("card-email")
    let phone = document.getElementById("card-phone")
    let role = document.getElementById("card-role")

    name.innerText = `Name: ${data.name}`
    email.innerText = `Email: ${data.email}`
    phone.innerText = `Phone: ${data.phone}`
    role.innerText = `Role: ${data.role}`
} else if (window.location.pathname === "/frontend/loginSuccess.html" && !localStorage.getItem("data")) {
    window.location.href = "login.html"
}

const handleSignup = async () => {
    name = document.getElementById("name").value
    email = document.getElementById("email").value
    phone = document.getElementById("phone").value
    role = document.getElementById("role").value
    password = document.getElementById("password").value
    cpassword = document.getElementById("cpassword").value
    if (password !== cpassword)
        alert("Passwords are not matching")
    else {
        try {
            const response = await fetch("http://127.0.0.1:8000/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "phone": phone,
                    "role": role,
                    "password": password
                })
            })
            const data = await response.json()
            alert(data.message)
            window.location.href = "login.html"
        } catch (e) {
            alert(e)
        }
    }
}

const handleLogout = () => {
    localStorage.removeItem("data")
    window.location.href = "index.html"
}