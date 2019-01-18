Vue.component('todoList',{
    template: 
    `
    <div class="todoList">
        <h1 style="text-align: center; text-decoration: underline;">To-do List</h1>
        <h3 v-if="!list.length" class="empty-list-message">Grats, you're task-free!</h3>
        <ul v-else class="list-display">
            <li v-for="(item,index) in list" 
                :key="index" 
                class="list-item"
                ><span class="list-item-text" @click="$event.target.classList.toggle('crossed-out-item')">{{item}}</span><span @click="removeItem(index)" class="remove-button">X</span></li>
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
            if(this.input){
                this.list.push(this.input);
            }
            this.input = null;
        },
        removeItem(index){
            this.list.splice(index, 1);
        }
    }
})

const app = new Vue({
    el: "#app",
    template:
    `
        <todoList></todoList>
    `
})