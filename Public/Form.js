async function submitForm()
{
    const data = {
        name: document.getElementById("Name").value,
        mobile: document.getElementById("Mobile").value,
        email: document.getElementById("Email").value
    }

    const response = await fetch("/api/user-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const response_json = await response.json();
    console.log(response_json);
}