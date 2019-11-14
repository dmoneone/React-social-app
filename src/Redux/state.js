let renderEntireTree = () => {
    console.log('state was changed');
}

const state = {
    dialogsPage : {
        dialogData : [
            {name: 'Kurash', id: 1},
            {name: 'Salo', id: 2},
            {name: 'Kate', id: 3}
        ],
        messagesData : [
            {msg: "Dash pisky ebat?"},
            {msg: "228"},
            {msg: "ass"}
        ]
    },
    profilePage : {
        newPostMsg : 'Input anything',
        postsData : [
            {msg: "jopa", quantityOfLikes: 10},
            {msg: "Chlen", quantityOfLikes: 100},
            {msg: "1", quantityOfLikes: 100},
            {msg: "Chl2222en", quantityOfLikes: 100}
        ]
    },
    navComponent : {
        sidebar : {
            friends : [{name: 'Alex'},{name: 'Kate'},{name: 'Jora'}]
        }
    }
}

window.state = state;

export const addPost = () => {
    const newPost = {
        msg: state.profilePage.newPostMsg,
        quantityOfLikes: 0
    }
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostMsg = '';
    renderEntireTree();
}

export const replaceNewPostMsg = msg => {
    state.profilePage.newPostMsg = msg;
    renderEntireTree();
}

export const subscribe = observer => {
    renderEntireTree = observer;
}

export default state;