new Vue({
    el: "#app",
    data:{
        mainMenu: true,
        playerHealth: 100,
        monsterHealth: 100,
        history: [],        
        cooldownTimer: 0,
    },
    
    methods: {
        attack() {
            this.monsterAttack()
            const playerHit = Math.floor(Math.random() * 10) + 1            
            this.monsterHealth -= playerHit    
            this.history.push("Player hits monster for " + playerHit)
            this.cooldownTimer -= 1
            this.checkStatus()
        },
        specialAttack(){
            if(!this.onCooldown){
                this.monsterAttack()
                const playerHit = Math.floor(Math.random() * 30) + 1            
                this.monsterHealth -= playerHit    
                this.history.push("Player hits monster for " + playerHit)
                this.cooldownTimer = 5
                this.checkStatus()
            }
        },
        heal() {
            this.monsterAttack()
            this.checkStatus()
            const playerHeal = Math.floor(Math.random() * 30) + 1
            if(this.playerHealth + playerHeal >= 100){
                this.history.push("Player heals for " + (100 - this.playerHealth))
                this.playerHealth = 100
            } else {
                this.playerHealth += playerHeal   
                this.history.push("Player heals for " + playerHeal)
            }
            this.cooldownTimer -= 1
        },
        surrender() {
            this.mainMenu = true,
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.history = [],
            this.cooldownTimer = 0
        },
        monsterAttack(){
            const monsterHit = Math.floor(Math.random() * 20) + 1
            this.playerHealth -= monsterHit
            this.history.push("Monster hits player for " + monsterHit)
        },
        checkStatus(){
            if(this.monsterHealth <= 0){
                alert('You beat the horrible monster! Yaay')
                this.surrender()
            }
            if(this.playerHealth <= 0){
                alert('You died. The village will soon follow')
                this.surrender()
            }
        }
        
    },
    computed: {
        playerHealthBar() {
            return ('width:' + this.playerHealth + '%')
        },
        monsterHealthBar() {
            return ('width:' + this.monsterHealth + '%')
        },
        onCooldown(){
            if(this.cooldownTimer <= 0)
                return false
            else
                return true
        }
    }
})