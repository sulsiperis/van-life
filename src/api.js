import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDocs, getFirestore, collection, doc, getDoc, query, where } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyByX7UtmOzfLnJn8KpmL_J3mHvqpFTowx0",
  authDomain: "van-life-add98.firebaseapp.com",
  projectId: "van-life-add98",
  storageBucket: "van-life-add98.appspot.com",
  messagingSenderId: "52160060792",
  appId: "1:52160060792:web:7be7981bedd02789bf7c8d",
  measurementId: "G-E654FC0KF8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app); //reference needed for delete note func
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
    }))
    return dataArr
}
export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const vanSnapshot = await getDoc(docRef)    
    return vanSnapshot.data()
}
export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", 123))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
    }))
    return dataArr
}
export async function getHostVan(id) {
    const q = query(vansCollectionRef, where("hostId", "==", 123), where("id", "==", id))
    const querySnapshot = await getDocs(q)
    const dataArr = []
    querySnapshot.forEach((doc) => {       
        dataArr.push(doc.data());
    });    
    return dataArr[0]
}
export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }
  return data
}