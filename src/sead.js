import { collection , addDoc } from "firebase/firestore";
export function SeadDatabase(db) {
    console.log('adding to firestore')
    const users =[
        {
            userId : '6iC7jvLGTCXaDJRncTFV1pBLM993',
            username : 'javad',
            fullname : 'khavari',
            emailAddress : 'khavari@gmail.com',
            following : ['2'], 
            followers : ['2','3','4'] , 
            dateCreated : Date.now()
        },
        {
            userId : '2',
            username : 'Fati',
            fullname : 'Ansu',
            emailAddress : 'Fati@gmail.com',
            following : ['2'], 
            followers : ['6iC7jvLGTCXaDJRncTFV1pBLM993'] , 
            dateCreated : Date.now()
        },
        {
            userId : '3',
            username : 'Najla',
            fullname : 'Mahmoodi',
            emailAddress : 'Najla@gmail.com',
            following : ['3'], 
            followers : ['6iC7jvLGTCXaDJRncTFV1pBLM993'] , 
            dateCreated : Date.now()
        },
        {
            userId : '4',
            username : 'Ali',
            fullname : 'Bache Soltan',
            emailAddress : 'Soltan@gmail.com',
            following : ['4'], 
            followers : ['6iC7jvLGTCXaDJRncTFV1pBLM993'] , 
            dateCreated : Date.now()
        }
    ]


    for (let i = 0; i < users.length; i++) {
        addDoc(collection(db,'users'), users[i]);  
        console.log('adding: ',users[i])      
    }


    for (let i = 1; i <= 5; ++i) {
        addDoc(collection(db,'photos') ,{
            photoId: i,
            userId: '2',
            imageSrc: `/images/users/raphael/${i}.jpg`,
            caption: 'Saint George and the Dragon',
            likes: [],
            comments: [
              {
                displayName: 'dali',
                comment: 'Love this place, looks like my animal farm!'
              },
              {
                displayName: 'orwell',
                comment: 'Would you mind if I used this picture?'
              }
            ],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now()
          });
      }
}