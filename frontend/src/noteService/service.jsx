import axios from 'axios'

const baseurl = 'http://localhost:8000/api/persons'

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseurl, newPerson)
    return request.then(response => response.data)
}

const refresh = (id, newPerson) => {
    const request = axios.put(`${baseurl}/${id}`, newPerson)
    return request.then(response => response.data)
} 

const remove = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}


export default { getAll, create, refresh, remove }