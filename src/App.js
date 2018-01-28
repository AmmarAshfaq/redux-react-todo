import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { insertData, deleteData, editData, deleteAll } from './store/action/action';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    gape: {
        marginLeft: '2px'
    },
    inputGape: {
        marginLeft: '3px'
    }
}
class App extends Component {
    constructor() {
        super();

    }


    onAdd = () => {
        let todo = { todo: this.insertText.value }
        this.props.changeData(todo);
        this.insertText.value = "";
    }
    onDelete = (keyVal, indexVal) => {
        this.props.removeData(keyVal, indexVal);
    }
    onEdit = (keyId) => {
        var text = prompt("Edit Your Value");
        this.props.updateTodo(keyId, text);
    }

    onCancel = () => {
        this.props.deleteAll();
    }

    render() {
        // console.log(this.props.todoList.todoArr)
        return (

            <MuiThemeProvider>
                <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }} >
                    <h1 style={{ color: 'blue', fontSize: '42px' }}>Todo list</h1>

                    <input type="text" ref={(input) => { this.insertText = input }} />
                    <RaisedButton label="Add Todo" primary={true} onClick={this.onAdd} style={styles.gape} />
                    <RaisedButton label="Delete All" secondary={true} onClick={this.onCancel} style={styles.gape} />

                    {

                        <ul style={{ listStyleType: 'none' }}>

                            {this.props.todoList.todoArr.map((valArr, ind) => {
                                return <li key={ind}>
                                    <span style={{ color: 'blue', fontSize: '24px' }}>     {valArr.todo}</span>

                                    {/* backgroundColor="#a4c639" */}
                                    <RaisedButton label="Delete" secondary={true} onClick={this.onDelete.bind(this, valArr.id, ind)} style={styles.gape} />
                                    <RaisedButton label="Edit" backgroundColor="#a4c639" onClick={this.onEdit.bind(this, valArr.id)} style={styles.gape} />
                                </li>
                            })}
                        </ul>
                    }
                </div>



            </MuiThemeProvider>


        )
    }
}

function mapStateToProp(state) {
    // console.log(state)
    return ({
        todoList: state.reducer
    })
}
function mapDispatchToProp(dispatch) {
    return (
        {
            changeData: (inputData) => {
                dispatch(insertData(inputData))
            },
            removeData: (keyF, keyId) => {
                dispatch(deleteData(keyF, keyId))
            },
            updateTodo: (keyId, todoText) => {
                dispatch(editData(keyId, todoText))
            },
            deleteAll: () => {
                dispatch(deleteAll())
            }
        }
    )

}
export default connect(mapStateToProp, mapDispatchToProp)(App);
