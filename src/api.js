import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDocs, getFirestore, collection } from "firebase/firestore/lite";

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
const analytics = getAnalytics(app);

const db = getFirestore(app); //reference needed for delete note func
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }))
   // console.log(dataArr[0].id)
    return dataArr
}

/* export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
} */

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
  const res = await fetch(url)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data = await res.json()
  return data.vans
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