var inp = document.getElementById("file")
var button = document.getElementById("upload")
var submit = document.getElementById("submit")
// var progress1 = document.getElementById("circle")
var files
img_url=""

var DISH_NAME = document.getElementById("dish")
var PRICE = document.getElementById("price")
var QTY = document.getElementById("title")


inp.addEventListener("click",function(){
    inp.onchange = e =>{
        files = e.target.files;
        reader = new FileReader();

        console.log(reader.result)
       
        reader.readAsDataURL(files[0])
        console.log(files[0])
        document.getElementById("upload").removeAttribute("disabled")

       
    }
    
})

 upload.addEventListener("click",function (){
    event.preventDefault()
    // console.log(files[0])
    // var strg = 

    var uploadTask = firebase.storage().ref(`images/${files[0].name}`).put(files[0])


    uploadTask.on('state_changed',snapshot => { 
    
      
     
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            img_url =   downloadURL;
          console.log('File available at', downloadURL);
        //  document.getElementById('submit').removeAttribute('disabled')
        });
      }
    );

   


})
// console.log(button)

submit.addEventListener("click",async function(){
    event.preventDefault()
    var key = firebase.database().ref("Dishes/").push().getKey()

    var obj = {
        Dish_Name:DISH_NAME.value,
        Price:PRICE.value,
        qty:QTY.value,
        imgUrl :img_url,
        Dish_Key : key

    }

  await   firebase.database().ref("Dishes/").child(key).set(obj)

  localStorage.setItem("key",key)

  window.location.replace("edit.html")
})
