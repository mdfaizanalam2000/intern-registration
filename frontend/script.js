const loadUser = async () => {
    const email = document.getElementById("exampleInputEmail1").value
    const password = document.getElementById("exampleInputPassword1").value

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
            localStorage.setItem("data", JSON.stringify(data))
            window.location.href = "loginSuccess.html"
        }
    } catch (e) {
        alert(e)
    }
}

if (window.location.pathname === "/frontend/loginSuccess.html") {
    let message = document.getElementById("message")
    let user_data = document.getElementById("data")
    data = JSON.parse(localStorage.getItem("data"))
    message.innerText = `Hello ${data.details.email}, welcome to the portal. Find all your details below!`
    user_data.innerText = JSON.stringify(data.details)
}

const handleSignup = async () => {
    email = document.getElementById("exampleInputEmail1").value
    password = document.getElementById("exampleInputPassword1").value
    cpassword = document.getElementById("exampleInputPassword2").value
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
                    "email": email,
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