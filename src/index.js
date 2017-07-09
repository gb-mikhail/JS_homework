<<<<<<< HEAD
=======
let myModule = {
    init: function () {
        this.apiInit();
        this.getFriends();
        this.setListeners();
        this.search();
        this.saveButton();
    },
    friendsIdArr: [],
    rightFriendsArr: [],
    renderFriend: function (friend) {
        console.log('renderFriend 1');
        let friendDiv = document.createElement('div');
        let friendPhoto = new Image();
        let friendName = document.createElement('div');
        let plusButton = document.createElement('a');

        friendDiv.classList.add('central-box__friend');
        friendPhoto.src = friend.photo_50;
        friendPhoto.classList.add('central-box__friend_img');
        friendName.classList.add('central-box__friend_name');
        friendName.textContent = `${friend.first_name} ${friend.last_name}`;
        plusButton.classList.add('central-box__friend_button');
        plusButton.innerHTML = '+';
        friendDiv.setAttribute('id', friend.id);
        friendDiv.setAttribute('draggable', 'true');
        friendDiv.setAttribute('ondragstart', 'return dragStart(event)');

        friends.appendChild(friendDiv);
        friendDiv.appendChild(friendPhoto);
        friendDiv.appendChild(friendName);
        friendDiv.appendChild(plusButton);
    },
    renderFriend2: function (friend) {
        let friendDiv = document.createElement('div');
        let friendPhoto = new Image();
        let friendName = document.createElement('div');
        let plusButton = document.createElement('a');

        friendDiv.classList.add('central-box__friend');
        friendPhoto.src = friend.photo_50;
        friendPhoto.classList.add('central-box__friend_img');
        friendName.classList.add('central-box__friend_name');
        friendName.textContent = `${friend.first_name} ${friend.last_name}`;
        plusButton.classList.add('central-box__friend_button');
        plusButton.innerHTML = '-';
        friendDiv.setAttribute('id', friend.id);
        friendDiv.setAttribute('draggable', 'true');
        friendDiv.setAttribute('ondragstart', 'return dragStart(event)');

        friendsNewlist.appendChild(friendDiv);
        friendDiv.appendChild(friendPhoto);
        friendDiv.appendChild(friendName);
        friendDiv.appendChild(plusButton);
    },
    apiInit: function () {
        console.log('apiInit 2');
        VK.init({
            apiId: 6074753
        });
        VK.Auth.login(function (response) {
            if (response.session !== null) {
                console.log('All is good')
            } else {
                console.log('Не удалось авторизоваться')
            }
        }, 2);
    },
    getFriends: function () {
        console.log('getFriends 3');
        let self = this;
        return new Promise(function (resolve, reject) {
            //условие в котором мы проводим проверку из локал сторедж, и либо берем друзей оттуда, либо запускаем АPI
                VK.api('friends.get', {v: '5.64', order: 'name', fields: 'photo_50'}, function (response) {
                    if (response.error) {
                        reject(new Error(response.error.error_msg));
                    } else {
                        resolve(response);
                    }
                })
        })
            .then(function (response) {
                if (localStorage.length == 0) {
                    response.response.items.forEach(friend => {
                        self.renderFriend(friend);
                        self.friendsIdArr.push(friend);
                    });
                } else {
                    console.log('localStor');
                    localStorage.getItem('local');
                    localStorage.getItem('local2')
                }
            })

    },
    setListeners: function () {
        let self = this;
        console.log('setListeners 4');

        let button = document.getElementById('friends');
        let button2 = document.getElementById('friendsNewlist');
        let rightSearch = document.getElementById('right-search-box_input');
        let leftSearch = document.getElementById('left-search-box_input');

        button.addEventListener('click', handler1);
        button2.addEventListener('click', handler1);

        function handler1(e) {

            if (e.target.innerHTML === '+') {
                let newTarget = e.target.parentNode;
                button2.appendChild(newTarget);
                e.target.innerHTML = '-';

                for (let i = 0; i < self.friendsIdArr.length; i++) {
                    if (self.friendsIdArr[i].id == newTarget.id) {
                        self.rightFriendsArr.push(self.friendsIdArr[i]);
                        self.friendsIdArr.splice(i, 1);
                        // console.log(self.rightFriendsArr, 'куда');
                        // console.log(self.friendsIdArr, 'откуда');
                    }
                }

            } else if (e.target.innerHTML === '-') {
                let newTarget = e.target.parentNode;
                button.appendChild(newTarget);
                e.target.innerHTML = '+';
                for (let i = 0; i < self.rightFriendsArr.length; i++) {
                    if (self.rightFriendsArr[i].id == newTarget.id) {
                        self.friendsIdArr.push(self.rightFriendsArr[i]);
                        self.rightFriendsArr.splice(i, 1);
                        // console.log(self.rightFriendsArr, 'откуда');
                        // console.log(self.friendsIdArr, 'куда');
                    }
                }


            }
        }
    },
    search: function () {
        console.log('search 5');
        let leftSearchInput = document.getElementById('left-search-box_input');
        let rightSearchInput = document.getElementById('right-search-box_input');

        function clearList() {
            let leftFriendsList = document.getElementById('friends');
            for (let curNode = leftFriendsList.firstChild; curNode != null;) {
                let nextNode = curNode.nextSibling;

                leftFriendsList.removeChild(curNode);
                curNode = nextNode;
            }
        }

        function clearList2() {
            let rightFriendsList = document.getElementById('friendsNewlist');
            for (let curNode = rightFriendsList.firstChild; curNode != null;) {
                let nextNode = curNode.nextSibling;

                rightFriendsList.removeChild(curNode);
                curNode = nextNode;
            }
        }

        leftSearchInput.addEventListener('keyup', someName.bind(this));
        rightSearchInput.addEventListener('keyup', someName2.bind(this));

        function someName(e) {
            let toVal = e.target.value;
            clearList();
            for (let i = 0; i < this.friendsIdArr.length; i++) {
                this.friendsIdArr[i].fullName = this.friendsIdArr[i].first_name + ' ' + this.friendsIdArr[i].last_name;
                if (this.friendsIdArr[i].fullName.toLowerCase().startsWith(toVal)) {
                    this.renderFriend(this.friendsIdArr[i]);
                }
            }
        }

        function someName2(e) {
            let toVal = e.target.value;
            clearList2();
            for (let i = 0; i < this.rightFriendsArr.length; i++) {
                this.rightFriendsArr[i].fullName2 = this.rightFriendsArr[i].first_name + ' ' + this.rightFriendsArr[i].last_name;
                if (this.rightFriendsArr[i].fullName2.toLowerCase().startsWith(toVal)) {
                    this.renderFriend2(this.rightFriendsArr[i]);
                }
            }
        }
    },
    saveButton: function () {
        let  self = this;

        let button = document.querySelector('.friend-box__bottom-box_button');

        button.addEventListener('click', function (e) {
            console.log('hellog');
            localStorage.setItem('local', self.friendsIdArr);
            localStorage.setItem('local2', self.rightFriendsArr);
            // localStorage.clear();
        })
    }
};

window.onload = myModule.init();

//apiId: 6074753

>>>>>>> 3350462abb0af9dd8119bc23f88bf9619c8ceed6
