Vue.component('todoList',{
    template: 
    `
    <div class="todoList"><span style="flex: end">{{list.length}} / 10</span><hr>
        <h1 style="text-align: center; text-decoration: underline;">To-do List</h1>
        <h3 v-if="!list.length" class="empty-list-message">Grats, you're task-free!</h3>
        <ul v-else class="list-display">
            <transition-group name="list-animation" tag="li" appear>
                <li v-for="(item,index) in list" 
                    :key="item" 
                    class="list-item"
                    ><span class="list-item-text" @click="$event.target.classList.toggle('crossed-out-item')">{{item}}</span><span @click="removeItem(index)" class="remove-button">X</span></li>
            </transition-group>
        </ul>
        <p></p>
        <input type="text" placeholder="Input Task" v-model="input" class="input-field" @keyup.enter="addItem">
        <input type="submit" @click="addItem" value="Add Item" class="add-item-button"></input>
    </div>
    `,
    data() {
        return {
            list: [],
            input: null,
        }
    },
    methods: {
        addItem() {
            if(this.list.length < 10){
                if(this.input){
                    this.list.push(this.input);
                    const uploadList = {
                        list: this.list,
                    }
                    this.$http.put('', uploadList)
                }
                this.input = undefined;
            } else {
                alert("List only holds 10 items. Don't procrastinate.")
            }
        },
        removeItem(index){
            this.list.splice(index, 1);
            const uploadList = {
                list: this.list,
            }
            this.$http.put('', uploadList)
        },
        
    },
    mounted() {
        Vue.use('VueResource');
        Vue.http.options.root = 'https://vue-http-michols.firebaseio.com/todoList.json';
        this.$http.get('')
            .then(res => {
                return res.json()
            }).then(data => {
                this.list = data.list
            })
    }

})

const app = new Vue({
    el: "#app",
    template:
    `
        <div>
            <todoList></todoList>
            <p class="wip-text">
                WIP --> list now hosted on firebase. add authentication.
            </p>
        </div>
    `
})