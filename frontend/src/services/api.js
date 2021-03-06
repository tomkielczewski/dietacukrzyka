import * as Axios from 'axios'
import { getAccessToken } from '@/services/auth'


var apiHost = 'https://' + window.location.hostname

if (process.env.NODE_ENV === 'development') {
  apiHost = 'http://localhost:8000'
}



const api = Axios.create({
    baseURL: apiHost,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  
const authenticationHeader = () => {
    return {
      Authorization: `Bearer ${getAccessToken()}`
    }
  }
  
  
export async function register (user_data) {
    return api.post('/app/register', user_data)
  }

export async function login (user) {
    return api.post('/api/token/', { username: user.login, password: user.password })
  }

export async function refresh (refToken) {
    return api.post('/api/token/refresh/', { refresh: refToken })
  }

  export async function getClientMenu () {
    return api.get(`/app/client/menu/`, { headers: authenticationHeader() })
  }
  
  export async function getClientInfo () {
    return api.get('/app/client/get', { headers: authenticationHeader() })
  }

  export async function saveClientInfo (user_data) {
    return api.put('/app/client/save', user_data, { headers: authenticationHeader() })
  }

  export async function getFile (fileName) {
    return api.get(`/app/client/${fileName}`, { responseType: 'arraybuffer', headers: authenticationHeader() })
  }

  export async function getAllRecipes () {
    return api.get(`/app/recipes/`, { headers: authenticationHeader() })
  }
  
  export async function getAllIngredients () {
    return api.get(`/app/ingredients/`, { headers: authenticationHeader() })
  }

  export async function getAllAllergens () {
    return api.get(`/app/allergens/`, { headers: authenticationHeader() })
  }

  export async function generateNewDiet () {
    return api.get(`/app/client/diet/`, { headers: authenticationHeader() })
  }

  export async function saveEatingInfo (info, date) {
    return api.post(`/app/client/meal/info/`, {info, date}, { headers: authenticationHeader() })
  }

  export async function uploadRecipeImage (file, onUploadProgress, fileName) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_name', fileName)
    return api.post('app/recipe/image/', formData, {
      headers: { Authorization: `Bearer ${getAccessToken()}`, 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    })
  }

  export async function saveNewRecipe (recipe) {
    return api.post('/app/recipe/new/', recipe, { headers: authenticationHeader() })
  }
  
  export async function uploadDocument (file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('app/documents/', formData, {
      headers: { Authorization: `Bearer ${getAccessToken()}`, 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    })
  }