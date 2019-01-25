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
            const playerHit = this.calculateEffect(3, 10)          
            this.monsterHealth -= playerHit    
            this.history.unshift("Player hits monster for " + playerHit)
            this.cooldownTimer -= 1
            this.checkStatus()
        },
        specialAttack(){
            if(!this.onCooldown){
                this.monsterAttack()
                const playerHit = this.calculateEffect(10, 20)          
                this.monsterHealth -= playerHit    
                this.history.unshift("Player hits monster for " + playerHit)
                this.cooldownTimer = 5
                this.checkStatus()
            }
        },
        heal() {
            this.monsterAttack()
            this.checkStatus()
            if(!this.mainMenu){
                const playerHeal = this.calculateEffect(5, 30)
                if(this.playerHealth + playerHeal >= 100){
                    this.history.unshift("Player heals for " + (100 - this.playerHealth))
                    this.playerHealth = 100
                } else {
                    this.playerHealth += playerHeal   
                    this.history.unshift("Player heals for " + playerHeal)
                }
                this.cooldownTimer -= 1
            }
        },
        surrender() {
            this.mainMenu = true,
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.history = [],
            this.cooldownTimer = 0
        },
        monsterAttack(){
            const monsterHit = this.calculateEffect(5, 20)
            this.playerHealth -= monsterHit
            this.history.unshift("Monster hits player for " + monsterHit)
        },
        checkStatus(){
            if(this.monsterHealth <= 0){
                alert('You beat the horrible monster! Yaay. Click OK to restart')
                this.surrender()
            }
            if(this.playerHealth <= 0){
                alert('You died. The village will soon follow. Click OK to restart')
                this.surrender()
            }
        },
        calculateEffect(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        }
        
    },
    computed: {
        onCooldown(){
            if(this.cooldownTimer <= 0)
                return false
            else
                return true
        }
    }
})