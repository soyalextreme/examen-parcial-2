import { numberType } from "../types";
import firebase from "./conection"

const deleteNum = async (id: string) => {
    const dbRef = firebase.db.collection("nums").doc(id);
    await dbRef.delete();
}


const updateNum = async (id: string, val: number) => {
    const dbRef = firebase.db.collection("nums").doc(id);
    await dbRef.set({
        val
    });
}

const getNums = async () => {
    const snapshot = await firebase.db.collection("nums").get();
    return snapshot.docs.map(doc => doc.data())
}


const addNum = async (num: number, id: string) => {
    try {
        await firebase.db.collection("nums").doc(id).set({
            val: num
        })
    } catch (error) {
        console.log(error)
    }
}


export default {
    deleteNum,
    getNums,
    updateNum,
    addNum
}