const cat_url = 'https://ajayirkal23.github.io/DataJson/itemdata.json'
const dress_url = 'https://ajayirkal23.github.io/DataJson/item2.json'


const getCity = async() => {
    let response = await fetch(cat_url, {
        method: 'GET'
    })
    let data = await response.json()
    data.map((item) => {
        let element = document.createElement('option')
        let text = document.createTextNode(item.Category_Name)
        element.appendChild(text)
        element.value = item.Category_id
        document.getElementById('cat-op').appendChild(element)

    })
}

const getRest = async() => {
    let dressid = document.getElementById('cat-op').value;
    let dresses = document.getElementsByClassName('restSelect')[0];
    while (dresses.length > 0) {
        dresses.remove(0)
    }
    let response = await fetch(`${dress_url}`, {
        method: 'GET'
    })
    let data = await response.json()
    let data2 = data.filter((current_element) => {
        if (dressid == current_element.product_id) {
            return current_element
        }
    })

    data2.map((item) => {
        let element = document.createElement('option')
        let text = document.createTextNode(`${ item.Name } | ${ item.Price }`)
        element.appendChild(text)
        dresses.appendChild(element)
    })
}