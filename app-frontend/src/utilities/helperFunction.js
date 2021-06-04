export const validateEmail = (email) =>{
   
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    let validEmail = regex.test(email)?false:'Please enter Valid email'
    return validEmail
}

export const requireField = (name,msg='') => {
    const validField = name.length>0 ? false : msg
    return validField
}

export const validatePassword = (password) =>{
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    const validPass = regex.test(password)? false: 'Password strength is weak'
    return validPass
}

export const validateConfirmPassWord = (Confirmpass,password)=>{
    return Confirmpass===password&&Confirmpass.length>1 ? false :'Invalid confirm password'

}

export const isObjectEmpty = (object) =>{

    let flag = true
    const traverseNode = (arr, id, n, obj) => {
      if (id >= n) return
  
      if (obj[arr[id]] instanceof Object) {
        traverseNode(
          Object.keys(obj[arr[id]]),
          0,
          Object.keys(obj[arr[id]]).length,
          obj[arr[id]]
        )
      } else if (obj[arr[id]]!==false) {
        flag = false
  
        return
      } else {
        traverseNode(arr, id + 1, n, obj)
      }
    }
    traverseNode(Object.keys(object), 0, Object.keys(object).length, object)
  
    return flag
}

export const getUser = () =>{
    if(typeof window == undefined){
       return false
    }
  if(localStorage.getItem("token")&&localStorage.getItem("user")){
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    return {token,user}
  }

  return false
}