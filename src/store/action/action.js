import ActionTypes from '../constant/constant'
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA-07JO5j9lOet9IpO75M3cMvxKTPmFZy8",
    authDomain: "sample-b6acc.firebaseapp.com",
    databaseURL: "https://sample-b6acc.firebaseio.com",
    projectId: "sample-b6acc",
    storageBucket: "sample-b6acc.appspot.com",
    messagingSenderId: "905933374966"
};
firebase.initializeApp(config);


export function insertData(inputData) {
    return dispatch => {

        firebase.database().ref("/todoArrs").push(inputData);

        let fetchedData = {};
        firebase.database().ref("/todoArrs").once("value", (snap) => {
            dispatch(deleteAll())

            fetchedData = snap.val();
            console.log(fetchedData);
            let keys = Object.keys(fetchedData);
            console.log(keys);
            keys.map(eachKey => {
                dispatch({
                    type: ActionTypes.INSERTDATA,
                    todo: fetchedData[eachKey],
                    id: eachKey,
                })
            })

        })



    }
}


export function deleteData(keyFb, keyM) {
    // console.log()
    return dispatch => {

        firebase.database().ref(`/todoArrs/${keyFb}`).remove();

        firebase.database().ref("/todoArrs").on("child_removed", (snap) => {


            // console.log(inputD)
            dispatch({ type: ActionTypes.DELETETODO, payload: snap.key })


        })

    }
}

export function editData(keyId, valueEdit) {
    return dispatch => {
        firebase.database().ref(`/todoArrs/${keyId}`).update({ todo: valueEdit })
        firebase.database().ref('/todoArrs').on("child_changed", (snap) => {
            console.log(snap.val())
            console.log(snap.key)
            dispatch({ type: ActionTypes.UPDATEVALUE, payload: snap.key, data: snap.val() })


        })
    }
}




export function deleteAll() {
    return dispatch => {
        dispatch({ type: ActionTypes.DELETEALL })
    }
}