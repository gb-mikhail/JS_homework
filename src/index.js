let myModule = {
    init: function () {
        this.apiInit();
        this.getFriends();
        this.setListeners();
        this.search();
    },
    friends: undefined,
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
            VK.api('friends.get', {v: '5.64', order: 'name', fields: 'photo_50'}, function (response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response);
                }
            })
        })
            .then(function (response) {
                self.friends = response.response.items;
                response.response.items.forEach(friend => {
                    self.renderFriend(friend);
                });
            self.dnd();
            })

    },
    setListeners: function () {
        console.log('setListeners 4');
        let button = document.getElementById('friends');
        let button2 = document.getElementById('friendsNewlist');

        button.addEventListener('click', handler1);
        button2.addEventListener('click', handler1);

        function handler1(e) {
            if (e.target.innerHTML === '+') {
                let newTarget = e.target.parentNode;
                friendsNewlist.appendChild(newTarget);
                e.target.innerHTML = '-';
            } else if (e.target.innerHTML === '-') {
                let newTarget = e.target.parentNode;
                friends.appendChild(newTarget);
                e.target.innerHTML = '+';
            }
        }
    },
    search: function () {
        console.log('search 5');
        let leftSearchInput = document.getElementById('left-search-box_input');
        let leftFriendsList = document.getElementById('friends');

        function clearList() {

            for (let curNode = leftFriendsList.firstChild; curNode != null;) {
                let nextNode = curNode.nextSibling;

                leftFriendsList.removeChild(curNode);
                curNode = nextNode;
            }
        }

        leftSearchInput.addEventListener('keyup', someName.bind(this));

        function someName(e) {
            let toVal = e.target.value;
            let someArr = [];
            clearList();
            for (var i = 0; i < this.friends.length; i++) {
                this.friends[i].fullName = this.friends[i].first_name + ' ' + this.friends[i].last_name;
                if (this.friends[i].fullName.toLowerCase().startsWith(toVal)) {
                    this.renderFriend(this.friends[i]);
                }
            }
        }
    },
    dnd: function () {
        console.log('dnd 6');

        function dragStart(ev) {
            ev.dataTransfer.effectAllowed='move';
            ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,100,100);
            return true;
        }

        function dragEnter(ev) {
            ev.preventDefault();
            console.log('dragEnter');
            return true;

        }

        function dragOver(ev) {
            ev.preventDefault();
        }

        function dragDrop(ev) {
            var data = ev.dataTransfer.getData("Text");
            ev.target.appendChild(document.getElementById(data));
            ev.stopPropagation();
            return false;
        }
    },
};



window.onload = myModule.init();

//apiId: 6074753

